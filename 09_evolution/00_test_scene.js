/*global Scene, CA*/
//*************************************************
let TestScene = function (options) {
    'use stric';
    Scene.call(this, options);
    this.init();
};
TestScene.prototype = Object.create(Scene.prototype);
TestScene.prototype.constructor = TestScene;

TestScene.prototype.init = function () {
    'use strict';
    
    let pop = new Pop(300, 18);
    pop.evolve('to be or not to be', 300, 0.01);
};
