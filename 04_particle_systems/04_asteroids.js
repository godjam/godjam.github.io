/*global Scene, Emitter, Mover, MouseEvtListener, Vector2, Friction, console*/
//*************************************************
var AsteroidsScene = function () {
	"use strict";
    Scene.call(this);
    this.friction = new Friction(0.2);
    this.mover = new Mover(this.width / 2, this.height / 2, this, 20);
    this.emitter = new Emitter(this.mover, this, 50, 0.02, Math.PI * 3 / 2, Math.PI / 8, new Vector2(-1, 0));
   
    // this.mouseListener = new MouseEvtListener(this.canvas, this, this.controls);
    this.reactorLeft = false;
    this.reactorRight = false;
    
    window.addEventListener("keydown", this.keyDownListener.bind(this), true);
    window.addEventListener("keyup", this.keyUpListener.bind(this), true);
};
AsteroidsScene.prototype = Object.create(Scene.prototype);
AsteroidsScene.prototype.constructor = AsteroidsScene;
    
AsteroidsScene.prototype.loop = function () {
    "use strict";
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.updateReactors();
    
    this.friction.applyOn(this.mover);
    this.mover.update(true);
    this.mover.displayAsPoly(this.ctx, 3);
    this.emitter.step(this.ctx);

	Scene.prototype.loop.call(this);
};

AsteroidsScene.prototype.keyDownListener = function (event) {
    "use strict";
    if (event.defaultPrevented) {
        return; // Should do nothing if the key event was already consumed.
    }
    switch (event.keyCode) {
    case 38:
        this.reactorLeft = true;
        this.reactorRight = true;
        break;
    case 37:
        this.reactorLeft = true;
        break;
    case 39:
        this.reactorRight = true;
        break;
    }
    event.preventDefault();
};

AsteroidsScene.prototype.keyUpListener = function (event) {
    "use strict";
    if (event.defaultPrevented) {
        return; // Should do nothing if the key event was already consumed.
    }
    switch (event.keyCode) {
    case 38: // up
        this.reactorLeft = false;
        this.reactorRight = false;
        break;
    case 37: // left
        this.reactorLeft = false;
        break;
    case 39: // right
        this.reactorRight = false;
        break;
    }
    event.preventDefault();
};

AsteroidsScene.prototype.updateReactors = function () {
    "use strict";
    if (this.reactorLeft && this.reactorRight === false) {
        this.mover.applyTorque(-0.1);
        this.emitter.setActive(true);
        
    } else if (this.reactorRight && this.reactorLeft === false) {
        this.mover.applyTorque(0.1);
        this.emitter.setActive(true);
    
    } else if (this.reactorRight && this.reactorLeft) {
        var c = Math.cos(this.mover.angle) * 5,
            s = Math.sin(this.mover.angle) * 5;
        this.mover.applyForce(new Vector2(c, s));
        this.emitter.setActive(true);
    } else {
        this.emitter.setActive(false);
    }
    
    this.mover.angularVelocity *= 0.98;
};