import functools
import sqlite3
from adaptor import BAAdaptor
from adaptor import DSAdaptor
from adaptor import LAAdaptor
from flask_jwt_extended import (
    jwt_required, get_jwt_identity
)
from app.db import get_db
from flask import (
    Blueprint, flash, g, redirect, render_template, request, session, url_for, request,
    jsonify
)

language_message={"English":"(English) You are in English mode.",
"French":"(French) Vous êtes en mode français.",
"Spanish":"(Spanish) Estás en modo español.",
"Chinese":"(Chinese) 您处于中文模式.",
"Korean":"(Korean) 당신은 한국어 모드입니다.",
"Japanese":"(Japanese) あなたは日本語モードです.",
"Hindi":"(Hindi) आप हिंदी विधा में हैं."}

bp = Blueprint('messaging', __name__, url_prefix='/messaging')
wa_adaptor = BAAdaptor()
wd_adaptor = DSAdaptor()
la_adaptor = LAAdaptor()

"""
This is the endpoint to which the frontend will send messages written by the user.
The endpoint should be accessed via a POST request to the /messaging/send_message
route with a JSON payload.
Parameters:
    JWT in header and following JSON payload:
        {
            c_id: [valid c_id]
            msg_txt: [message string]
        }
"""
@bp.route('/send_message', methods = ['GET', 'POST'])
@jwt_required()
def send_message():
    if request.method == 'GET':
        return wa_adaptor.send_message("hello")
    elif request.method == 'POST':
        db = get_db() #Connect to database
        username = get_jwt_identity()
        c_id = request.get_json()['c_id']
        message = request.get_json()['msg_txt']

        #Save the incoming message to their convo history in DB
        retrieve_convo_query = 'SELECT * FROM user, conversation WHERE user.username = ? AND user.id = conversation.user AND conversation.c_id = ?'
        convo_query_result = db.execute(retrieve_convo_query, (username, c_id)).fetchone()
        convo_result_id = convo_query_result['c_id']
        user_fname = convo_query_result['fname']
        user_lname = convo_query_result['lname']

        get_messages_query = 'SELECT * FROM message WHERE c_id = ?'
        get_messages_result = db.execute(get_messages_query, (convo_result_id, )).fetchall()
        messages = [{'msg_txt': row['txt'], 'msg_sender': row['sender'], 'msg_no': row['msg_no']} for row in get_messages_result]
        messages.sort(key = lambda x: x['msg_no'], reverse = True)
        last_msg_number = messages[0]['msg_no']
        new_msg_number = last_msg_number + 1

        insert_message_query = 'INSERT INTO message VALUES (?, ?, ?, ?)'
        db.execute(insert_message_query, (new_msg_number, c_id, message, username))
        db.commit()


        language = get_language_helper()
        print(language)
        # Handle non-English language
        if language != "English":
            message = la_adaptor.send_message(message, language, True)
            
        #Define context variable dictionary
        context = {
            'skills': {
                'main skill': {
                    'user_defined': {
                        'fname': user_fname,
                        'lname': user_lname
                    }
                }
            }
        }

        #Send the incoming message on to the adaptor class
        return_message, return_type = wa_adaptor.send_message(message, context_dict = context)

        #If assistant cannot provide a input, then pass it to discovery
        # DISCOVERY
        if return_message.startswith("DISCOVERY"):
            found, subtitle, infos = wd_adaptor.send_result(return_message)
            if found:
                return_message = "Here are some information that may help you! :) \n" + subtitle + "\n" + infos
            else:
                return_message = "Ooops, it seems that the course or instructor you entered is not available. Could you try with another one?"


        if language != "English":
            original_return_message = return_message
            return_message = la_adaptor.send_message(return_message, language, False)
            return_message = return_message + "\n------------------------------------------------------------\n" + original_return_message

        #Save the adaptor's response to the DB
        db.execute(insert_message_query, (new_msg_number + 1, c_id, return_message, 'binder'))
        db.commit()


        response = {
            'response': {
                'msg_txt': return_message,
                'msg_sender': 'binder',
            }
        }
        return(jsonify(response))

"""
This is the endpoint to be called when the frontend is rendering the chatbox
for a logged in user. It will return the message history for that user, which
can then be rendered into the chat box.
Parameters:
    JWT in the header, plus query string of following format: "?c_id=[conversation id]"
Returns:
    A JSON response of all the messages in the message history, in order
"""
@bp.route('/load_conversation', methods = ['GET'])
@jwt_required()
def load_conversation():
    print('here with valid cookie')
    db = get_db()
    username = get_jwt_identity()
    c_id = request.args.get('c_id')

    #Query the user's conversation and get all the messages in this conversation
    query_str = "SELECT * FROM conversation, message WHERE conversation.c_id = ? AND message.c_id = conversation.c_id"
    query_result = db.execute(query_str, (c_id, )).fetchall()
    messages = [{'msg_txt': row['txt'], 'msg_sender': row['sender'], 'msg_no': row['msg_no']} for row in query_result]
    messages.sort(key = lambda x: x['msg_no']) #Sort in ascending order by message number

    return jsonify({
        'messages': messages
    })

"""
This is the endpoint through which the frontend can get all the conversation
IDs associated with a user to be used in a successive request to the /load_conversation
endpoint to actually populate that conversation to the message box
Parameters:
    Simple GET request with JWT in header
Returns:
    List of conversation IDs belonging to the user who is currently logged in
    with the following JSON format:
        {
            c_ids: [list of conversation ids]
        }
"""
@bp.route('/get_c_ids', methods = ['GET'])
@jwt_required()
def get_c_ids():
    db = get_db()
    username = get_jwt_identity()

    #Query the user's conversations from the database
    query_str = "SELECT c_id FROM user, conversation WHERE user.username = ? AND user.id = conversation.user"
    query_result = db.execute(query_str, (username, )).fetchall()

    c_ids = [row['c_id'] for row in query_result]

    return(jsonify({
        'c_ids': c_ids
    }))


"""
This is the endpoint through which the language will be changed for frontend, backend and database.
THe point of changing database is to make the language setting persist even after the user log off.
Parameters:
    Simple POST request with JWT in header
Returns:
    Language saved in json format:
        {
            language: language
        }
"""
@bp.route('/language_change', methods = ['POST'])
@jwt_required()
def language_change():
    db = get_db()
    username = get_jwt_identity()
    language = None

    language = request.get_json()['language_info']
    update_message_query = 'UPDATE user SET language = ? WHERE user.username = ?'
    db.execute(update_message_query, (language, username))
    db.commit()

    return jsonify({
        'language': language
    })

"""
This is the endpoint through which the frontend and backend know the current language setting.
The frontend will also print out corresponding language message.
Parameters:
    Simple GET request with JWT in header
Returns:
    Language message saved in json format:
        {
            language: language message (see languge_message disctionary defined above)
        }
"""
@bp.route('/get_language', methods = ['GET'])
@jwt_required()
def get_language():

    language = get_language_helper()

    return jsonify({
        'language': language_message[language]
    })


"""
This is a helper function for get_language (but not an endpoint).
It will return the language the user specified.
Parameters:
    JWT in header
Returns:
    String: Language
"""
@jwt_required()
def get_language_helper():
    db = get_db()
    username = get_jwt_identity()
    language = None

    query_str = "SELECT language FROM user WHERE user.username = ?"
    query_result = db.execute(query_str, (username, )).fetchall()
    row = query_result[0]
    language = row['language']

    return language
