---
layout: post
title: p5js Perlin Noise
date: 2020-02-20
author: Richard Grünert
tags: p5js
comments: true
toc: true
p5js: true
pinned: true
---

## Nice Noise
p5js has a `noise()` function which is great for generating random numbers between 0 and 1 in a "controlled" and maybe less random and more natural way. The noise model behind this function is called "Perlin noise", [this article](https://genekogan.com/code/p5js-perlin-noise/) explains it very well. The function can take up to 3 arguments (x, y, z) specifying the coordinate vector in the generated noise-space. It also allows finetuning with the additional [`noiseDetail()`](https://p5js.org/reference/#/p5/noiseDetail) function. 

Here is an example to demonstrate the difference between the `random()` and the `noise()` function:

![img]({{ site.baseurl}}/assets/img/noise/noise.png)
![img]({{ site.baseurl}}/assets/img/noise/random.png)

```javascript
var pointsX = [];
var pointsY = [];

const noiseXOffset = 5;
const circleDia    = 10;

var r,g,b;

function setup() {
  createCanvas(500, 500);
  
  for(var i = 0; i < width; i++) {
  
    pointsX[i] = width*noise(i);
    pointsY[i] = width*noise(i + noiseXOffset);
  
  }
}

function draw() {

  background("#e9ecef");
  noStroke();
  
  for(var i = 0; i < width; i++) {
  
    r = 255*noise(i);
    g = 0;
    b = 255*noise(i+noiseXOffset);
    
    fill(r,g,b);
    
    circle(pointsX[i], pointsY[i], circleDia);
  
  }
}
```

Here, the position and color of each circle is controlled by the `noise()` (upper image) or the `random()` (lower image) function respectively.

A noice property of the `noise(x)` function is that any value x will lead to the same return value no matter when the function is called (in the same program iteration). This is very useful to create periodic but also random behavior e.g. by using the value of `noise()` as the argument of the `sin()` function.

Because the average change in the noise-value for any small change in the argument's value is relatively small compared to e.g. a white noise signal, the function of the Perlin Noise has a very natural feel to it. As explained in the [function reference](https://p5js.org/reference/#/p5/noise), considering smoothness, absolute coordinate values do not matter as much as the relative distance between two coordinates.
By adjusting the argument so that successive coordinates are close in the noise-space you get this smooth looking but still random progression of y-values:
![img]({{ site.baseurl }}/assets/img/noise/perlintrace.png)

```javascript
 ...
pointsY[i] = height/4+height/2*noise(i*0.01);
 ...
```

## Bored of two dimensions?
Time to go 3D! For this I arranged some cubes on the x-y-plane and modified their z-position and their color with the noise function. Using the z-position as an argument for the noise function of the colors, you can get a nice repeating color pattern (since each z-position is basically assigned a color value).

```javascript
...
posZ = factor * noise(p, k, t);

b = 255*noise(posZ/10);
r = 255*noise(posZ/10+10);
...
```
p and k are the row and column indices and t is a variable that is incremented by a small amount each frame. Playing around with the `noise()` function for posZ results in very different behavior.

![img]({{ site.baseurl}}/assets/img/noise/3D_1.gif)
![img]({{ site.baseurl}}/assets/img/noise/3D_2.gif)

## Combining 
Both the `random()` and the `noise()` function have their specific applications. Here is an example of combining both:
![img]({{ site.baseurl}}/assets/img/noise/swoosh_0.gif)

The `random()` function is used to assign a y-Position to each of the circles based on their x-Position and the `noise()` function is used in a weird combination with the `sin()` function to change the x-Positions and the colors.

I also found a little optical illusion that when you look at this gif for a while and then at the top image on this page it looks as if the static circles are moving, at least that happened to me ^^.
