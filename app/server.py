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

  with open("generate/test/A.png", "wb") as fh:
    fh.write(base64.decodebytes(b64.encode()))

  call(["python3", "../pytorch-CycleGAN-and-pix2pix/test.py", 
    "--dataroot", "./generate", 
    "--checkpoints_dir", "../models", 
    "--name", "two-pix2pix", 
    "--results_dir", "./generate/results", 
    "--model", "pix2pix",
    "--load_size", "256",
    "--gpu_ids", "-1"])

  with open("generate/results/two-pix2pix/test_latest/images/A_fake_B.png", "rb") as fh:
      encoded_string = base64.b64encode(fh.read())

  return encoded_string
