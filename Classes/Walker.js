/*global Color, Tools, toxi*/
function Walker(x, y, scene, options) {
	"use strict";
    this.x = x;
	this.y = y;
    this.t = 0;
    this.size = 5;
    this.scene = scene;
    this.stepsize = 1;
    this.color = Color.createLightColor();
    this.mousePosition = null;
    this.options = options;
    
    if (this.options === undefined) {
        this.options = {walkertype: 0};
    }
}

Walker.prototype.display = function (ctx) {
	"use strict";
    var c = this.color.modify(this.stepsize / this.scene.size.x, 0, 0);
    this.color = c;
    ctx.fillStyle = c.ToHex();
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();
};

Walker.prototype.step = function () {
	"use strict";
    
    // right walker
    if (this.options.walkertype === 0) {
        this.stepRight();
    // mouse weighted walker
    } else if (this.options.walkertype === 1) {
        this.stepMouse();
        
    // mormal distrib walker
    } else if (this.options.walkertype === 2) {
        this.stepNormalDistrib();
            
    // monte carlo walker
    } else if (this.options.walkertype === 3) {
        this.stepMonteCarlo();

    // perlin walker
    } else if (this.options.walkertype === 4) {
        this.stepPerlin();
    }
    
    if (this.x <= 0) { this.x += this.scene.size.x; }
    if (this.y <= 0) { this.y += this.scene.size.y; }
    
    if (this.x > this.scene.size.x) { this.x -= this.scene.size.x; }
    if (this.y > this.scene.size.y) { this.y -= this.scene.size.y; }
};

Walker.prototype.stepRight = function () {
	"use strict";
    var stepsize = 3,
        stepx = Math.random() * stepsize,
        stepy = Math.random() * stepsize * 2 - stepsize;

    this.stepsize = stepsize;
	this.x += stepx;
	this.y += stepy;
    
    if (this.x <= 0) { this.x += this.scene.size.x; }
    if (this.y <= 0) { this.y += this.scene.size.y; }
    
    if (this.x > this.scene.size.x) { this.x -= this.scene.size.x; }
    if (this.y > this.scene.size.y) { this.y -= this.scene.size.y; }
};


Walker.prototype.stepMouse = function () {
	"use strict";
    var stepsize = 3,
        stepx = Math.random() * stepsize - (stepsize / 2),
        stepy = Math.random() * stepsize - (stepsize / 2);
        
    // 5% chance to seek the mouse
    if (this.mousePosition !== null && Math.random() < 0.05) {
        if (this.mousePosition.x > this.x) { stepx = stepsize; }
        if (this.mousePosition.x < this.x) { stepx = -stepsize; }
        if (this.mousePosition.y > this.y) { stepy = stepsize; }
        if (this.mousePosition.y < this.y) { stepy = -stepsize; }
    }
    
    // color
    this.stepsize = stepx;
	this.x += stepx;
	this.y += stepy;
};

Walker.prototype.stepNormalDistrib = function () {
	"use strict";
    var sd = 3, stepsize = 5,
        // normalRnd * sd + mean
        stepx = Tools.normalRnd() * sd * stepsize,
        stepy = Tools.normalRnd() * sd * stepsize;
    // color
    this.stepsize = stepy;
	this.x += stepx;
	this.y += stepy;
};


Walker.prototype.stepPerlin = function () {
	"use strict";
    var stepsize = 3,
        // map x and y to [-1, 1]
        x = (this.x - this.scene.size.x / 2) / this.scene.size.x,
        y = (this.y - this.scene.size.y / 2) / this.scene.size.y,
        a =  toxi.math.noise.simplexNoise.noise(x, y, this.t),
        stepx = Math.cos(a * Math.PI) * stepsize,
        stepy = Math.sin(a * Math.PI) * stepsize;
    // color
    this.stepsize = Math.max(stepy, stepx);
	this.x += stepx;
	this.y += stepy;
    this.t += 0.01; /*+ Math.random() / 50*/
};


Walker.prototype.stepMonteCarlo = function () {
	"use strict";
    var stepsize = this.montecarlo() * 10,
        stepx = Math.random() * stepsize - (stepsize / 2),
        stepy = Math.random() * stepsize - (stepsize / 2);
    
    this.stepsize = stepsize / 8;
	this.x += stepx;
	this.y += stepy;
};

Walker.prototype.montecarlo = function () {
    "use strict";
    while (true) {
        var r1 = Math.random(),
            p = r1,
            r2 = Math.random();
        if (r2 < p) { return r1; }
    }
};

Walker.prototype.mouseEvent = function (position) {
    "use strict";
    this.mousePosition = position;
};
