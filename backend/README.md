# Binder Backend

## Running the frontend and backend together

In order to run the entire binder ecosystem, you have to have **both** the React frontend and the Flask backend running simultaneously on your system. Here are the step-by-step instructions to do so. Make sure to **do each step in order**.

#### 1. Running the Flask backend

To run the backend, just follow the instructions below in the rest of this
README.

#### 2. Running the React frontend

To run the frontend, just do `npm start` and it should show you the message history when you first open the chat window.

## Building the local environment

1. Clone the repository
2. If you haven't already, make a virtual environment using `python3 -m venv [name of virtual environment]` and activate it using `source [name of environment]/bin/activate`
  1. **Note**: these specific commands are for UNIX-like machines.
3. Once you're in your virtual environment, make sure you install the dependencies by executing `python3 -m pip install -r requirements.txt`
4. To start the web server, execute the following commands:

  ```
  $export FLASK_APP=app
  $flask run
  ```

## Running the app

Like above, just make sure that your virtual environment is active and then run the following commands:

```
$export FLASK_APP=app
$flask run
```

## Adding packages to the dependencies

If you ever have to install a new package, make sure to add it to the dependency list by doing `python3 -m pip freeze > requirements.txt`. **NOTE: DO NOT DO THIS UNLESS YOU'RE CERTAIN THAT YOUR VIRTUAL ENVIRONMENT IS ACTIVE AND ALREADY HAS INSTALLED ALL THE PACKAGES THAT WERE IN THE FILE BEFORE**

## Adding adaptor classes in the adaptor module

If you ever have to add a new adaptor class, just add a new Python file into the `adaptor` folder and implement the class there.
