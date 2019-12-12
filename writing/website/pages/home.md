Abstract: We introduce a method and application for generating 3D environments using conditional generative adversarial networks. The outputs from our networks are able to be imported into popular three dimensional modeling software like Unreal, Unity and Blender. We've created a simple web based interface to allow a user to control the output of the generated environment by painting with predefined brushes that represent terrain varieties: mountains, hills, terraces, plains, and rivers.

# Demo Video

Here's a quick example of how a user might use the app.

[![Demo](http://img.youtube.com/vi/pADYl1LY1hA/0.jpg)](https://www.youtube.com/watch?v=pADYl1LY1hA)

# Introduction

This project touches on a couple of important topics, procedural content generation and generative neural networks.

# Objectives

1. Generate realistic 3d environments.
2. Allow the user to have influence and control over the resulting environments.
3. Make sure our results can be imported into professional 3d software like Unreal, Unity, or Blender.

# Background

We evaluate two forms of popular conditional generative adversarial networks, Pix2Pix and CycleGAN.

# Related Work

GauGAN:

A Step Toward Procedural Terrain Generation with GANs:

# Methodology

#### The User Interface

![UI](images/ui-app.png)

#### The Dataset

![Heightmapper](images/heightmapper.png)

#### Training the Models

# Results

![UI](images/viz-1.png)
![UI](images/viz-2.png)
![UI](images/viz-3.png)


# Conclusion

# Future Work