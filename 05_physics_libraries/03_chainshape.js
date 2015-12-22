/*global Scene, B2Vec2, B2World, MouseEvtListener, Box2dEntity, Circle, Vector2, CurvyBoundary*/
//*************************************************
var ChainShapeScene = function () {
	"use strict";
    Scene.call(this);
    var gravity = new B2Vec2(0, 10);
    this.world = new B2World(gravity, true);
    this.scale = 30;
    this.boxes = [];
    this.createCircle(new Vector2(this.width / 2, this.height / 2));
    this.boxes.push(new CurvyBoundary(this, this.world, this.scale));
    this.mouseListener = new MouseEvtListener(this.canvas, this, this.createCircle);
};
ChainShapeScene.prototype = Object.create(Scene.prototype);
ChainShapeScene.prototype.constructor = ChainShapeScene;


ChainShapeScene.prototype.loop = function () {
    "use strict";
    var i = 0;
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.world.Step(1 / 60, 10, 10);
    this.world.ClearForces();
    for (i = 0; i < this.boxes.length; i += 1) {
        this.boxes[i].display(this.ctx);
    }

    for (i = this.boxes.length - 1; i >= 0; i -= 1) {
        if (this.boxes[i] instanceof Box2dEntity) {
            if (this.boxes[i].isOut()) {
                this.boxes[i].killBody();
                this.boxes.splice(i, 1);
            }
        }
    }
	Scene.prototype.loop.call(this);
};


ChainShapeScene.prototype.createCircle = function (position) {
    "use strict";
    this.boxes.push(new Circle(position.x, position.y, this, this.world, this.scale));
};