/*global Scene, CA*/
//*************************************************
let TestScene = function (options) {
    'use strict';
    Scene.call(this, options);
    this.rocketLauncher = new RocketLauncher(this);
    this.init();    
};
TestScene.prototype = Object.create(Scene.prototype);
TestScene.prototype.constructor = TestScene;

TestScene.prototype.init = function () {
    'use strict';
    /*  
    let pop = new Pop(300, 18, DNA);
    pop.evolve('to be or not to be', 300, 0.01);
    //*/
    this.rocketLauncher.init();
    
    // step 1: new Pop
    // step 2 : inject DNA into Rocket
    // step 3 : launch sim
    // step 3a : render sim each step
    // step 4 : when sim is done => crossover
    // step 5 : goto step 2 
};
//*
TestScene.prototype.loop = function () {
    'use strict';
    this.ctx.clearRect(0, 0, this.size.x, this.size.y);
    this.rocketLauncher.update();
}
//*/