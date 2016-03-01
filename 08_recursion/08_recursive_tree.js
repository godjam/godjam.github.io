/*global Scene, RecursiveTree*/
//*************************************************
var RecursiveTreeScene = function() {
    "use strict";
    Scene.call(this);
    this.intro("Recursive Tree");
    this.tree = new RecursiveTree();
};
System.extends(RecursiveTreeScene, Scene);

RecursiveTreeScene.prototype.loop = function() {
    this.ctx.clearRect(0, 0, this.size.x, this.size.y);
    this.frameloop.display(this.ctx);
    this.tree.display(this.ctx);

    Scene.prototype.loop.call(this);
};