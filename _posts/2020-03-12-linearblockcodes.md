---
layout: post
title: Linear Block Codes with GNU Octave
date: 2020-03-12
author: Richard Grünert
tags: Octave
comments: true
toc: true
pinned: true
---

## Encoding and Decoding
The task was writing a program to create a linear block code given the number of information bits $m$ and the code length $n$. In order to detect or even correct errors we have to add redundancy (additional, non message bits) to our original message, thereby making $n \neq m$.

This makes for $2^m$ valid codewords out of $2^n$ possible combinations.

The code is _linear_ because any linear combination of valid codewords will also be a valid codeword and it is a _block_ code because each word or block has the same block length $n$. The number of bits used for error detection/correction is given by $k=n-m$.

The code is _systematic_ if the error correctin

```matlab
A = [1,2,3,4];
B = [1,2,3,4];
C = [1,2,3,4];
```
