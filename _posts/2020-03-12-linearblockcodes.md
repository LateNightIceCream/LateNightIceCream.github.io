---
layout: post
title: Linear Block Codes with GNU Octave
date: 2020-03-12
author: Richard Grünert
tags: Octave
comments: true
pinned: true
---

[Full Code](https://github.com/LateNightIceCream/Informationsuebertragung/blob/master/Homework%20I/ha.m)
## Encoding and Decoding

The task was writing a program to create a linear block code given the number of information bits $m$ and the code length $n$. In order to detect or even correct errors we have to add redundancy (additional, non message bits) to our original message, thereby making $n \neq m$ and creating valid codewords representing our message(s) and invalid codewords that should only appear at the receiver when the transmission was erroneous.

This makes for $2^m$ valid codewords out of $2^n$ possible combinations.

Error detection and correction is not only relevant for data transmission but also for data _storage_ to be able to reconstruct information from faulty memory.

Short Explanations:

* The code is _linear_ because any linear combination of valid codewords will also be a valid codeword and it is a _block_ code because each word or block has the same block length $n$. The number of redundant bits used for error detection/correction is given by $k=n-m$.

* The code is _systematic_ if the original message bits (input symbol) are directly readable from the codeword.

* The _hamming distance_ $d$ is the number of bits in which two (valid) codewords differ. Looking at the whole code, the _minimum (hamming) distance_ $d_{min} of the code will be the smallest hamming distance.

* The number of detectable error-bits is given by
$$t_{det}\leq d_{min} - 1$$

* The number of correctable error-bits $t_{cor}$ is given by
$$t_{cor} \leq \frac{d_{min} - 1}{2}$$

* All possible operations, i.e. addition and and multiplication, have to be modulo 2 sums and products (congruence class).

* A linear block code can be specified by ($n$, $m$, $d_{\mathrm{min}}$).

## Octave implementation
This is an example implementation in Octave using a (6,3,3)-code.
Because our code is systematic, our generator matrix $G$ will have the form

$$G = ( I_{m \times m} | A)$$

where $I$ is the identity matrix and $A$ is our basic codeword matrix.

So the first step is to define $m$ basic Codewords (length $n$) which each make up one row of our generator Matrix, making sure that their minimum Hamming distance is at least the distance specified ($d_{\mathrm{min}}$). From these basic codewords all other codewords (total of $2^m = 8$) can be created by linear combination. Because the identity Matrix is a given we only have to figure out the last $n-m$ digits of each codeword. For example:
```matlab
dmin = 3;

basicWords = [1 1 1;
              1 0 1;
              1 1 0;]
```

