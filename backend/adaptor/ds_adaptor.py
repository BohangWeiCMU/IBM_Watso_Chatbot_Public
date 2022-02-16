import json
from ibm_watson import DiscoveryV1
from ibm_cloud_sdk_core.authenticators import IAMAuthenticator

class DSAdaptor:

    def __init__(self,
                 apikey="......",
                 version="......",
                 url="......",
                 environment_id="......",
                 collection_id="......"
                ):
        #Activate the IBM SDK
        self.apikey = apikey
        self.version = version
        self.url = url
        self.environment_id = environment_id
        self.collection_id = collection_id

        self.authenticator = IAMAuthenticator(self.apikey)

        self.discovery = DiscoveryV1(
            version=self.version,
            authenticator=self.authenticator
        )

        self.discovery.set_service_url(url)


    def send_result(self, term):

        c_id, search_term = self.__extract_keyterm(term)
        found = False
        subtitle = ""
        infos = ""

        if search_term != "title:":
            results = self.discovery.query(environment_id=self.environment_id, collection_id=c_id, filter=search_term).get_result()

            if c_id=="5830fd57-758e-4966-b1c6-4ecd79924bcb":
                if len(results["results"]) != 0:
                    course = results["results"][0]

                    if "subtitle" in course:
                        subtitle = "Course Name: " + course["subtitle"]
                    if "answer" in course:
                        if isinstance(course['answer'], list) and len(course["answer"])!=0:
                            infos = '; '.join(course["answer"])
                        elif isinstance(course['answer'], str) and course['answer'] != '':
                            infos = course['answer']
                        else:
                            infos = "There are no specific requirements to enter the course"
                    else:
                        infos = "There are no specific requirements to enter the course"
                    found = True

            elif c_id=="ba8557e9-561c-474f-aef7-7b10824de122":
                if len(results["results"]) != 0:
                    if search_term.startswith("subtitle:"):
                        instructors = []
                        subtitle = "Here are the instructors who teaches/taught the course: "
                        for result in results["results"]:
                            if "title" in result:
                                instructors.append(result["title"][0])
                                infos = ', '.join(instructors)
                    elif search_term.startswith("title"):
                        instructors = []
                        feedbacks = []
                        subtitle = "I found the following instructor(s) with some student feedback: "

                        for result in results["results"]:
                            infos = infos + "\n"
                            if "title" in result and isinstance(result["title"], list):
                                instructor = result["title"][0]
                                infos = infos + "Instructor Name: " + instructor + "\n"
                            else:
                                infos = "I don't know this instructor's teaching assignments or ratings. Please refer to the CSE faculty directory for more information."
                                subtitle = ""

                            if "subtitle" in result and isinstance(result["subtitle"], list):
                                teaching = result["subtitle"][0]
                                infos = infos + teaching + "\n"

                            if "answer" in result and isinstance(result["answer"], list):
                                feedback = result["answer"][0]
                                infos = infos + feedback + "\n"

                    found = True
                else:
                    infos = "The person you requested is not in the CSE faculty."
                    found = True
                infos = infos + "\nAny other questions for me?"
        return found, subtitle, infos

    def __extract_keyterm(self, term):
        buffer = term.split(' ')
        search_term = ""
        c_id = buffer[1]

        if term.find(" subtitle:") != -1:
            index = term.find(" subtitle:")
            search_term = term[index+1:]
        elif term.find(" title:") != -1:
            index = term.find(" title:")
            search_term = term[index+1:]

        return c_id, search_term

if __name__ == '__main__':
    #Delete all documents in the CSE courses collection
    client = DSAdaptor()
    discovery = client.discovery

    doc_list = discovery.query(environment_id = client.environment_id, collection_id = "......").result['results']
    print(len(doc_list))

    for doc in doc_list:
        print('deleting {}'.format(doc['id']))
        discovery.delete_document(environment_id = client.environment_id, collection_id = "......", document_id = doc['id'])
