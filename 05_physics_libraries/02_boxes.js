/*global Scene, B2Vec2, B2World, MouseEvtListener, Box2dEntity, Vector2,
Box, Circle, Poly, Alien, Car, JointPair, PerlinBoundary, CurvyBoundary,
Boundary, PolyBoundary, ChainBoundary, KinematicObstacle, CircleBoundary*/
//*************************************************
var BoxesScene = function (options) {
	"use strict";
    Scene.call(this);
    if (options === undefined) {
        options.boxes_type = 0;
    }
    this.options = options;
    this.maxBoxes = 50;
    this.scale = 30;
    
    /*
    this.debugDraw = new B2DebugDraw();
    this.debugDraw.SetSprite(this.ctx);
    this.debugDraw.SetDrawScale(30.0);
    this.debugDraw.SetFillAlpha(0.3);
    this.debugDraw.SetLineThickness(1.0);
    this.debugDraw.SetFlags(Box2D.Dynamics.b2DebugDraw.e_shapeBit | Box2D.Dynamics.b2DebugDraw.e_jointBit);
    this.world.SetDebugDraw(this.debugDraw);
    */
    this.boxes = [];
    this.boundaries = [];
    this.mouseJoint = null;
    this.mouseJointActif = false;
    this.gravity = new B2Vec2(0, 10);
    
    this.initScene();
    this.world = new B2World(this.gravity, true);
    
    this.createboundaries();
    this.createBox(new Vector2(this.size.x / 2, this.size.y / 2));
    this.mouseListener = new MouseEvtListener(this.canvas, this, this.mouseStartEvt, this.mouseStopEvt);
};
BoxesScene.prototype = Object.create(Scene.prototype);
BoxesScene.prototype.constructor = BoxesScene;


BoxesScene.prototype.loop = function () {
    "use strict";
    var i = 0;
    this.ctx.clearRect(0, 0, this.size.x, this.size.y);
    this.world.Step(
        1 / 30,   //frame-rate
        10,       //velocity iterations
        10       //position iterations
    );
    //this.world.DrawDebugData();
    this.world.ClearForces();
    
    for (i = 0; i < this.boundaries.length; i += 1) {
        this.boundaries[i].update();
        this.boundaries[i].display(this.ctx);
    }
    
    for (i = 0; i < this.boxes.length; i += 1) {
        this.boxes[i].update();
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

    this.frameloop.display(this.ctx);
	Scene.prototype.loop.call(this);
};

BoxesScene.prototype.initScene = function () {
    "use strict";
    // Box
    if (this.options.boxes_type === 0) { this.maxBoxes = 300; }
    
    // Pair
    if (this.options.boxes_type === 4) { this.maxBoxes = 20; }

    // Car
    if (this.options.boxes_type === 6) { this.maxBoxes = 10; }
    
    // MouseJoint
    if (this.options.boxes_type === 7) { this.mouseJointActif = true; }
    
    // Attraction Force 
    if (this.options.boxes_type === 9) {
        this.mouseJointActif = true;
        this.gravity = new B2Vec2(0, 0);
    }
    
    // collistion listening Force 
    if (this.options.boxes_type === 10) { this.listeningCollision = true; }
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
    
    // Car
    } else if (this.options.boxes_type === 6) {
        this.boxes.push(new Car(position.x, position.y, this, this.world, this.scale));
    
    // MouseJoint
    } else if (this.options.boxes_type === 7) {
        this.boxes.push(new Box(position.x, position.y, this, this.world, this.scale));
    
    // KinematicBody
    } else if (this.options.boxes_type === 8) {
        this.boxes.push(new Circle(position.x, position.y, this, this.world, this.scale));
        
    // Attraction Force
    } else if (this.options.boxes_type === 9) {
        this.boxes.push(new Circle(position.x, position.y, this, this.world, this.scale));
    }
    
    // limit boxes number
    if (this.boxes.length > this.maxBoxes) {
        this.boxes[0].killBody();
        this.boxes.shift();
    }
};

BoxesScene.prototype.createboundaries = function (position) {
    "use strict";
    // no boundary for boxes_type === 0
    // Circle
    if (this.options.boxes_type === 1) {
        this.boundaries.push(new PerlinBoundary(this, this.world, this.scale));

    // Polygon
    } else if (this.options.boxes_type === 2) {
        this.boundaries.push(new CurvyBoundary(this, this.world, this.scale));

    // Alien
    } else if (this.options.boxes_type === 3) {
        this.boundaries.push(new PolyBoundary(this, this.world, this.scale));

    // Pair
    } else if (this.options.boxes_type === 4) {
        this.boundaries.push(new Boundary(this, this.world, this.scale));

    // ChainBoundary
    } else if (this.options.boxes_type === 5) {
        this.boundaries.push(new ChainBoundary(this, this.world, this.scale));

    // Car
    } else if (this.options.boxes_type === 6) {
        this.boundaries.push(new PerlinBoundary(this, this.world, this.scale));

    // MouseJoint
    } else if (this.options.boxes_type === 7) {
        this.boundaries.push(new Boundary(this, this.world, this.scale));
    
    // KinemaicBoundary 
    } else if (this.options.boxes_type === 8) {
        this.boundaries.push(new KinematicObstacle(this, this.world, this.scale));
        
    // Attraction Force
    } else if (this.options.boxes_type === 9) {
        this.boundaries.push(new CircleBoundary(this, this.world, this.scale));
    }
};

BoxesScene.prototype.mouseStartEvt = function (position) {
    "use strict";
    var body = null,
        p = new B2Vec2(position.x / this.scale, position.y / this.scale);
        
     // if no mouse joint
    if (this.mouseJoint === null) {
        body = Box2dEntity.getBodyAt(p, this.world);

        // if nothing => new creation
        if (body === null) {
            this.createBox(position);
            this.mouseJoint = null;
        } else if (this.mouseJointActif === true) {
            //body.ApplyImpulse({ x: 1000, y: -1000 }, body.GetWorldCenter());
            this.mouseJoint = Box2dEntity.addMouseJoint(body, position, this.world, this.scale);
        }
    // if mouse joint exists
    } else {
        this.mouseJoint.SetTarget(p);
    }
};

BoxesScene.prototype.mouseStopEvt = function (position) {
    "use strict";
    if (this.mouseJoint !== null) {
        this.world.DestroyJoint(this.mouseJoint);
        this.mouseJoint = null;
    }
};