from flask import Flask, jsonify
from flask_cors import CORS
from flask import Flask, request, render_template, url_for

app = Flask(__name__)
app.config['DEBUG'] = True
CORS(app)

@app.route("/")
def intro():
    return render_template("index.html")

@app.route("/add", methods=["POST"], strict_slashes=False)
def add_text():
    # data = request.form.get('input_text')
    data = request.json
    
    print(data)
    #test2.saveImage(data)  # 모델 실행
    
    # 이미지 경로
    # <img src="url_for('static', filename = 'image/' + t + '.png')"> - js code
    # static/image/"이미지이름".png
    img_src = url_for('static', filename = 'image/' + data + '.png')  

    # return f'''
    # <div>
    #     <img src="./static/image/{data}.png">
    # </div>

    # '''

    return data

@app.route("/send", methods=["POST"], strict_slashes=False)
def send_url(url):

    return url


if __name__ == "__main__":
    app.run(debug = True)