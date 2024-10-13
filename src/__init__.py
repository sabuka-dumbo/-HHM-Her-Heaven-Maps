import os
import typing
import dotenv
from flask import Flask, render_template, request, session
from flask_session import Session
from cachelib.file import FileSystemCache
# DUDE we need to work separatly
# i work on the backend and you focus on the front end
# We use git to merge after 
# um can i run server? oh oka
# it give me errors
# for now it's normal you need to run in a virtualenv
# pip install -r requirements.txt
# The only pb is that i never work using windows
# and powershell is doing stange thing, which don't allow me to use it correctly through live share
# and tbh windows isn't always good for developpment
# help me somehow to run and ill do my job
# Ju

def create_app(test_config:typing.Union[None, dict] =None):
    # create and configure the app
    # (Application factory)
    app = Flask(__name__)
    # Secret key is used to encrypt the session cookie
    app.secret_key = os.urandom(32)

    app.config['SESSION_TYPE'] = 'cachelib'
    app.config['SESSION_SERIALIZATION_FORMAT'] = 'json'
    app.config['SESSION_CACHELIB'] = FileSystemCache(threshold=500, cache_dir="/sessions"),

    # If test_config is supplied, it most likely mean we are running tests
    if test_config:
        app.config.from_mapping(test_config)
    else:
        config = dotenv.dotenv_values()
        # this read the env file, and use the config as flask config
        # We will use flask config as config for everything
        app.config.from_mapping(config)

    
    @app.get("/login")
    def _login_route():
        params = request.form
        return render_template("login.html")
    @app.get("/register")
    def _register_route():
        return render_template("register.html")
    @app.get("/")
    def _index_route():
        return render_template("index.html")
    return app