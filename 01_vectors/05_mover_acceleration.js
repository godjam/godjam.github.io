/*global Scene, Mover, MouseEvtListener, Vector2 */
var MoverAccelerationScene = function () {
    "use strict";
    Scene.call(this);
    this.mover = new Mover(this.width / 2, this.height / 2,
                             this.width, this.height, 20);
    this.mouseListener = new MouseEvtListener(this.canvas, this, this.mouseEvent);
};
MoverAccelerationScene.prototype = Object.create(Scene.prototype);
MoverAccelerationScene.prototype.constructor =  MoverAccelerationScene;

MoverAccelerationScene.prototype.loop = function () {
    "use strict";
    this.mover.update(true);
    
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.mover.display(this.ctx);
    
    Scene.prototype.loop.call(this);
};

MoverAccelerationScene.prototype.mouseEvent = function (position) {
    "use strict";
    var delta = new Vector2(0, 0);
    // move top / down
    delta.y = (position.y - this.height / 2) / this.height;
    // turn left / right
    delta.x = (position.x - this.width / 2) / this.width;
    delta.normalizeInPlace();
    delta.multInPlace(0.5);
    
    this.mover.acceleration = delta;
};