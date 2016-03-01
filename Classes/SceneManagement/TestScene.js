/*global Scene, FactoryModule*/
//*************************************************
var TestScene = function () {
    "use strict";
    Scene.call(this);
    FactoryModule.create(this);
    FactoryModule.createSpaceShip(this);
};
System.extends(TestScene, Scene);

TestScene.prototype.loop = function () {
    "use strict";
    this.ctx.clearRect(0, 0, this.size.x, this.size.y);
    this.frameloop.display(this.ctx);
    Scene.prototype.loop.call(this);
};