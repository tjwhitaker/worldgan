# WorldGAN

3D Environment Generation Using Deep Adversarial Networks

## Videos

Checkpoint 1: https://www.youtube.com/watch?v=jP5bdHnInEw

## Tools + Utilities

Building a dataset for terrain maps. Run the heightmapper tool locally so you don't burden tangram's server.

```
~$ cd heightmapper
~/heightmapper$ python -m http.server
Serving HTTP on 0.0.0.0 port 8000 (http://0.0.0.0:8000/) ...
```

```
~$ cd utilities
~/utilities$ python heightmapper.py
```