Abstract: We introduce a method and application for generating 3D environments using conditional generative adversarial networks. The outputs from our networks are able to be imported into popular three dimensional modeling software like Unreal, Unity and Blender. We've created a simple web based interface to allow a user to control the output of the generated environment by painting with predefined brushes that represent terrain varieties: mountains, hills, terraces, plains, and rivers.

# Demo Video

Here's a quick example of how a user might use the app.

[![Demo](http://img.youtube.com/vi/pADYl1LY1hA/0.jpg)](https://www.youtube.com/watch?v=pADYl1LY1hA)

# Introduction

This project explores the usage of conditional generative adversarial networks to synthesize 3 dimensional environments.

The motivations for this project are to make it easier for game, world or environment designers to create realistic environments procedurally while giving the designer more control over the results.

We aim to create a simple and easy to use GUI interface for a user to paint a 2 dimensional semantically significant image map. We then pass the user created image map through a generative adversarial network trained on elevation data gathered from the Earth in order to generate a realistic terrain heightmap that approximately represents the user defined map. The resulting heightmap produced from the neural network can then be uploaded into any of the popular 3 dimensional rendering softwares including Unity, Unreal, Blender or World Machine.

This approach offers a promising avenue to co-creative design. Humans working together with machine learning programs could allow for more creative results with reduced cost and effort for the designer. The flexibility of being able to tweak and tune the training set also allows for the possibility of adapting this approach to content of many different kinds, not just 3d environments.

# Objectives

1. Generate realistic 3d environments.
2. Allow the user to have influence and control over the resulting environments.
3. Make sure our results can be imported into professional 3d software like Unreal, Unity, or Blender.

# Related Work

## GauGAN

GauGAN was the inspiration behind the semantic user map. This research demonstrated an application that took a 2 dimensional semantic image drawn by a user, and translated it into a photorealistic image. This project also used Pix2Pix as a base for their network architecture, but they also introduce a novel normalization layer called spatially-adaptive normalization. The idea is that normal layer normalization tends to wash out semantic meaning from an image. By considering the spatial properties, you can keep the semantic information in tact while still performing normalization. \cite{park2019semantic}	. Nvidia hosts an excellent demo of the project at http://nvidia-research-mingyuliu.com/gaugan.

## A Step Toward Procedural Terrain Generation with GANs

This paper had a very similar idea to this project. They use a standard generative adversarial network to synthesize terrain heightmaps with a model trained on Earth data. They use NASA's visible earth project for their training image data at a resolution of 1km per pixel. This project appears to be quite introductory and they lay out a good overview of how a standard GAN could be implemented to generate environments. We expand on their work by introducing the conditional GAN and integrating co-creative design by including a translation from a user defined segmentation map. \cite{beckham2017step}


# Methodology

## The User Interface

The user interface is a web based javascript application that allows a user to paint a semantically significant image using predefined brushes. We include tools to change the brush size and export or clear the image. The canvas size is 512 x 512 pixels, and these images are resized automatically when passed to our neural network.

![UI](images/ui-app.png)

The backend is powered by a Flask API. We set up an endpoint to be able to evaluate a drawn image on our trained models. In order to pass the usermap and generated heightmap back and forth between the client and the server, we use base 64 encoding and decoding on the image. This way we can save the images to the file system and have a local process run the neural network and return the generated heightmap. This direct access to the file system has security concerns, so it's only recommended to run the app locally.

## The Dataset

We use an interactive open source map tool that visualizes elevation data gathered from Mapzen's global elevation service \cite{richardson2016mapzen}. The data for the map tool is aggregated from 3 sources, USGS, NASA, and NGA. The map is a greyscale map, where the brightness of the pixel corresponds to the relative elevation.

![Heightmapper](images/heightmapper.png)
	
We then built a program that controls a headless browser using an open source library developed by Google called Puppeteer. This script loads a random coordinate, checks if the coordinate is over land and if so, then we save an image of the elevation data at that coordinate. We resize the saved image to be 512 x 512 pixels.
	
We then manually build the usermap training set using our user interface application. For each image in the heightmap training set, we paint a usermap to represent that heightmap, using the semantically significant brushes that most closely match the terrain (mountains, hills, plains, rivers, and terraces). This process is a subjective one and all usermaps were painted by myself. This does bias the model to produce images according to how I read the heightmaps.

After this process we are left with 258 paired usermaps and heightmaps. We group all of these together into a batch to be trained on.

Creating the usermaps by hand is quite time consuming, and I wanted to experiment with models trained on a large dataset. We accomplish this by augmenting our first batch with simple transformations in order to artificially increase the number of images we can train on. Image augmentations are a well researched and effective appoach to improving neural network performance \cite{perez2017effectiveness}.
	
We performed 5 operations on each usermap and heightmap. We mirror horizontally, flip vertically, rotate 90 derees, rotate 180 degrees, and rotate 270 degrees.	All of the resulting images are gathered into a second batch and we end up with 1548 paired images (a 5x increase).
	
Before training the networks, we need to perform one more preprocessing step. Pix2Pix requires paired images to be combined into a single side by side image. We stack each pair of usermap and heightmap and save these images into separate batches spcifically for Pix2Pix. Each resulting image is 1024 x 512 pixels. CycleGAN does not need this preprocessing step and can be trained on images in different directories.


## Training the Models

We trained a total of 4 models. Pix2Pix and CycleGAN on both the original and augmented batch of training data. The training was performed on my desktop GPU enabled PC. The operating system is Ubuntu 18.04. We train on a Nvidia GTX 1080ti GPU with 11 GB of memory, an Intel i7 8700k processor, a 500GB solid state hard drive, and 32 GB of RAM.
	
Both models are built on top of the PyTorch framework \cite{paszke2019pytorch} and are trained for 200 epochs. We use the default hyperparameters of 0.0002 for the learning rate and ADAM for the optimizer. We use the open source repo implemented by Jun-Yan Zhu, who published the research on both models \cite{junyanzhu2017github}. Both models are 15 layers deep and contain multiple convolutional layers and residual blocks \cite{isola2016imagetoimage} \cite{zhu2017unpaired}.
	
## Pix2Pix

Our pix2pix model contains a total of 57.183 million parameters. The generator network contains 54.414 million parameters and the discriminator contains 2.769 million parameters. The original batch of data took approximately 45 minutes to train. The augmented batch took approximately 4 hours to train.
	
## CycleGAN

Our cyclegan model contained a total of 28.286 million parameters. Generator A and Generator B each contain 11.378 million parameters. Discriminator A and Discriminator B each contain 2.765 million parameters. The original batch of data took approximately 4 hours to train. The augmented batch took approximately 24 hours to train.


# Results

Subjective results of networks show that Pix2Pix performs much better than CycleGAN. For the specfic task of segmented image translation, paired training data allows the network to learn the meaning of the segmentations much better. Cyclegan had issues of keeping the semantic meaning in tact. Even though it does appear to generate some of the patterns correctly, it's often mapped to the wrong brush or user defined section.

Both models trained on the augmented batch produce higher fidelity images. Both Pix2Pix models produce usable and realistic terrain.

We also find that the model does not perform very well on usermaps with rivers. We found that rivers tend to produce noisy results and sometimes the rivers aren't defined enough to be noticeable in the results. I think this can be solved with more training data including rivers. Due to the nature of how the training data was gathered, it's likely that we didn't get enough examples, and due to the subjective nature of myself reading the earth data and drawing the usermaps myself, I could have read them wrong and not painted them as detailed as they needed to be.

Terraces also had a lack of training data. Due to the specificity of their appearance, they were able to produce better results than rivers. The models will likely struggle on terraces with odd shapes.

Mountains, hills, and plains all performed very well. There was plenty of samples in the training for these features and the areas for each tend to be large. This allowed the networks to do a great job of modeling these terrain features.

## User Preference Survey
	
We also created a small user survey to measure user preference between the 4 trained models. The survey was conducted through google forms and sent to the students in CSCI 567 (3D User Interfaces) through the piazza message board. I took a sample of 5 user maps, and for each one, I produced the ouput for each model and listed those as multiple choice answers.

We recieved 11 responses. For all 5 samples, users preferred the output of Pix2Pix over the output of CycleGAN. When looking at the results of the original training batch to the augmented training batch, users preferred the ouput of the original batch for 4 samples and the augmented batch for one of the samples.

![Survey](images/survey.png)

Below are some sample usermaps, generated heightmaps and 3d renderings.

![Viz1](images/viz-1.png)
![Viz2](images/viz-2.png)
![Viz3](images/viz-3.png)


# Conclusion

We saw that we can generate good results with generative adversarial networks. It's easy to generate these environments faster and more efficiently than traditional methods.

Using heightmaps as a target allows for the resulting environments to be generalizable. We can import the heightmaps into many popular 3d software applications like Unity, Unreal and Blender.

The training time is computationally intensive, but inference is quick. Once a model is trained, it's easy to generate as many new environments as you want. This has massive improvements over hand crafted environments.

Pix2Pix performs much better than CycleGAN and users prefer its output for this task over CycleGAN for every sample. Pix2Pix offers specificty that CycleGAN can not match.

This is a viable area of research, and there's opportunities to tune these models further to get better results. Training data is the most important part of this project, and spending more time with it will lead to better results. We also show that augmenting the training data is an easy way to expand a dataset, but it can lead to overfitting. There is a middleground between too much and too little for augmentation.

# Future Work

Expanding this idea to include texture maps could be an interesting direction to go. Using this same method, it should be possible to translate a given heightmap into a texturemap. This could allow the designer to have control over generated styles like barren desert scenes vs dark horror scenes vs fantastical colorful scenes. Gathering training data of texturemaps would likely be the bottleneck.

Modifying the network to perform real time generation would be an interesting addition. This would give the user a more interactive experience in designing the enviroments. Current latency with this implementation is not fast enough so new network architectures or approaches would be needed.

Tunable paramaters would also be an interesting addition. Giving the user even more control over the results would lead to a better experience. I can imagine parameters like intensity, noise, smoothness could rusult in a lot of usable outcomes.

Expanding the training set with different means. Needing to draw all the usermaps for the training set is time consuming and error/bias prone. Coming up with a programmatic way to create the usermap training set could have a large impact on the quality of the results.

# Extra

Lastly, here's a table of 10 test images ran through each model.

![Results](images/result-table.png)

# References

@misc{summerville2017procedural,
  title={Procedural Content Generation via Machine Learning (PCGML)},
  author={Adam Summerville and Sam Snodgrass and Matthew Guzdial and Christoffer Holmgård and Amy K. Hoover and Aaron Isaksen and Andy Nealen and Julian Togelius},
  year={2017},
  eprint={1702.00539},
  archivePrefix={arXiv},
  primaryClass={cs.AI}
}

@misc{radford2015unsupervised,
  title={Unsupervised Representation Learning with Deep Convolutional Generative Adversarial Networks},
  author={Alec Radford and Luke Metz and Soumith Chintala},
  year={2015},
  eprint={1511.06434},
  archivePrefix={arXiv},
  primaryClass={cs.LG}
}

@misc{richardson2016mapzen,
  author = {Peter Richardson},
  title = {Tangrams Heightmapper},
  year = 2016,
  publisher = {Mapzen},
  url = {https://github.com/tangrams/heightmapper}
}

@misc{junyanzhu2017github,
  author = {Jun-Yan Zhu},
  title = {Pytorch Pix2Pix and CycleGAN},
  year = 2017,
  url = {https://github.com/junyanz/pytorch-CycleGAN-and-pix2pix}
}
@misc{starscenesoftware2006,
  author = {Star Scene Software},
  title = {Fractscape},
  year = 2006,
  url = {https://starscenesoftware.com/fractscape.html}
}

@misc{perez2017effectiveness,
  title={The Effectiveness of Data Augmentation in Image Classification using Deep Learning},
  author={Luis Perez and Jason Wang},
  year={2017},
  eprint={1712.04621},
  archivePrefix={arXiv},
  primaryClass={cs.CV}
}

@misc{isola2016imagetoimage,
  title={Image-to-Image Translation with Conditional Adversarial Networks},
  author={Phillip Isola and Jun-Yan Zhu and Tinghui Zhou and Alexei A. Efros},
  year={2016},
  eprint={1611.07004},
  archivePrefix={arXiv},
  primaryClass={cs.CV}
}

@misc{zhu2017unpaired,
  title={Unpaired Image-to-Image Translation using Cycle-Consistent Adversarial Networks},
  author={Jun-Yan Zhu and Taesung Park and Phillip Isola and Alexei A. Efros},
  year={2017},
  eprint={1703.10593},
  archivePrefix={arXiv},
  primaryClass={cs.CV}
}

@misc{paszke2019pytorch,
  title={PyTorch: An Imperative Style, High-Performance Deep Learning Library},
  author={Adam Paszke and Sam Gross and Francisco Massa and Adam Lerer and James Bradbury and Gregory Chanan and Trevor Killeen and Zeming Lin and Natalia Gimelshein and Luca Antiga and Alban Desmaison and Andreas Köpf and Edward Yang and Zach DeVito and Martin Raison and Alykhan Tejani and Sasank Chilamkurthy and Benoit Steiner and Lu Fang and Junjie Bai and Soumith Chintala},
  year={2019},
  eprint={1912.01703},
  archivePrefix={arXiv},
  primaryClass={cs.LG}
}

@misc{park2019semantic,
  title={Semantic Image Synthesis with Spatially-Adaptive Normalization},
  author={Taesung Park and Ming-Yu Liu and Ting-Chun Wang and Jun-Yan Zhu},
  year={2019},
  eprint={1903.07291},
  archivePrefix={arXiv},
  primaryClass={cs.CV}
}

@misc{beckham2017step,
  title={A step towards procedural terrain generation with GANs},
  author={Christopher Beckham and Christopher Pal},
  year={2017},
  eprint={1707.03383},
  archivePrefix={arXiv},
  primaryClass={stat.ML}
}

@misc{ wiki:procedural,
  author = "{Wikipedia contributors}",
  title = "Procedural generation --- {Wikipedia}{,} The Free Encyclopedia",
  year = "2019",
  url = "https://en.wikipedia.org/w/index.php?title=Procedural_generation&oldid=928346717",
  note = "[Online; accessed 9-December-2019]"
}