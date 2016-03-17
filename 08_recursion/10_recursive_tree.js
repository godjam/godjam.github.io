/*global Scene, RecursiveTree*/
//*************************************************
var RecursiveTreeScene = function() {
    "use strict";
    Scene.call(this);
    this.intro("Recursive Tree");
    var s = Math.min(this.size.x, this.size.y) / 6;
    this.tree = new RecursiveTree(this, this.size.x / 2, this.size.y * 0.8, -s, 9);
};
System.extends(RecursiveTreeScene, Scene);

RecursiveTreeScene.prototype.loop = function() {
    this.ctx.clearRect(0, 0, this.size.x, this.size.y);
    this.frameloop.display(this.ctx);
    this.tree.update(this.frameloop.delta);
    this.tree.display(this.ctx);

    Scene.prototype.loop.call(this);
};