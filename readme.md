# The Nature Of Code 
Orginal book by Daniel Shiffman (can be found on: http://natureofcode.com/book/)

Project link: https://godjam.github.io/ (A random experiment is loaded each time) 

## About this project
This is a translation of "The Nature Of Code" book in vanilla Javascript. I start this as a toy project during last summer holidays.

My goal was to deepen my knowledge of JS / Canvas / creative coding.

It's a project "à la cool", I started it without internet (holidays, remember?) so there is no stuff about node nor other internet based dependencies resolution.

## Design and limitations
As I said, I start this project as a toy, I also add several constrains: 
- It should be fun. I tried to push every example to something enjoyable to see or to play with.
- It should run on a mobile device. I spent time to design a menu system working on desktop / mobile in a fun and usable way. 
- It should be open source.
- I also give the source reference of every piece of code I used (for instance: the easing system in classes/Tools.js)
- I also tried to use some cool CSS3 features. For instance transformations. Always keeping in mind it should run smoothly on a mobile device.

Later in the process, I added two more constrains:
- To be available on the web, not only for me. So a github static website fits perfectly.
- To be able to access directly to a scene in a restful way. (for instance: one can access to the scene "Confetti", from chapter 04, exercise 08, using the following URL: http://godjam.github.io/index.html?s=04_08 )


## Test plateforms
I test on the fly on several browser/OS combination.
I have an Android phone (a Nexus 5), an Android tablet (a Galaxy Tab 3 10.1 - Intel based processor) and an I3 based Win10 laptop.

It has been tested on:
- Chrome desktop: v 47.0.2526.106m +
- Chrome mobile: v 47.0.2526.83 +
- Firefox destop: v 43.0.2 +
- Firefox mobile: v 43.0 +
- Edge: v 20.10240.16384.0 +

## What I learned about JS.
Vanilla Javascript: 
- It's pretty fast, easy to use.
- It runs everywhere.
- Can be long to master. Yes, I'm looking at you "this". Also, functions object parameters are references. That could lead to tricky border effects (I have strong C/C++/C#/Java reflexes). I've also written some projects in ES6 and Typescript. Both are really joyful to use. Here, I didn't want to download nor use a transpiler. (In the beginning, the code I wrote was mostly 2D canvas code, so strong structured code was not a need).
- standard 2D canvas is generally pretty fast. (Particularly on Chrome. Unfortunately, not on the Galaxy tab 3 10.1, probably because of the CPU).

## The libs it uses.
The original work from D. Shieffman was in Processing. A great layer on top of the Java language. Plus, some chapters of the book use physics libraries.
Find the best equivalence in JS was not an easy task. Here are my choices.
All of these are great libraries I recommend (and work as monolithic standalone dependencies): 
- Toxiclib.js: http://haptic-data.com/toxiclibsjs 
- Box2dWeb.js: https://github.com/hecht-software/box2dweb
- Three.js: http://threejs.org/
    
After a few months working on my side on this project, I find myself interested in the "evolution" of Processing.
Here are some port of the Processing layer in JS, I think, easier to use than just using the standard canvas, events, objects, etc.
I link them only in the case someone is interested in, I didn't use them in this project:
- Processing.js: http://processingjs.org/ (I understand it as a project that allows to execute Processing sketches directly in a JS app).
- P5.js: http://p5js.org/ (A direct rewrite of Processing on top of JS)


Hope you enjoy it!

Godjam.
