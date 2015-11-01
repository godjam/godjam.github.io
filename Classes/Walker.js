/*global Color*/
function Walker(x, y, maxWidth, maxHeight) {
	"use strict";
    this.x = x;
	this.y = y;
    this.maxWidth = maxWidth;
	this.maxHeight = maxHeight;
    this.stepsize = 1;
    this.color = Color.createLightColor();
    this.mousePosition = null;
}

Walker.prototype.display = function (ctx) {
	"use strict";
    var c = this.color.copy();
    c.modify(this.stepsize / 10, 0, 0);
    
    ctx.fillStyle = c.ToHex();
    ctx.fillRect(this.x - 1, this.y - 1, 2, 2);
};

Walker.prototype.step = function (options) {
	"use strict";
    
    // right walker
    if (options !== undefined && options.walkertype === 0) {
        this.stepRight();
    // mouse walker
    } else if (options !== undefined && options.walkertype === 1) {
        this.stepMouse();
        
    // monte carlo walker
    } else if (options !== undefined && options.walkertype === 3) {
        this.stepMonteCarlo();
    }
    
    if (this.x <= 0) { this.x += this.maxWidth; }
    if (this.y <= 0) { this.y += this.maxHeight; }
    
    if (this.x > this.maxWidth) { this.x -= this.maxWidth; }
    if (this.y > this.maxHeight) { this.y -= this.maxHeight; }
};

Walker.prototype.stepRight = function () {
	"use strict";
    var stepsize = 3,
        stepx = Math.random() * stepsize,
        stepy = Math.random() * stepsize * 2 - stepsize;

    this.stepsize = stepsize;
	this.x += stepx;
	this.y += stepy;
    
    if (this.x <= 0) { this.x += this.maxWidth; }
    if (this.y <= 0) { this.y += this.maxHeight; }
    
    if (this.x > this.maxWidth) { this.x -= this.maxWidth; }
    if (this.y > this.maxHeight) { this.y -= this.maxHeight; }
};


Walker.prototype.stepMouse = function () {
	"use strict";
    var stepsize = 3,
        stepx = Math.random() * stepsize - (stepsize / 2),
        stepy = Math.random() * stepsize - (stepsize / 2);
        
    if (this.mousePosition !== null && Math.random() > 0.2) {
        if (this.mousePosition.x > this.x) { stepx = stepsize; }
        if (this.mousePosition.x < this.x) { stepx = -stepsize; }
        if (this.mousePosition.y > this.y) { stepy = stepsize; }
        if (this.mousePosition.y < this.y) { stepy = -stepsize; }
    }
    
    this.stepsize = stepsize;
	this.x += stepx;
	this.y += stepy;
};

Walker.prototype.stepMonteCarlo = function () {
	"use strict";
    var stepsize = this.montecarlo() * 10,
        stepx = Math.random() * stepsize - (stepsize / 2),
        stepy = Math.random() * stepsize - (stepsize / 2);
    
    this.stepsize = stepsize;
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
