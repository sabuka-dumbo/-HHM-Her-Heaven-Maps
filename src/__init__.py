import hashlib
import os
import typing
import dotenv
from flask import Flask, redirect, render_template, request, session
from flask_session import Session
from cachelib.file import FileSystemCache


def create_app(test_config:typing.Union[None, dict] =None):
    # create and configure the app
    # (Application factory)
    app = Flask(__name__)
    # Secret key is used to encrypt the session cookie
    app.secret_key = os.urandom(32)

    # ------------- Session setup -------------------------------
    app.config['SESSION_TYPE'] = 'cachelib'
    app.config['SESSION_SERIALIZATION_FORMAT'] = 'json'
    app.config["SESSION_CACHELIB"] = (
        FileSystemCache(threshold=500, cache_dir="./sessions"),
    )
    Session(app)
    # -----------------------------------------------------------

    # If test_config is supplied, it most likely mean we are running tests
    if test_config:
        app.config.from_mapping(test_config)
    else:
        config = dotenv.dotenv_values()
        # this read the env file, and use the config as flask config
        # We will use flask config as config for everything
        app.config.from_mapping(config)

    @app.route("/login", methods=["GET", "POST"])
    def _login_route():
        params = request.form
        if request.method == "GET":
            return render_template("login.html")
        else:
            email = params.get("email")
            password = params.get("password")
            if session["logged"]:
                if request.args.get("redirect"):
                    return redirect(request.args.get("redirect"))
                else:
                    return redirect("/")
            else:
                password_hash = hashlib.md5(password).hexdigest()

    @app.get("/register")
    def _register_route():
        return render_template("register.html")
    @app.get("/")
    def _index_route():
        return render_template("index.html")
    return app
