from flask import Flask, request, render_template, url_for
import json
import test2

app = Flask(__name__)

@app.route("/")
def intro():
    return render_template("index.html")

@app.route("/click", methods=['POST'])
def click():
    t = request.form.get('test2')  # html에서 사용자가 입력한 text 받기
    #test2.saveImage(t)  # 모델 실행
    
     # 이미지 경로
     # <img src="url_for('static', filename = 'image/' + t + '.png')"> - js code
     # static/image/"이미지이름".png
    img_src = url_for('static', filename = 'image/' + t + '.png')  
    
    return render_template('index.html', filename=img_src)


if __name__ == "__main__":
    app.run(debug=True, port=5000)