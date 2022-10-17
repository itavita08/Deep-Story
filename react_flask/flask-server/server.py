from flask import Flask, request
from flask_cors import CORS


app = Flask(__name__)
app.config['DEBUG'] = True
CORS(app)


@app.route('/users', methods=["GET", "POST"])
def users():
    if request.method == "GET":
        return {"users": [{"id": 1, "name": "data"},
                      {"id": 2, "name": "from flask"}]}
    elif request.method == "POST":
        text = request.form.get('input_text')
        # 딥러닝
        #test2.saveImage(text)
        return f'''
            <div>
                <img src="./static/image/{text}.png">
            </div>
            '''


# @app.route("/add", methods=["POST"] , strict_slashes=False)
# async def add_text():
#     text = request.form.get('input_text')
#     print("this is flask****************************")
#     #test2.saveImage(text)

#     # 이미지 경로
#      # <img src="url_for('static', filename = 'image/' + t + '.png')"> - js code
#      # static/image/"이미지이름".png, # f"./static/image/{text}.png"
      
#     return text
    

if __name__ == "__main__":
    app.run(debug = True)