/*global Scene, Emitter, MouseEvtListener, Vector2, console*/
//*************************************************
var SystemOfSystemsScene = function () {
	"use strict";
    Scene.call(this);
    this.lastTime = 500;
    this.emitters = [];
    this.mouseListener = new MouseEvtListener(this.canvas, this, this.createEmitter);
    this.createEmitter(new Vector2(this.width / 2, this.height / 2));
};
SystemOfSystemsScene.prototype = Object.create(Scene.prototype);
SystemOfSystemsScene.prototype.constructor = SystemOfSystemsScene;

SystemOfSystemsScene.prototype.loop = function () {
    "use strict";
    this.ctx.clearRect(0, 0, this.width, this.height);
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
        var emitter = new Emitter(this, position.copy());
        emitter.setAngle(0, Math.PI * 2);
        // 60: particles emitted / frame 
        // 20: emitter's life (in frames)
        // 3: particles speed 
        emitter.setEmitterLife(5, 15, 3);
        // 100: max particles count each frame
        // 0.03: the particle decrease rate over time
        emitter.setParticlesLife(200, 0.03);
        this.emitters.push(emitter);
    }
};