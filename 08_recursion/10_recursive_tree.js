/*global Scene, RecursiveTree*/
//*************************************************
let RecursiveTreeScene = function(options) {
    "use strict";
    Scene.call(this, options);
    this.intro("Recursive Tree");
    let s = Math.min(this.size.x, this.size.y) / 6;
    this.tree = new RecursiveTree(this, this.size.x / 2, this.size.y * 0.8, -s, 9);
};
RecursiveTreeScene.prototype = Object.create(Scene.prototype);
RecursiveTreeScene.prototype.constructor = RecursiveTreeScene;


RecursiveTreeScene.prototype.loop = function() {
    this.ctx.clearRect(0, 0, this.size.x, this.size.y);
    this.tree.update(this.frameloop.delta);
    this.tree.display(this.ctx);

    Scene.prototype.loop.call(this);
};