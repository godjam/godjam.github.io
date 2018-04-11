/*global Scene, CA*/
//*************************************************
let RocketsScene = function (options) {
    'use strict';
    Scene.call(this, options);
    this.intro("Genetic algorithm", "These smart rockets evolve in order to find target.");

    this.rocketSim = new RocketSim(this);
    this.init();

};
RocketsScene.prototype = Object.create(Scene.prototype);
RocketsScene.prototype.constructor = RocketsScene;

RocketsScene.prototype.init = function () {
    'use strict';
    /*  
    let pop = new Pop(300, 18, DNA);
    pop.evolve('to be or not to be', 300, 0.01);
    //*/
    this.rocketSim.init();
};
RocketsScene.prototype.loop = function () {
    'use strict';
    this.ctx.clearRect(0, 0, this.size.x, this.size.y);
    this.rocketSim.update();
}