/*global Scene, B2Vec2, B2World, MouseEvtListener, Box2dEntity, Box, Vector2*/
//*************************************************
var BoxesScene = function () {
	"use strict";
    Scene.call(this);
    var gravity = new B2Vec2(0, 10);
    this.world = new B2World(gravity, true);
//    this.debugDraw = new B2DebugDraw();
//    this.debugDraw.SetSprite(this.ctx);
//    this.debugDraw.SetDrawScale(30.0);
//    this.debugDraw.SetFillAlpha(0.3);
//    this.debugDraw.SetLineThickness(1.0);
//    this.debugDraw.SetFlags(Box2D.Dynamics.b2DebugDraw.e_shapeBit | Box2D.Dynamics.b2DebugDraw.e_jointBit);
//    this.world.SetDebugDraw(this.debugDraw);
    this.scale = 30;
    this.boxes = [];
    this.createBox(new Vector2(this.width / 2, this.height / 2));
    this.mouseListener = new MouseEvtListener(this.canvas, this, this.createBox);
};
BoxesScene.prototype = Object.create(Scene.prototype);
BoxesScene.prototype.constructor = BoxesScene;


BoxesScene.prototype.loop = function () {
    "use strict";
    var i = 0;
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.world.Step(
        1 / 60,   //frame-rate
        10,       //velocity iterations
        10       //position iterations
    );
    //this.world.DrawDebugData();
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


BoxesScene.prototype.createBox = function (position) {
    "use strict";
    this.boxes.push(new Box(position.x, position.y, this, this.world, this.scale));
};