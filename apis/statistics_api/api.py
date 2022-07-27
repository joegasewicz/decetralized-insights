from flask import Flask

app = Flask(__name__)


@app.route("/")
def index():
    return "<p>Statistics...</p>"


if __name__ == "__main__":
    app.run(port=5000)
