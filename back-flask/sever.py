from flask import Flask, jsonify, request
from flask_cors import CORS
from flask import Flask, request, render_template
import boto3
import model



app = Flask(__name__)
app.config['DEBUG'] = True
CORS(app)      

def s3_connection():
    s3 = boto3.client('s3',
        aws_access_key_id = "AKIA2H3QYTWWXBWBHBMT",
        aws_secret_access_key = "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")
    return s3


@app.route("/add", methods=["POST"])
def create_img():

    text = request.get_json()
    model.saveImage(text)

    s3 = s3_connection()
    s3.upload_file('static/image/' + text + '.png', "deep-story-bucket-01", text + '.png')

    return jsonify(text)

if __name__ == "__main__":
    app.run(host='0.0.0.0', debug = True, port=5000)
