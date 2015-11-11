/*global Scene, Mover, MouseEvtListener*/
var MoverAccelerationScene = function () {
    "use strict";
    Scene.call(this);
    this.mover = new Mover(this.width / 2, this.height / 2,
                             this.width, this.height, 20);
    this.mouseListener = new MouseEvtListener(this.clientLeft, this.clientTop, this, this.mouseEvent);
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
    var fx = 0, fy = 0;
    
    // move top / down
    fy  = (position.y - this.height / 2) / this.height;
    this.mover.acceleration.y = 0.5 * fy;
    
    // turn left / right
    fx = (position.x - this.width / 2) / this.width;
    this.mover.acceleration.x = 0.5 * fx;
};