/*global Scene, Mover, MouseEvtListener, Emitter, Gravity, Vector2*/
let ShatteringScene = function (options) {
	"use strict";
    Scene.call(this, options);
    this.intro("Shattering", "Touch a mover to explode it.");

    this.maxMovers = 30;
    this.s = Math.min(this.size.x, this.size.y) / this.maxMovers;

    this.movers = [];
    this.emitters = [];
    this.addListener(new MouseEvtListener(this, (p) => this.shatter(p)));
    this.gravity = new Gravity(0, 0.08);

    let i = 0;
    for (i; i < this.maxMovers; i += 1) {
        this.createMover();
    }
};
ShatteringScene.prototype = Object.create(Scene.prototype);
ShatteringScene.prototype.constructor = ShatteringScene;

ShatteringScene.prototype.loop = function () {
    "use strict";
    this.ctx.clearRect(0, 0, this.size.x, this.size.y);
    let i = 0;

    if (this.movers.length < this.maxMovers && Math.random() < 0.02) {
       this.createMover();
    }

    for (i = 0; i < this.movers.length; i += 1) {
        this.gravity.applyOn(this.movers[i]);
        this.movers[i].update(1);
        this.movers[i].display(this.ctx);
    }

    for (i = 0; i < this.emitters.length; i += 1) {
        this.emitters[i].apply(this.gravity);
        this.emitters[i].step(this.ctx);
    }

    for (i = this.emitters.length - 1; i >= 0; i -= 1) {
        if (this.emitters[i].isAlive === false) {
            this.emitters.splice(i, 1);
        }
    }

	Scene.prototype.loop.call(this);
};


ShatteringScene.prototype.shatter = function (position, touches) {
    "use strict";
    let i = 0, t = 0, d = 0, m = null;
    for (i = this.movers.length - 1; i >= 0; i -= 1) {
        if (position.x - this.movers[i].location.x < this.s) {
            if (position.y - this.movers[i].location.y < this.s) {
                d = Vector2.distance(position, this.movers[i].location);

                if (d <= this.movers[i].mass) {
                    m = this.movers.splice(i, 1);
                    this.createEmitter(m[0].location, m[0].mass, m[0].color.h);
                    this.vibrate(60);
                }
            }
        }
    }    
};


ShatteringScene.prototype.createEmitter = function (position, mass, hue) {
    "use strict";
    let emitter = new Emitter(this, position),
        angle = Math.PI * 4 * (Math.random() - 0.5);
    emitter.setAngle(0, Math.PI * 2);
    // 8: particles emitted / frame
    // 6: emitter's life (in frames)
    emitter.setEmitterLife(8, mass / 4);
    // 200: max particles count each frame
    // 0.03: the particle decrease rate over time
    emitter.setParticlesLife(200, 0.03);
    // 3: particles speed
    emitter.setParticlesSpeed(5);
    emitter.setParticlesTorque(angle);
    emitter.baseColor = hue;
    this.emitters.push(emitter);
};

ShatteringScene.prototype.createMover = function () {
    "use strict";
    let mover = new Mover(0, 0, this, this.s);
    mover.initRandomly();
    this.movers.push(mover);
};