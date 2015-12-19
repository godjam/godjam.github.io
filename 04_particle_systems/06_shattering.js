/*global Scene, Mover, MouseEvtListener, Emitter, Gravity, Vector2*/
var ShatteringScene = function () {
	"use strict";
    Scene.call(this);
    this.maxMovers = 30;
    this.size = Math.min(this.width, this.height) / this.maxMovers;
    
    this.movers = [];
    this.emitters = [];
    this.mouseListener = new MouseEvtListener(this.canvas, this, this.shatter);
    this.gravity = new Gravity(0, 0.02);
    
    var i = 0;
    for (i; i < this.maxMovers; i += 1) {
        this.movers[i] = new Mover(0, 0, this, this.size);
        this.movers[i].initRandomly();
    }
};
ShatteringScene.prototype = Object.create(Scene.prototype);
ShatteringScene.prototype.constructor = ShatteringScene;

ShatteringScene.prototype.loop = function () {
    "use strict";
    this.ctx.clearRect(0, 0, this.width, this.height);

    var i = 0;
    for (i = 0; i < this.movers.length; i += 1) {
        this.gravity.applyOn(this.movers[i]);
        this.movers[i].update(true);
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


ShatteringScene.prototype.shatter = function (position) {
    "use strict";
    var i = 0, d = 0, m = null;
    for (i = this.movers.length - 1; i >= 0; i -= 1) {
        if (position.x - this.movers[i].location.x < this.size) {
            if (position.y - this.movers[i].location.y < this.size) {
                d = Vector2.distance(position, this.movers[i].location);

                if (d <= this.movers[i].mass) {
                    m = this.movers.splice(i, 1);
                    this.createEmitter(m[0].location, m[0].mass, m[0].color.h);
                    //console.log(this.movers.length);
                }
            }
        }
    }
};


ShatteringScene.prototype.createEmitter = function (position, speed, hue) {
    "use strict";
    var emitter = new Emitter(this, position),
        angle = Math.PI * 4 * (Math.random() - 0.5);
    emitter.setAngle(0, Math.PI * 2);
    // 4: particles emitted / frame 
    // 12: emitter's life (in frames)
    emitter.setEmitterLife(4, 12);
    // 200: max particles count each frame
    // 0.03: the particle decrease rate over time
    emitter.setParticlesLife(200, 0.03);
    // 3: particles speed 
    emitter.setParticlesSpeed(4);
    emitter.setParticlesTorque(angle);
    emitter.baseColor = hue;
    this.emitters.push(emitter);
};