/*global Scene, B2Vec2, B2World, MouseEvtListener, Box2dEntity,
Vector2, Box, CircleBoundary, ContactListener, Color*/
//*************************************************
var CollisionListenerScene = function () {
	"use strict";
    Scene.call(this);
    this.maxBoxes = 50;
    this.scale = 10;
    
    this.color = Color.createHsl(0.85, 0.9, 0.65);
    this.boxes = [];
    this.boundaries = [];
    
    this.world = new B2World(new B2Vec2(0, 0), true);
    this.world.SetContactListener(new ContactListener());
    
    this.createboundaries();
    this.createBox(new Vector2(this.size.x / 2, this.size.y / 2));
    this.mouseListener = new MouseEvtListener(this.canvas, this, this.mouseStartEvt, this.mouseStopEvt);
};
CollisionListenerScene.prototype = Object.create(Scene.prototype);
CollisionListenerScene.prototype.constructor = CollisionListenerScene;


CollisionListenerScene.prototype.loop = function () {
    "use strict";
    var i = 0;
    this.ctx.clearRect(0, 0, this.size.x, this.size.y);
    this.world.Step(
        1 / 30,   //frame-rate
        10,       //velocity iterations
        10       //position iterations
    );
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

CollisionListenerScene.prototype.createBox = function (position) {
    "use strict";
    var b = new Box(position.x, position.y, this, this.world, this.scale);
    b.setCollisionEvents(this, this.startCollisionEvent, this.endCollisionEvent);
    this.boxes.push(b);
    
    // limit boxes number
    if (this.boxes.length > this.maxBoxes) {
        this.boxes[0].killBody();
        this.boxes.shift();
    }
};

CollisionListenerScene.prototype.createboundaries = function (position) {
    "use strict";
    var boundary = new CircleBoundary(this, this.world, this.scale);
    boundary.getEntityByName("b").body.SetAngularVelocity(Math.PI / 2);
    this.boundaries.push(boundary);
};

CollisionListenerScene.prototype.mouseStartEvt = function (position) {
    "use strict";
    var body = null,
        p = new B2Vec2(position.x / this.scale, position.y / this.scale);
    body = Box2dEntity.getBodyAt(p, this.world);

    // if nothing => new creation
    if (body === null) {
        this.createBox(position);
        this.mouseJoint = null;
    }
};

CollisionListenerScene.prototype.startCollisionEvent = function (e1, e2) {
    "use strict";
    e1.changeColor(this.color);
};

CollisionListenerScene.prototype.endCollisionEvent = function (e1, e2) {
    "use strict";
    e1.restoreColor();
};