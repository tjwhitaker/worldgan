import base64
from flask import Flask, request, render_template, send_file
from subprocess import call

app = Flask(__name__)

@app.route("/")
def hello():
  return render_template("index.html")

@app.route("/generate", methods=['POST'])
def generate_heightmap():  
  data = request.get_json()
  b64 = data['b64']

  with open("generate/test/a.png", "wb") as fh:
    fh.write(base64.decodebytes(b64.encode()))

  call(["python3", "../pytorch-CycleGAN-and-pix2pix/test.py", 
    "--dataroot", "./generate", 
    "--checkpoints_dir", "../models", 
    "--name", "two-pix2pix", 
    "--results_dir", "./generate/results", 
    "--model", "pix2pix"])

  #return send_file("generate/results/b.png", mimetype="image/png")
