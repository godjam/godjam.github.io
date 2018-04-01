/*global Scene, CA2D, MouseEvtListener*/
//*************************************************
var GameOfLifeScene = function (options) {
    "use strict";
    Scene.call(this, options);
    this.intro("Game Of Life", "Touch to add new cells.");
    this.init();
};
GameOfLifeScene.prototype = Object.create(Scene.prototype);
GameOfLifeScene.prototype.constructor = GameOfLifeScene;

GameOfLifeScene.prototype.init = function () {
    "use strict";
    var cellsize = Math.round(Math.max(8, this.size.x / 50)),
    columns = Math.round(this.size.x / cellsize),
    lines = Math.round(this.size.y / cellsize);
    this.ca = new CA2D(columns, lines, this);
    this.addListener(new MouseEvtListener(this.ctx.canvas, this.ca, this.ca.addCells));
};

GameOfLifeScene.prototype.loop = function () {
    "use strict";
    this.ctx.clearRect(0, 0, this.size.x, this.size.y);
    //this.frameloop.display(this.ctx);
    this.ca.update();
    this.ca.display(this.ctx);
    Scene.prototype.loop.call(this);
};
