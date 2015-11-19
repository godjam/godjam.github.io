/*global Scene, Mover, MouseEvtListener*/
var MoverFollowScene = function () {
    "use strict";
    Scene.call(this);
    this.mover = new Mover(this.width / 2, this.height / 2,
                             this.width, this.height, 20);
    this.mouseListener = new MouseEvtListener(this.ctx.canvas, this, this.mouseEvent);
};
MoverFollowScene.prototype = Object.create(Scene.prototype);
MoverFollowScene.prototype.constructor =  MoverFollowScene;

MoverFollowScene.prototype.loop = function () {
    "use strict";
    this.mover.update(true);
    
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.mover.display(this.ctx);
    
    Scene.prototype.loop.call(this);
};

MoverFollowScene.prototype.mouseEvent = function (position) {
    "use strict";
    var delta = position.sub(this.mover.location),
        mag = delta.mag();
    delta.normalizeInPlace();
    delta.multInPlace(mag / 2 + 1 / mag);
    
    this.mover.acceleration = delta;
};