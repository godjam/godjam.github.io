/*global Scene, Emitter, MouseEvtListener, Vector2, console*/
//*************************************************
var SystemOfSystemsScene = function () {
	"use strict";
    Scene.call(this);
    this.lastTime = 500;
    this.emitters = [];
    this.mouseListener = new MouseEvtListener(this.canvas, this, this.createEmitter);
    this.createEmitter(new Vector2(this.size.x / 2, this.size.y / 2));
};
SystemOfSystemsScene.prototype = Object.create(Scene.prototype);
SystemOfSystemsScene.prototype.constructor = SystemOfSystemsScene;

SystemOfSystemsScene.prototype.loop = function () {
    "use strict";
    this.ctx.clearRect(0, 0, this.size.x, this.size.y);
    this.lastTime += this.frameloop.delta;
    
    var i = 0;
    for (i; i < this.emitters.length; i += 1) {
        this.emitters[i].step(this.ctx);
    }
    for (i = this.emitters.length - 1; i >= 0; i -= 1) {
        if (this.emitters[i].isAlive === false) {
            this.emitters.splice(i, 1);
        }
    }
	Scene.prototype.loop.call(this);
};


SystemOfSystemsScene.prototype.createEmitter = function (position) {
    "use strict";
    if (this.lastTime >= 300) {
        this.lastTime = 0;
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
        this.emitters.push(emitter);
    }
};