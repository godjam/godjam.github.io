/*global console, Scene, B2Vec2, B2World, MouseEvtListener, Box2dEntity,
Vector2, Box, Boundary, ContactListener, Color, Tools*/
//*************************************************
var CollisionListenerScene = function () {
	"use strict";
    Scene.call(this);
    this.maxBoxes = 50;
    this.scale = 30;
    this.nextBoxesInfos = [];
    
    this.color = Color.createHsl(0.85, 0.9, 0.65);
    this.boxes = [];
    this.boundaries = [];
    
    this.world = new B2World(new B2Vec2(0, 10), true);
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

    if (this.nextBoxesInfos.length > 0) {
        this.createNextBoxes();
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

CollisionListenerScene.prototype.createBox = function (position, nextInfos) {
    "use strict";
    var boxW = Math.random() * 16 + 16,
        boxH = Math.random() * 16 + 16,
        color = null,
        force = null,
        torque = null,
        b = null;
    
    if (nextInfos) {
        if (nextInfos.boxW) { boxW = nextInfos.boxW; }
        if (nextInfos.boxH) { boxH = nextInfos.boxH; }
        if (nextInfos.color) { color = nextInfos.color; }
        if (nextInfos.force) { force = nextInfos.force; /*force.Multiply(1.2);*/ }
        if (nextInfos.torque) { torque = nextInfos.torque; torque *= 0.1; }
    }
    
    // box +  size
    b = new Box(position.x, position.y, this, this.world, this.scale, boxW, boxH);
    
    // collision events
    b.setCollisionEvents(this, this.startCollisionEvent, this.endCollisionEvent);
    
    // color
    if (color) {b.setColor(color); }
    
    // forces
    if (force) {b.applyForce(force); }
    if (torque) {b.body.ApplyTorque(torque); }
    
    this.boxes.push(b);
    
    // limit boxes number
    /*
    if (this.boxes.length > this.maxBoxes) {
        this.boxes[0].killBody();
        this.boxes.shift();
    }
    */
};

CollisionListenerScene.prototype.createNextBoxes = function () {
    "use strict";
    var pos = null,
        nextInfos = null,
        i = 0,
        r = Math.round(Math.random() * 2 + 1);
    
    while (this.nextBoxesInfos.length > 0) {
        nextInfos = this.nextBoxesInfos.shift();
        pos = nextInfos.position;
        
        for (i = 0; i < r; i += 1) {
            this.createBox(pos, nextInfos);
        }
    }
};

CollisionListenerScene.prototype.createboundaries = function (position) {
    "use strict";
    var boundary = new Boundary(this, this.world, this.scale);//new CircleBoundary(this, this.world, this.scale);
    //boundary.getEntityByName("b").body.SetAngularVelocity(Math.PI / 2);
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
    //e1.changeColor(this.color);
    
};

CollisionListenerScene.prototype.endCollisionEvent = function (e1, e2) {
    "use strict";
    //e1.restoreColor();
    
    if (e2.boxW === undefined) {e2.boxW = 3; }
    if (e2.boxH === undefined) {e2.boxH = 3; }
    
    var v1 = e1.body.GetLinearVelocity(),
        v2 = e2.body.GetLinearVelocity(),
        m1 = Tools.clamp(e1.boxW * e1.boxH / 100, 1, 10),
        m2 = Tools.clamp(e2.boxW * e2.boxH / 100, 1, 10),
        v = v1.Copy(),
        d = 0,
        e = 0,
        p = e1.body.GetWorldCenter(),
        a = e1.body.GetAngularVelocity();
    
    v.Subtract(v2);
    d = v.Length();
    e = (m1 + m2) * d * d * 0.5;

    // console.log(d.toFixed(0), m1.toFixed(0), m2.toFixed(0), e.toFixed(0));
    // console.log(m1.toFixed(0), e.toFixed(0));
    
                
    if (e > m1 * m1 * 20) {
        e1.deletion = true;
        if (m1 > 1) {
            this.nextBoxesInfos.push({
                position: new Vector2(p.x * this.scale, p.y * this.scale),
                boxW: e1.boxW / 2,
                boxH: e1.boxH / 2,
                color: e1.originColor,
                force: v1,
                torque: a
            });
        }
    }
};