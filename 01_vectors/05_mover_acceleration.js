/*global Scene, Mover, MouseEvtListener, Vector2 */
var MoverAccelerationScene = function () {
    "use strict";
    Scene.call(this);
    this.delta = new Vector2(0, 0);
    this.mover = new Mover(this.size.x / 2, this.size.y / 2, this, 20);
    this.eventListeners.push(new MouseEvtListener(this.canvas, this, this.mouseEvent));
};
MoverAccelerationScene.prototype = Object.create(Scene.prototype);
MoverAccelerationScene.prototype.constructor =  MoverAccelerationScene;

MoverAccelerationScene.prototype.loop = function () {
    "use strict";
    this.mover.update(true);
    
    this.ctx.clearRect(0, 0, this.size.x, this.size.y);
    this.mover.display(this.ctx);
    this.drawController();
    // reinit delta
    this.delta.x = 0;
    this.delta.y = 0;
    
    Scene.prototype.loop.call(this);
};

MoverAccelerationScene.prototype.drawController = function () {
    "use strict";
    var s = this.size.x / 20,
        x = (this.delta.x * s * 2) + this.size.x / 2,
        y = (this.delta.y * s * 2) + this.size.y / 2;
    this.ctx.beginPath();
    this.ctx.strokeStyle = "#000";
    this.ctx.lineWidth = 4;
    this.ctx.arc(x, y, s, 0, Math.PI * 2);
    this.ctx.stroke();
    this.ctx.closePath();
};

MoverAccelerationScene.prototype.mouseEvent = function (position) {
    "use strict";
    // move top / down
    this.delta.y = (position.y - this.size.y / 2) / this.size.y;
    // turn left / right
    this.delta.x = (position.x - this.size.x / 2) / this.size.x;
    this.delta.normalizeInPlace();
    this.delta.multInPlace(0.5);
    
    this.mover.acceleration = this.delta.copy();
};