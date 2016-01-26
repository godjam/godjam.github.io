/*global Walker, Scene, Color, MouseEvtListener*/
//*************************************************
var WalkerScene = function (options) {
    "use strict";
    Scene.call(this);
    this.walker = new Walker(this.size.x / 2, this.size.y / 2,
                             this, options);
    this.eventListeners.push(new MouseEvtListener(this.canvas, this.walker, this.walker.mouseEvent));
};
WalkerScene.prototype = Object.create(Scene.prototype);
WalkerScene.prototype.constructor = WalkerScene;


WalkerScene.prototype.loop = function () {
    "use strict";
    this.walker.step();
    this.walker.display(this.ctx);
    Scene.prototype.loop.call(this);
};