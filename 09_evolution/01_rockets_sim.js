/*global Scene, CA*/
//*************************************************
let RocketsScene = function (options) {
    'use strict';
    Scene.call(this, options);
    this.intro("Genetic algorithm", "These smart rockets evolve to find the best path to the target.");
    this.init();

};
RocketsScene.prototype = Object.create(Scene.prototype);
RocketsScene.prototype.constructor = RocketsScene;

RocketsScene.prototype.init = function () {
    'use strict';
    /*  
    let pop = new Pop(300, 'DNAText', 18, true);
    pop.evolve('to be or not to be', 300, 0.01);
    console.log(pop.generation + " " + pop.best.displayStats())
    /*/
    this.rocketSim = new RocketSim(this);
    this.rocketSim.init();
}

RocketsScene.prototype.loop = function () {
    'use strict';
    this.ctx.clearRect(0, 0, this.size.x, this.size.y);
    this.rocketSim.update();
}