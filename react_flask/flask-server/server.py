from flask import Flask, request
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

@app.route("/add", methods=["POST"], strict_slashes=False)
def add_text():
    text = request.form.get('input_text')
    #test2.saveImage(text)

    # 이미지 경로
     # <img src="url_for('static', filename = 'image/' + t + '.png')"> - js code
     # static/image/"이미지이름".png
      
    return f'''
    <div>
        <img src="./static/image/{text}.png">
    </div>
    '''

if __name__ == "__main__":
    app.run(debug = True)