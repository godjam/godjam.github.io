/*global Scene, MouseEvtListener, Spring, Mover, Gravity, Friction*/
var SpringsScene = function (options) {
    "use strict";
    this.intro("Springs", "Simulates a spring attached to a spring.");

    Scene.call(this, options);
    var w = this.size.x,
        h = this.size.y,
        s = Math.min(w, h),
        r0 = Math.random() * s / 4 + s / 4;
    this.spring0 = new Spring(w / 2, 0, r0);
    this.spring1 = new Spring(w / 2, r0, r0);

    this.mover0 = new Mover(w / 2, r0, this, s / 20);
    this.mover1 = new Mover(w / 2, r0, this, s / 20);

    this.gravity = new Gravity(0, 0.02);
    this.friction = new Friction(0.2);

    this.addListener(new MouseEvtListener(this.canvas, this, this.attract));
};
SpringsScene.prototype = Object.create(Scene.prototype);
SpringsScene.prototype.constructor = SpringsScene;

SpringsScene.prototype.loop = function () {
    "use strict";
    this.ctx.clearRect(0, 0, this.size.x, this.size.y);

    this.spring0.applyOn(this.mover0);
    this.gravity.applyOn(this.mover0);
    this.friction.applyOn(this.mover0);
    this.mover0.update(false);
    this.spring0.constrainLength(this.mover0, 0, this.spring0.restLength * 2);

    this.spring1.anchor = this.mover0.location;
    this.spring1.applyOn(this.mover1);
    this.gravity.applyOn(this.mover1);
    this.friction.applyOn(this.mover1);
    this.mover1.update(false);
    this.spring1.constrainLength(this.mover1, 0, this.spring1.restLength * 2);



    this.spring0.display(this.ctx);
    this.spring1.display(this.ctx);
    this.mover0.display(this.ctx);
    this.mover1.display(this.ctx);
    Scene.prototype.loop.call(this);
};

SpringsScene.prototype.attract = function (position) {
    "use strict";
    this.mover0.location = position;
    //this.mover0.location.x = this.size.x / 2;
};