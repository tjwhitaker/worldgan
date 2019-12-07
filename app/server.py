import base64
from flask import Flask, request, render_template
from subprocess import call

app = Flask(__name__)

@app.route("/")
def hello():
  return render_template("index.html")

@app.route("/generate", methods=['POST'])
def generate_heightmap():  
  data = request.get_json()
  b64 = data['b64']

  with open("generate/a.png", "wb") as fh:
    fh.write(base64.decodebytes(b64.encode()))

  #call(["ls", "../pytorch-CycleGAN-and-pix2pix"])
  #call(["python", "../pytorch-CycleGAN-and-pix2pix/test.py"])

  return "hi"