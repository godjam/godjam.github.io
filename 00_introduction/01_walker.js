/*global Walker, Scene, Color, MouseEvtListener*/
//*************************************************
var WalkerScene = function (options) {
    "use strict";
    Scene.call(this);
    // right walker
    if (options.walkertype === 0) {
        this.intro("Right Walker", "Walker will go right.");
        
    // mouse weighted walker
    } else if (options.walkertype === 1) {
        this.intro("Weighted Random Walker", "Walker reacts to touch.");
    // mormal distrib walker
    } else if (options.walkertype === 2) {
        this.intro("Normal Distribution Walker", "Walker step size follows normal ditribution.");
            
    // monte carlo walker
    } else if (options.walkertype === 3) {
        this.intro("Monte Carlo Walker", "Walker step size follows Monte Carlo method.");

    // perlin walker
    } else if (options.walkertype === 4) {
        this.intro("Perlin Walker", "Walker step follows a Perlin noise.");
    }
    
    this.walker = new Walker(this.size.x / 2, this.size.y / 2, this, options);
    this.eventListeners.push(new MouseEvtListener(this.canvas, this.walker, this.walker.mouseEvent));
};
WalkerScene.prototype = Object.create(Scene.prototype);
WalkerScene.prototype.constructor = WalkerScene;


WalkerScene.prototype.loop = function () {
    "use strict";
    this.walker.step();
    this.walker.display(this.ctx);
    Scene.prototype.loop.call(this);
};