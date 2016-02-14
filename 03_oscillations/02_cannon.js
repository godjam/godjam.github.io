/*global Scene, Mover, Gravity, MouseEvtListener, Vector2 */
//*************************************************
var CannonScene = function () {
    "use strict";
    Scene.call(this);
    this.intro("Cannon", "Touch to shoot.");

    var w = this.size.x,
        h = this.size.y,
        force = new Vector2(0, 0);

    this.r = Math.min(w, h) / 40;

    // random origin force for the cannon
    if (Math.random() > 0.5) {
        force = new Vector2(-this.r / 4, 0);
    } else {
        force = new Vector2(0, -this.r / 4);
    }

    this.eventListeners.push(new MouseEvtListener(this.canvas, this, this.createNewBullet));

    this.gravity = new Gravity(0, 0.2);
    this.cannon = new Mover(this.r, h / 2, this, this.r * 2);

    this.cannon.applyUniformForce(force);
    this.bullets = [];
    this.ages = [];
    this.maxAge = 5000; // 5 sec

    // add first bullet
    this.createNewBullet();
};
CannonScene.prototype = Object.create(Scene.prototype);
CannonScene.prototype.constructor =  CannonScene;

CannonScene.prototype.loop = function () {
    "use strict";
    var i = 0;
    this.ctx.clearRect(0, 0, this.size.x, this.size.y);

    // update bullets
    for (i = 0; i < this.bullets.length; i += 1) {
        this.gravity.applyOn(this.bullets[i]);
        this.bullets[i].update(1);
        this.ages[i] += this.frameloop.delta;
        this.bullets[i].mass = this.r * (this.maxAge - this.ages[i]) / this.maxAge;
        // draw
        this.bullets[i].display(this.ctx);
    }

    // clean old bullets
    for (i = this.bullets.length - 1; i >= 0; i -= 1) {
        if (this.ages[i] > 5000) {
            this.bullets.splice(i, 1);
            this.ages.splice(i, 1);
        }
    }

    // move cannon
    this.cannon.update(1);
    this.cannon.displayAsCircle(this.ctx);

    this.frameloop.display(this.ctx);
    Scene.prototype.loop.call(this);
};


CannonScene.prototype.createNewBullet = function () {
    "use strict";
    // power = this.r * 1000
    // angle = 45°
    var force = new Vector2.fromPolar(this.r * 1000, Math.PI * 0.75),
    // position is (o, h)
        m = new Mover(this.cannon.location.x, this.cannon.location.y, this, this.r);

    // doesn't based on the mover's mass
    m.applyUniformForce(force);

    m.applyTorque(Math.PI * 1.1);
    this.bullets.push(m);
    this.ages.push(0);
};