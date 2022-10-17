import json
from flask import Flask, jsonify, request
from flask_cors import CORS
from flask import Flask, request


app = Flask(__name__)
app.config['DEBUG'] = True
CORS(app)

@app.route('/users')
def users():
	# users 데이터를 Json 형식으로 반환한다
    return {"users": [{ "id" : 1, "name" : "hyeseon" },
    					{ "id" : 2, "name" : "from flask" }]}         

# @app.route("/add", methods=["POST"], strict_slashes=False)
@app.route("/add", methods=["POST"])
def create_img():
    text = request.get_json()
    return jsonify(text)

if __name__ == "__main__":
    app.run(debug = True)