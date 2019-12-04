import os
from PIL import Image, ImageOps

in_directory = "../../data/working/usermaps"
out_directory = "../../data/augmented-batch/"

def augment(in_directory, out_directory):
  for file in os.listdir(in_directory):
    if file.endswith(".png"):
      path = os.path.join(in_directory, file)
      im = Image.open(path)

      im.save(out_directory + file)

      flipped = ImageOps.flip(im)
      flipped.save(out_directory + "f_" + file)

      mirror = ImageOps.mirror(im)
      mirror.save(out_directory + "m_" + file)

      ninety = im.rotate(90)
      ninety.save(out_directory + "90_" + file)

      oneeighty = im.rotate(180)
      oneeighty.save(out_directory + "180_" + file)

      twoseventy = im.rotate(270)
      twoseventy.save(out_directory + "270_" + file)

augment("../../data/original-batch/cycle/trainA", "../../data/augmented-batch/trainA/")
augment("../../data/original-batch/cycle/trainB", "../../data/augmented-batch/trainB/")