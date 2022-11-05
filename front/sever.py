import json
from flask import Flask, jsonify, request
from flask_cors import CORS
from flask import Flask, request


app = Flask(__name__)
app.config['DEBUG'] = True
CORS(app)       

# @app.route("/add", methods=["POST"], strict_slashes=False)
@app.route("/add", methods=["POST"])
def create_img():

    print("성공~~~~~~~")
    text = request.get_json()
    return jsonify(text)

if __name__ == "__main__":
    app.run(debug = True)