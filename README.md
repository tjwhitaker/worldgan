# WorldGAN

3D Environment Generation Using Deep Adversarial Networks

## Videos

- Checkpoint 1: https://www.youtube.com/watch?v=jP5bdHnInEw
- Checkpoint 2: https://www.youtube.com/watch?v=-EoIp0KwEag
- Checkpoint 3: https://www.youtube.com/watch?v=YByEOAzlYIo
- Checkpoint 4: https://www.youtube.com/watch?v=OBWqvTyUInY

## Canvas

A paint-like GUI. Simple HTML/CSS/JS. Run with a simple web server.

```
~$ cd canvas
~/canvas$ python -m http.server
```

## Data

This folder will hold the terrain and splatmap datasets for training our GAN.

## Heightmapper

A great open source project to display the earth as an interactive heightmap.

```
~$ cd heightmapper
~/heightmapper$ python -m http.server
```

## Pix2Pix

The GAN architecture. Installation instructions found https://github.com/phillipi/pix2pix.

## Proposal

Proposal tex and pdf files.

## Utilities

Random tools.

Building a dataset for terrain maps. Run the heightmapper tool locally and then run the datagenerator utility. The utility uses puppeteer, a headless browser API, to download heightmaps from the heightmapper tool we have running. We're going to use this to build the dataset.

```
~$ cd heightmapper
~/heightmapper$ python -m http.server
Serving HTTP on 0.0.0.0 port 8000 (http://0.0.0.0:8000/) ...
```

```
~$ cd utilities/datagenerator
~/utilities/datagenerator$ npm install
~/utilities/datagenerator$ npm start
```

While script runs, it will save images (512 x 512 pixels) into the data folder. Once the script is done running, it will create a meta.json file containing an array of the following values for each image.

```
{
  "file": filename,
  "url": url,
  "lat": latitude,
  "lon": longitude,
  "max": maxElevation,
  "min": minElevation,
  "sf": scaleFactor
}
```