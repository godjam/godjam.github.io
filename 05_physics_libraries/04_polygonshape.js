/*global Scene, B2Vec2, B2World, MouseEvtListener, Box2dEntity, Circle, Vector2, CurvyBoundary, Poly*/
//*************************************************
var PolygonShapeScene = function () {
	"use strict";
    Scene.call(this);
    var gravity = new B2Vec2(0, 10);
    this.world = new B2World(gravity, true);
    this.scale = 30;
    this.boxes = [];
    this.createPolygon(new Vector2(this.size.x / 2, this.size.y / 2));
    this.boundary = new CurvyBoundary(this, this.world, this.scale);
    this.mouseListener = new MouseEvtListener(this.canvas, this, this.createPolygon);
};
PolygonShapeScene.prototype = Object.create(Scene.prototype);
PolygonShapeScene.prototype.constructor = PolygonShapeScene;


PolygonShapeScene.prototype.loop = function () {
    "use strict";
    var i = 0;
    this.ctx.clearRect(0, 0, this.size.x, this.size.y);
    this.world.Step(1 / 60, 10, 10);
    this.world.ClearForces();
    this.boundary.display(this.ctx);
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


PolygonShapeScene.prototype.createPolygon = function (position) {
    "use strict";
    this.boxes.push(new Poly(position.x, position.y, this, this.world, this.scale));
    if (this.boxes.length > 50) {
        this.boxes[0].killBody();
        this.boxes.shift();
    }
};