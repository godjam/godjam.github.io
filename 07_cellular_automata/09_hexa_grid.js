/*global Scene, CA2DHex, MouseEvtListener*/
//*************************************************
let HexaGameOfLifeScene = function (options) {
    "use strict";
    Scene.call(this, options);
    this.intro("Hexagonal Petri Box", "Touch to add new cells.");
    this.init();
};
HexaGameOfLifeScene.prototype = Object.create(Scene.prototype);
HexaGameOfLifeScene.prototype.constructor = HexaGameOfLifeScene;

HexaGameOfLifeScene.prototype.init = function () {
    "use strict";
        let cellsize = Math.round(Math.max(8, this.size.x / 50)),
        columns = Math.round(this.size.x / cellsize),
        lines = Math.round(this.size.y / this.size.x * columns);
    this.ca = new CA2DHex(columns, lines, this);
    this.addListener(new MouseEvtListener(this, 
        (pos, pointers) => this.ca.addCells(pos, pointers)));
};

HexaGameOfLifeScene.prototype.loop = function () {
    "use strict";
    this.ctx.clearRect(0, 0, this.size.x, this.size.y);
    this.ca.update();
    this.ca.display(this.ctx);
    Scene.prototype.loop.call(this);
};
