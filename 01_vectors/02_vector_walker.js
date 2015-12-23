/*global Scene, Color, Tools, toxi, Vector2, MouseEvtListener*/
var VectorWalkerScene = function () {
	"use strict";
    Scene.call(this);
    this.position = new Vector2(this.size.x / 2, this.size.y / 2);
    this.velocity = new Vector2(0, 0);
    this.t = 0;
    this.size = 5;
    this.stepsize = 1;
    this.color = Color.createNormalDistribColor();
    this.mousePosition = null;
    this.mouseListener = new MouseEvtListener(this.canvas, this, this.mouseEvent);
};
VectorWalkerScene.prototype = Object.create(Scene.prototype);
VectorWalkerScene.prototype.constructor = VectorWalkerScene;

VectorWalkerScene.prototype.loop = function (ctx) {
	"use strict";
    this.step();
    var c = this.color.modify(this.stepsize / this.size.x, 0, 0);
    this.color = c;
    
    this.ctx.fillStyle = c.ToHex();
    this.ctx.beginPath();
    this.ctx.arc(this.position.x, this.position.y, this.size, 0, Math.PI * 2);
    this.ctx.closePath();
    this.ctx.fill();

    Scene.prototype.loop.call(this);
};

VectorWalkerScene.prototype.step = function () {
	"use strict";
    
    // perlin noise based move 
    var stepsize = 3, dx = 0, dy = 0,
        // map x and y to [-1, 1]
        x = (this.position.x - this.size.x / 2) / this.size.x,
        y = (this.position.y - this.size.y / 2) / this.size.y,
        a =  toxi.math.noise.simplexNoise.noise(x, y, this.t);
    this.velocity.x = Math.cos(a * Math.PI) * stepsize;
    this.velocity.y = Math.sin(a * Math.PI) * stepsize;
        
    // 5% chance to seek the mouse
    if (this.mousePosition !== null && Math.random() < 0.5) {
        dx = (this.position.x - this.mousePosition.x) / this.size.x;
        dy = (this.position.y - this.mousePosition.y) / this.size.y;
        this.velocity.x += dx;
        this.velocity.y += dy;
    }
    
    // color
    this.stepsize = Math.min(this.velocity.x, this.velocity.y);
	this.position.x += this.velocity.x;
	this.position.y += this.velocity.y;
    
    if (this.position.x <= 0) { this.position.x += this.size.x; }
    if (this.position.y <= 0) { this.position.y += this.size.y; }
    
    if (this.position.x > this.size.x) { this.position.x -= this.size.x; }
    if (this.position.y > this.size.y) { this.position.y -= this.size.y; }
    
    this.t += 0.001;
};

VectorWalkerScene.prototype.mouseEvent = function (position) {
    "use strict";
    this.mousePosition = position;
};
