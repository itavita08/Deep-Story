from flask import Flask, request, render_template, url_for
import json
import test2

app = Flask(__name__)

@app.route("/")
def intro():
    return render_template("index.html")

@app.route("/click", methods=['POST'])
def click():
    t = request.form.get('test2')
    #test2.saveImage(t)
    img_src = url_for('static', filename = 'image/' + t + '.png')
    return render_template('index.html', filename=img_src)


if __name__ == "__main__":
    app.run(debug=True, port=5000)