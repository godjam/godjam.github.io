/*global Scene, B2Vec2, B2World, MouseEvtListener, Box2dEntity, Vector2,
Box, Circle, Poly, Alien, JointPair, PerlinBoundary, CurvyBoundary, Boundary, PolyBoundary, ChainBoundary*/
//*************************************************
var BoxesScene = function (options) {
	"use strict";
    Scene.call(this);
    var gravity = new B2Vec2(0, 10);
    this.world = new B2World(gravity, true);
    
    if (options === undefined) {
        options.boxes_type = 0;
    }
    this.options = options;
    this.maxBoxes = 50;
    if (this.options.boxes_type === 0) {
        this.maxBoxes = 300;
    }
    
//    this.debugDraw = new B2DebugDraw();
//    this.debugDraw.SetSprite(this.ctx);
//    this.debugDraw.SetDrawScale(30.0);
//    this.debugDraw.SetFillAlpha(0.3);
//    this.debugDraw.SetLineThickness(1.0);
//    this.debugDraw.SetFlags(Box2D.Dynamics.b2DebugDraw.e_shapeBit | Box2D.Dynamics.b2DebugDraw.e_jointBit);
//    this.world.SetDebugDraw(this.debugDraw);
    
    this.scale = 30;
    this.boxes = [];
    this.boundary = null;
    
    this.createBoundary();
    this.createBox(new Vector2(this.size.x / 2, this.size.y / 2));
    this.mouseListener = new MouseEvtListener(this.canvas, this, this.createBox);
};
BoxesScene.prototype = Object.create(Scene.prototype);
BoxesScene.prototype.constructor = BoxesScene;


BoxesScene.prototype.loop = function () {
    "use strict";
    var i = 0;
    this.ctx.clearRect(0, 0, this.size.x, this.size.y);
    this.world.Step(
        1 / 60,   //frame-rate
        10,       //velocity iterations
        10       //position iterations
    );
    //this.world.DrawDebugData();
    this.world.ClearForces();
    
    if (this.boundary) {
        this.boundary.display(this.ctx);
    }
    
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
    // Box
    if (this.options.boxes_type === 0) {
        this.boxes.push(new Box(position.x, position.y, this, this.world, this.scale));
    
    // Circle
    } else if (this.options.boxes_type === 1) {
        this.boxes.push(new Circle(position.x, position.y, this, this.world, this.scale));
    
    // Polygon
    } else if (this.options.boxes_type === 2) {
        this.boxes.push(new Poly(position.x, position.y, this, this.world, this.scale));
    
    // Alien
    } else if (this.options.boxes_type === 3) {
        this.boxes.push(new Alien(position.x, position.y, this, this.world, this.scale));
    
    // Pair
    } else if (this.options.boxes_type === 4) {
        this.boxes.push(new JointPair(position.x, position.y, this, this.world, this.scale));
        
    // ChainBoundary
    } else if (this.options.boxes_type === 5) {
        this.boxes.push(new Box(position.x, position.y, this, this.world, this.scale));
    }
    
    // limit boxes number
    if (this.boxes.length > this.maxBoxes) {
        this.boxes[0].killBody();
        this.boxes.shift();
    }
};

BoxesScene.prototype.createBoundary = function (position) {
    "use strict";
    // no boundary for boxes_type === 0
    // Circle
    if (this.options.boxes_type === 1) {
        this.boundary = new PerlinBoundary(this, this.world, this.scale);
    
    // Polygon
    } else if (this.options.boxes_type === 2) {
        this.boundary = new CurvyBoundary(this, this.world, this.scale);
    
    // Alien
    } else if (this.options.boxes_type === 3) {
        this.boundary = new PolyBoundary(this, this.world, this.scale);
    
    // Pair
    } else if (this.options.boxes_type === 4) {
        this.boundary = new PerlinBoundary(this, this.world, this.scale);
    
    // ChainBoundary
    } else if (this.options.boxes_type === 5) {
        this.boundary = new ChainBoundary(this, this.world, this.scale);
    }
};