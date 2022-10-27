from flask import Flask, jsonify, request
from flask_cors import CORS
import time
import json
from flask import make_response

app = Flask(__name__)
app.config['JSON_AS_ASCII'] = False
app.config['DEBUG'] = True
CORS(app)


@app.route('/users')
def users():
	# users 데이터를 Json 형식으로 반환한다
    return {"users": [{ "id" : 1, "name" : "data" },
    					{ "id" : 2, "name" : "from flask" }]}         

@app.route("/add", methods=["POST"])
def create_img():
    text = request.get_json()
    # time.sleep(2)
    #test2.saveImage(text)

    return jsonify(text)

@app.route("/test", methods=["POST"])
def test():
    test = request.get_data()
    print(test)
    return test

if __name__ == "__main__":
    app.run(debug = True)