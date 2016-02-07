/*global Scene, Emitter, Mover, Vector2, Friction, VirtualDPad, console*/
//*************************************************
var AsteroidsScene = function () {
	"use strict";
    Scene.call(this);
    this.intro("Asteroids", "Use the virtual pad or the arrow keys to move the ship.");

    this.friction = new Friction(0.2);
    this.mover = new Mover(this.size.x / 2, this.size.y / 2, this, 20);
    this.emitter = new Emitter(this);
    this.emitter.setOwner(this.mover, new Vector2(-1, 0));
    this.emitter.setAngle(Math.PI * 3 / 2, Math.PI / 8);
    this.emitter.addParticle();
    // VirtualDPad
    this.eventListeners.push(new VirtualDPad(this.canvas, this, this.updateReactors));
};
AsteroidsScene.prototype = Object.create(Scene.prototype);
AsteroidsScene.prototype.constructor = AsteroidsScene;

AsteroidsScene.prototype.loop = function () {
    "use strict";
    this.ctx.clearRect(0, 0, this.size.x, this.size.y);

    this.friction.applyOn(this.mover);
    this.mover.update(true);
    this.mover.displayAsPoly(this.ctx, 3);
    this.emitter.step(this.ctx);

	Scene.prototype.loop.call(this);
};

AsteroidsScene.prototype.updateReactors = function (padState) {
    "use strict";
    // padState
    if (padState.d.x > 0) {
        this.mover.applyTorque(-0.1);
        this.emitter.setActive(true);
    }
    else if (padState.d.x < 0) {
        this.mover.applyTorque(0.1);
        this.emitter.setActive(true);
    }
    else if (padState.action === true) {
        var c = Math.cos(this.mover.angle) * 5,
            s = Math.sin(this.mover.angle) * 5;
        this.mover.applyForce(new Vector2(c, s));
        this.emitter.setActive(true);
    }
    else {
        this.emitter.setActive(false);
    }

    this.mover.angularVelocity *= 0.98;
};

AsteroidsScene.prototype.stop = function () {
    Scene.prototype.stop.call(this);
};