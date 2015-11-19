/*global Walker, Scene, Color, MouseEvtListener*/
//*************************************************
var WalkerScene = function (options) {
    "use strict";
    Scene.call(this);
    this.options = options;
    this.walker = new Walker(this.width / 2, this.height / 2,
                             this.width, this.height);
    this.mouseListener = new MouseEvtListener(this.ctx.canvas, this.walker, this.walker.mouseEvent);
};
WalkerScene.prototype = Object.create(Scene.prototype);
WalkerScene.prototype.constructor = WalkerScene;


WalkerScene.prototype.loop = function () {
    "use strict";
    this.walker.step(this.options);
    this.walker.display(this.ctx);
    
    Scene.prototype.loop.call(this);
};