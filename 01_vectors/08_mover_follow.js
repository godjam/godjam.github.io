/*global Scene, Mover, MouseEvtListener*/
var MoverFollowScene = function (options) {
    "use strict";
    Scene.call(this, options);
    this.intro("Mover: Pointer Tracking", "The walker will follow the touch events.");

    this.mover = new Mover(this.size.x / 2, this.size.y / 2, this, 20);
    this.addListener(new MouseEvtListener(this.canvas, this, this.mouseEvent));
};
MoverFollowScene.prototype = Object.create(Scene.prototype);
MoverFollowScene.prototype.constructor = MoverFollowScene;

MoverFollowScene.prototype.loop = function () {
    "use strict";
    this.mover.update(1);

    this.ctx.clearRect(0, 0, this.size.x, this.size.y);
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