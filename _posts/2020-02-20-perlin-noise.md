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
p5js has a `noise()` function which is great for generating random numbers between 0 and 1 in a "controlled" and maybe less random and more natural way. The noise model behind this function is called "Perlin noise", [this article](https://genekogan.com/code/p5js-perlin-noise/) explains it very well.

A noice property of the `noise(x)` function is that any value x will lead to the same return value no matter when the function is called (in the same program iteration). This is very useful to create periodic but also random behavior e.g. by using the value of `noise()` as the argument of the `sin()` function.

Because the average change in the noise-value for any small change in the argument's value is relatively small compared to e.g. a white noise signal, the function of the Perlin Noise has a very natural feel to it.

