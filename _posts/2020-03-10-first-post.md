---
layout: post
title: Recreating this golden-ratio-circle-thing
date: 2019-06-02
author: Richard Grünert
tags: p5js
comments: true
toc: true
p5js: true
pinned: true
---
## A bunch of circles
Somewhere on the internet i came across this image:

![img]({{ site.baseurl }}/assets/img/grcircles/fibi.png)

And I wondered if I could recreate this in P5js. 
Basically, the ratio of the diameters of two successive circles is the _golden ratio_ $\phi$ ! 

$$
\phi = \frac{1 + \sqrt{5}}{2} \approx 0.618
$$

In my P5js script I started from the "innermost" circle/"orbit", placing each one with a simple for-loop.
```javascript
// setup
// n: number of circles

for(var i = n; i>0; i--) {

  circleDia = width*pow(0.618, i);
    
    .
    .
    .

  orbitArray.push(new Orbit(circleX, circleY, circleDia, 33, 0));

}
```
By multiplying $phi$ $i$ times you get the right ratio for circle $i$.

Next, each circle has to intersect the center of the previous one, so after putting them over one another I had to get the offset right to find the correct X-Position (circleX). After a long time of not finding a solution, I accidentally got the right one which is really simple:


```javascript
for(var i = n; i>0; i--) {

  circleDia = width*pow(0.618, i);

  circleX = circleX + pow(-1, i) * circleDia/2;

  orbitArray.push(new Orbit(circleX, circleY, circleDia, 33, 0));

}
```

`pow(-1, i)` simply determines whether to substract or add circleDia/2 to the previous circleX position, making the circle position switch left with right and right with left with each iteration. This is the result:
![img]({{ site.baseurl }}/assets/img/grcircles/regular.png)


## Extra feature!
I kind of thought of the circles as orbits which is why I decided to add some smaller circles or "planets" which move around in this orbit. The fun part is changing their speeds or colors depending on the orbit's size/position.

```javascript
class Orbit {

  constructor(...) {
     .
     .
     .
  }

  show() {

    noFill();
    stroke(this.orbitHue,this.orbitSat,this.orbitBri);
    circle(this.cX, this.cY, this.cD);

    // planet(s)
    fill(this.planetHue,this.planetSat,this.planetBri);

    for(var i = 0; i<this.numOfPlanets; i++) {

      this.planetX = this.cX + this.cD/2 * cos(this.t + 2*PI/this.numOfPlanets*i);
      this.planetY = this.cY + this.cD/2 * sin(this.t + 2*PI/this.numOfPlanets*i);

      noStroke();
      circle(this.planetX, this.planetY, this.planetD);

    }
  }
}
```

This is the result:

![img]({{ site.baseurl }}/assets/img/grcircles/orb_0.gif)

(The full code can be found [here](https://github.com/latenighticecream/orbity))
