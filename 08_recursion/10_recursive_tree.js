/*global Scene, RecursiveTree*/
//*************************************************
let RecursiveTreeScene = function(options) {
    "use strict";
    Scene.call(this, options);
    this.intro("Recursive Tree");
    const w = Math.min(this.size.x, this.size.y);
    let baseSize = w / 6;
    let steps = Tools.clamp(w / 10, 3, 9);
    this.tree = new RecursiveTree(this, this.size.x / 2, this.size.y * 0.8, -baseSize, steps);
};
RecursiveTreeScene.prototype = Object.create(Scene.prototype);
RecursiveTreeScene.prototype.constructor = RecursiveTreeScene;


RecursiveTreeScene.prototype.loop = function() {
    this.ctx.clearRect(0, 0, this.size.x, this.size.y);
    this.tree.update(this.frameloop.delta);
    this.tree.display(this.ctx);

    Scene.prototype.loop.call(this);
};