import os
import typing
import dotenv
from flask import Flask, render_template, request, session

def create_app(test_config:typing.Union[None, dict] =None):
    # create and configure the app
    # (Application factory)
    app = Flask(__name__)
    # Secret key is used to encrypt the session cookie
    app.secret_key = os.urandom(32)

    app.config['SESSION_TYPE'] = 'redis'
    app.config['SESSION_PERMANENT'] = False
    app.config['SESSION_USE_SIGNER'] = True
#    app.config['SESSION_REDIS'] = redis.from_url('redis://127.0.0.1:6379')

    # yo main part of register is done

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