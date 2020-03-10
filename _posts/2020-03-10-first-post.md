---
layout: post
title: Recreating this golden-ratio-circle-thing
date: 2019-06-02
author: 来自中世界
tags: [sample, document]
comments: true
toc: true
pinned: true
---
Somewhere on the internet i came across this image:
![img]()

And I wondered if I could recreate this in P5js. 
Basically, the ratio of the diameters of two successive circles is the golden ratio!
In my P5js script I started from the "innermost" circle and used a simple for loop to get the right offset. Each circle has to intersect the center of the previous one. After a long time of not finding a solution, I accidentally got the right one:
