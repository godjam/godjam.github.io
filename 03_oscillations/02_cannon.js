/*global Scene, Mover, Gravity, MouseEvtListener, Vector2 */
//*************************************************
var CannonScene = function () {
    "use strict";
    Scene.call(this);
    var w = this.width,
        h = this.height,
        force = new Vector2(0, 0);
    
    this.r = Math.min(w, h) / 20;
    
    // random origin force for the cannon
    if (Math.random() > 0.5) {
        force = new Vector2(-this.r / 4, 0);
    } else {
        force = new Vector2(0, -this.r / 4);
    }
    
    this.mouseListener = new MouseEvtListener(this.canvas, this, this.createNewBullet);
    
    this.gravity = new Gravity(0, 0.2);
    this.cannon = new Mover(this.r, h / 2, w, h, this.r * 0.5);
    
    this.cannon.applyUniformForce(force);
    this.bullets = [];
    this.ages = [];
    
    // add first bullet
    this.createNewBullet();
};
CannonScene.prototype = Object.create(Scene.prototype);
CannonScene.prototype.constructor =  CannonScene;

CannonScene.prototype.loop = function () {
    "use strict";
    var i = 0;
    this.ctx.clearRect(0, 0, this.width, this.height);
    
    // move cannon
    this.cannon.update(true);
    this.cannon.display(this.ctx);
    
    // update bullets
    for (i = 0; i < this.bullets.length; i += 1) {
        this.gravity.applyOn(this.bullets[i]);
        this.bullets[i].update(true);
        this.ages[i] += this.frameloop.delta;
        
        // draw
        this.bullets[i].displayAsCircle(this.ctx);
    }
    
    // clean old bullets
    for (i = this.bullets.length - 1; i >= 0; i -= 1) {
        if (this.ages[i] > 5000) {
            this.bullets.splice(i, 1);
            this.ages.splice(i, 1);
        }
    }
    
    this.frameloop.display(this.ctx);
    Scene.prototype.loop.call(this);
};


CannonScene.prototype.createNewBullet = function () {
    "use strict";
    // power = this.r * 2 
    // angle = 45°
    var force = new Vector2.fromPolar(this.r * 1000, Math.PI * 0.9),
    // position is (o, h)
        m = new Mover(this.cannon.location.x, this.cannon.location.y,
                        this.width, this.height,
                        this.r);
    
    // doesn't based on the mover's mass
    m.applyUniformForce(force);
    
    this.bullets.push(m);
    this.ages.push(0);
};