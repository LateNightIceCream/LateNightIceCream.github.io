---
layout: post
title: Algorithmic Solar Tracking with the MSP430 Launchpad
date: 2020-08-12
tags: msp430 solar
toc: false
pinned: true
---

Solar tracking is
[Average solar panel power can be increased by up to 30% using solar tracking methods](https://www.semanticscholar.org/paper/Solar-Tracking-System%3A-More-Efficient-Use-of-Solar-Rizk-Chaiko/5594b5bbb72021eafd8a96452b6bb551d8208094), which is quite a lot!

I saw a lot of people building little solar tracking devices, often with an arduino and some LDRs as sensors, using the shadows cast on the sensors to determine how much to turn the motors that move the panel. [Here are is an example](https://www.instructables.com/id/Arduino-Solar-Tracker/). There are, of course, some disadvantages using the sensoric approach such as clouds scattering the light, or dirt on the sensors, and general measurement accuracy limitations that all have a negative influence on our tracking capability.

But what if we didn't have to rely on sensors to determine the sun's position and instead know it ahead of time? 

Luckily, some nice astronomy-people have figured that one out already! There are different algorithms for calculating the solar position by date and the one I used for my project is called the [Solar Position Algorithm](https://midcdmz.nrel.gov/spa/) (SPA). It's pretty much a black box for me. Time and date in, azimuth and elevation of the sun out. It is even available as a C-Program from the same publisher, which made it especially easy to implement on the MSP430. 

The general implementation idea was: 
1. Use an RTC to get the current date and time 
1. Input it to the SPA
1. Control two motors, setting azimuth and elevation of a panel

## The Hardware
**For the microcontroller**, I used the Ti MSP430F5529 Launchpad, because... I had that lying around and also because I used that at the uni last semester and got a little comfortable using it.

**For the motors**, I decided to use stepper motors, because... I had them lying around. To drive them, I used the DRV8825 carrier board from Pololu which is very easy to interface. You get a motor step of 1.8 degrees divided by the microstepping divisor with every leading edge on its *STP* pin in the direction specified by the *DIR* pin. For each axis of the tracker I also needed a home switch, one of which I got from an old vacuum cleaner and the other one from an old coffee machine. It still smells like coffee today. 

**For the RTC**, I used a module called [Tiny RTC]() which uses a DS1307 IC and is interfaced via I2C.

I 3D printed most of the mechanical parts which worked great and also not so great sometimes. The whole build can be seen in the image below.

Later on in the process I also designed a PCB to hold all the components because I grew tired of all the wires and the flimsy connections to the breadboard.

![img]({{site.baseurl}}/assets/img/solarTracker/breadboard.jpg)
![img]({{site.baseurl}}/assets/img/solarTracker/pcb_top_bottom.png)

## The Software

### SPA
The SPA Program ported very easily to the MSP430. The only real adjustment I had to make was changing a return value from `int` (which is 16 bit wide on the MSP) to `int32`.

One big disadvantage of the MSP430 is that it does not have a dedicated unit for floating point calculations. This makes the float-based calculations of the SPA very slow, taking longer than 1 second for the whole algorithm at 16 MHz. I did not bother to try to optimize a lot of it, though. I let the compiler optimize it for speed and that helped a lot. And while the calculation speed was still very high, it did not really matter since there are no significant changes in the solar position in just one or two seconds and the update time was at 10 minutes. 

### Steppers and RTC
As I already said, the steppers and RTC were really easy to interface. The RTC I2C communication was straightforward, I needed some help from the Internet, though. With the steppers, I initially thought about using a shift register to control the drivers to save some pins, but then did not do it in the end because the MSP has enough pins to supply the whole project. To control the STEP inputs of the drivers, I utilized the timer units of the MSP430 to create two driving PWM Signals which are also fed back and captured in different units to count how many steps were taken. Then, once the desired number of steps are captured, an interrupt is triggered and the PWM Signal ist stopped, halting the respective motor.

The program execution is almost completely interrupt driven, e.g. by home switch interrupts or timer interrupts. I used the SQ pin on the RTC board, which generates a PWM Signal with the frequency specified in its control register (1 Hz in my case), to keep time and determine the time differences between calculations.

I programmed the tracker into different modes based on the solar elevation. It is in "day mode", i.e. its regular operation, when the solar elevation is greater than -6° above the horizon and in "night mode", i.e. no calculations are performed, when it is below -6°. 
