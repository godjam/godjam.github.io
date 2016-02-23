/*global Scene, Mover, VirtualDPad, Vector2 */
var MoverAccelerationScene = function () {
    "use strict";
    Scene.call(this);
    this.intro("Mover: Acceleration", "Use the virtual pad or the arrow keys to accelerate the mover.");

    this.delta = new Vector2();
    this.mover = new Mover(this.size.x / 2, this.size.y / 2, this, 20);
    this.eventListeners.push(new VirtualDPad(this.canvas, this, this.dPadEvent));
};
MoverAccelerationScene.prototype = Object.create(Scene.prototype);
MoverAccelerationScene.prototype.constructor =  MoverAccelerationScene;

MoverAccelerationScene.prototype.loop = function () {
    "use strict";
    this.mover.update(1);

    this.ctx.clearRect(0, 0, this.size.x, this.size.y);
    this.mover.display(this.ctx);

    Scene.prototype.loop.call(this);
};

MoverAccelerationScene.prototype.dPadEvent = function (padState) {
    "use strict";
    // move top / down
    this.delta.y = padState.d.y * 10;
    // turn left / right
    this.delta.x = padState.d.x * 10;

    this.mover.applyForce(this.delta);
};