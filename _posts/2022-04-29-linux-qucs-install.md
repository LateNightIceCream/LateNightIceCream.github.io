---
layout: post
title: "Installing qucs on and Ubuntu based systems"
tags: Linux Electronics qucs
titleimage: "/assets/images/dogger1.jpg"
---

Here's how to install qucs on Linux Mint:

1. Follow the tutorial on the [qucs github repo](https://github.com/Qucs/qucs)
Install dependencies
```
sudo apt install adms automake build-essential libtool libtool-bin gperf flex bison pkg-config libqt4-dev libqt4-qt3support
```
If this error comes up:
```
E: Package 'libqt4-dev' has no installation candidate
E: Unable to locate package libqt4-qt3support
```
use [this fix](https://askubuntu.com/questions/1274134/cannot-install-qt-4-on-ubuntu-20-04-quite-universal-circuit-simulator-qucs):
```
sudo add-apt-repository ppa:rock-core/qt4
sudo apt update
sudo apt install qt4-dev-tools libqt4-dev libqtcore4 libqtgui4
```
Then, if this error comes when running `make`:
```
rcc: could not exec '/usr/lib/qt5/bin/rcc': No such file or directory
```
Install this:
```
sudo apt install qt5-default
```
