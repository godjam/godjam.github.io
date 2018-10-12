/*global Box2D, Scene, Color*/
let B2BodyDef = Box2D.Dynamics.b2BodyDef,
    B2FixtureDef = Box2D.Dynamics.b2FixtureDef,
    B2DynamicBody = Box2D.Dynamics.b2Body.b2_dynamicBody,
    B2StaticBody = Box2D.Dynamics.b2Body.b2_staticBody,
    B2KinematicBody = Box2D.Dynamics.b2Body.b2_kinematicBody,
    B2World = Box2D.Dynamics.b2World,
    B2DebugDraw = Box2D.Dynamics.b2DebugDraw,
    B2DistanceJointDef = Box2D.Dynamics.Joints.b2DistanceJointDef,
    B2RevoluteJointDef = Box2D.Dynamics.Joints.b2RevoluteJointDef,
    B2MouseJointDef = Box2D.Dynamics.Joints.b2MouseJointDef,
    B2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape,
    B2CircleShape = Box2D.Collision.Shapes.b2CircleShape,
    B2EdgeShape = Box2D.Collision.Shapes.b2EdgeShape,
    B2AABB = Box2D.Collision.b2AABB,
    B2Vec2 = Box2D.Common.Math.b2Vec2;

//*************************************************
let Box2dEntity = function (x, y, scene, world, scale) {
    'use strict';
    if (typeof x !== 'number') {
        throw 'Box2dEntity.constructor: x is not a scalar';
    }
    if (typeof y !== 'number') {
        throw 'Box2dEntity.constructor: y is not a scalar';
    }
    if (scene instanceof Scene === false) {
        throw 'Box2dEntity.constructor: scene is not a Scene';
    }
    if (world instanceof B2World === false) {
        throw 'Box2dEntity.constructor: world is not a World';
    }
    if (typeof scale !== 'number') {
        throw 'Box2dEntity.constructor: scale 1 is not a scalar';
    }
    this.x = x;
    this.y = y;
    this.scene = scene;
    this.body = null;
    this.nameArray = []; // array of entities names
    this.entitiesArray = []; // array of entities objects
    this.scale = scale;
    this.lineWidth = 1;
    this.strokeStyle = '#888';
    this.color = Color.createBrightColor();
    this.originColor = this.color.copy();
    this.deletion = false;
    // collision events
    this.collisionCallbackOwner = null;
    this.startCollisionCallback = null;
    this.endCollisionCallback = null;
};

Box2dEntity.prototype.addEntity = function (name, /* Box2dEntity */ entity) {
    'use strict';

    if (typeof name !== 'string') {
        throw 'Box2dEntity.addEntity : name is not a string';
    }

    if (entity instanceof Box2dEntity === false) {
        throw 'Box2dEntity.addEntity : entity is not a Box2dEntity';
    }

    this.nameArray.push(name); // array of entities names
    this.entitiesArray.push(entity); // array of entities objects
};

Box2dEntity.prototype.getEntityByName = function (name) {
    'use strict';

    if (typeof name !== 'string') {
        throw 'Box2dEntity.getEntityByName : name is not a string';
    }

    let idx = this.nameArray.indexOf(name);
    if (idx >= 0) {
        return this.entitiesArray[idx];
    } else {
        return null;
    }

};

Box2dEntity.prototype.update = function () {
    'use strict';
    let i = 0;

    for (i = 0; i < this.entitiesArray.length; i += 1) {
        this.entitiesArray[i].update();
    }
};

Box2dEntity.prototype.display = function (ctx) {
    'use strict';
    let i = 0,
        center = {
            x: 0,
            y: 0
        };

    if (this.body) {
        center = this.body.GetWorldCenter();
        this.x = center.x * this.scale;
        this.y = center.y * this.scale;
        ctx.save();
        ctx.fillStyle = '#000';
        ctx.translate(this.x, this.y);
        ctx.fillRect(-0.5, -0.5, 1, 1);
        ctx.restore();
    }

    for (i = 0; i < this.entitiesArray.length; i += 1) {
        this.entitiesArray[i].display(ctx);
    }
};

Box2dEntity.prototype.isOut = function () {
    'use strict';
    let i = 0,
        delta = 20,
        isOut = true;

    if (this.entitiesArray.length > 0) {
        for (i = 0; i < this.entitiesArray.length; i += 1) {
            if (this.entitiesArray[i].isOut() === false) {
                isOut = false;
            }
        }

        // if it should be deleted
    } else if (this.deletion === true) {
        isOut = true;

        // if completely out of the screen
    } else if (this.x > -delta &&
        this.x < this.scene.size.x + delta &&
        this.y > -delta &&
        this.y < this.scene.size.y + delta) {
        isOut = false;
    }

    return isOut;
};

Box2dEntity.prototype.killBody = function () {
    'use strict';
    let i = 0,
        body = null;

    if (this.body) {
        this.body.GetWorld().DestroyBody(this.body);
    }

    for (i = 0; i < this.entitiesArray.length; i += 1) {
        body = this.entitiesArray[i].body || null;
        if (body) {
            body.GetWorld().DestroyBody(body);
        }
    }
};

Box2dEntity.prototype.applyForce = function (force) {
    'use strict';
    let i = 0,
        center = null,
        body = null;

    if (force instanceof B2Vec2 === false) {
        throw 'Box2dEntity.applyForce : force is not a B2Vec2';
    }

    if (this.body) {
        center = this.body.GetWorldCenter();
        this.body.ApplyForce(force, center);
    } else {
        for (i = 0; i < this.entitiesArray.length; i += 1) {
            body = this.entitiesArray[i].body || null;
            if (body) {
                body.applyForce(force);
            }
        }
    }

};

Box2dEntity.prototype.attract = function (b, e, G) {
    'use strict';
    if (b instanceof Box2dEntity === false) {
        throw 'Box2dEntity.attract : b is not another Box2dEntity';
    }

    if (e instanceof Box2dEntity === false) {
        throw 'Box2dEntity.attract : e is not another Box2dEntity';
    }

    if (G === undefined) {
        G = 3;
    }

    let bPos = b.body.GetWorldCenter(),
        ePos = e.body.GetWorldCenter(),
        mass = 5,
        force = bPos.Copy(),
        dist = 0,
        strength = 0;
    force.Subtract(ePos);
    // distance
    dist = force.Length();
    // strength computation
    strength = (G * mass * mass) / (dist * dist);
    // force computation
    force.Normalize();
    force.Multiply(strength);
    return force;
};

//*****************************************************************************
// Collision Events
//*****************************************************************************

Box2dEntity.prototype.setCollisionEvents = function (callbackOwner, startCollisionCallback, endCollisionCallback) {
    'use strict';
    this.collisionCallbackOwner = callbackOwner;
    this.startCollisionCallback = startCollisionCallback;
    this.endCollisionCallback = endCollisionCallback;
};

Box2dEntity.prototype.startContact = function (e) {
    'use strict';
    if (e instanceof Box2dEntity === false) {
        throw 'Box2dEntity.startContact : e is not another Box2dEntity';
    }

    if (this.collisionCallbackOwner && this.startCollisionCallback) {
        let c = this.startCollisionCallback.bind(this.collisionCallbackOwner);
        c(this, e);
    }
};

Box2dEntity.prototype.endContact = function (e) {
    'use strict';
    if (e instanceof Box2dEntity === false) {
        throw 'Box2dEntity.endContact : e is not another Box2dEntity';
    }

    if (this.collisionCallbackOwner && this.endCollisionCallback) {
        let c = this.endCollisionCallback.bind(this.collisionCallbackOwner);
        c(this, e);
    }
};

//*****************************************************************************
// Box2d helper functions
//*****************************************************************************
Box2dEntity.prototype.addBody = function (x, y, world, bodyType) {
    'use strict';
    let def = new B2BodyDef(),
        body = null;
    def.position.x = x / this.scale;
    def.position.y = y / this.scale;
    def.type = bodyType;
    body = world.CreateBody(def);
    if (body) {
        body.SetUserData(this);
    }
    return body;
};

Box2dEntity.prototype.createBoxShape = function (halfBoxWidth, halfBoxHeight) {
    'use strict';
    let shape = new B2PolygonShape();
    shape.SetAsBox(
        halfBoxWidth / this.scale,
        halfBoxHeight / this.scale
    );
    return shape;
};

Box2dEntity.prototype.createCircleShape = function (radius) {
    'use strict';
    let shape = new B2CircleShape();
    shape.SetRadius(radius / this.scale);
    return shape;
};

/**
 * the points passed in parameter should define a clockwise convex polygon
 */
Box2dEntity.prototype.createPolyShape = function (points) {
    'use strict';
    let i = 0,
        point = null,
        vertices = [],
        shape = new B2PolygonShape();
    for (i = 0; i < points.length; i += 1) {
        point = new B2Vec2();
        point.Set(
            (points[i].x) / this.scale,
            (-points[i].y) / this.scale
        );
        vertices.push(point);
    }
    shape.SetAsArray(vertices, vertices.length);
    return shape;
};

/**
 * Create an edge between two points
 * Used for convex boundary (CurvyBoundary)
 */
Box2dEntity.prototype.createEdgeShape = function (x1, y1, x2, y2) {
    'use strict';
    let shape = new B2PolygonShape(),
        v1 = new B2Vec2(),
        v2 = new B2Vec2();
    v1.Set(x1 / this.scale, (-y1) / this.scale);
    v2.Set(x2 / this.scale, (-y2) / this.scale);
    shape.SetAsEdge(v1, v2);
    return shape;
};

Box2dEntity.prototype.addFixture = function (shape, body, options) {
    'use strict';
    options = options || {};

    let def = new B2FixtureDef();
    def.shape = shape;
    def.density = options.density || 1;
    def.filter.groupIndex = options.groupindex || 1;
    
    if (body.GetType() === B2DynamicBody) {
        def.friction = options.friction || 0.3;
        def.restitution = options.restitution || 0.5;
    }
    return body.CreateFixture(def);
};

Box2dEntity.prototype.addMotorJoint = function (body1, body2, world, speed, torque) {
    'use strict';
    let def = new B2RevoluteJointDef();
    def.Initialize(body1, body2, body2.GetWorldCenter());
    def.motorSpeed = speed;
    def.maxMotorTorque = torque;
    def.enableMotor = true;
    return world.CreateJoint(def);
};


Box2dEntity.prototype.addOscillatorJoint = function (body1, body2, world, anchor1, anchor2, speed, torque, amplitude, period) {
    'use strict';

    let def = new B2RevoluteJointDef();
    def.Initialize(body1, body2, body2.GetWorldCenter());
    def.motorSpeed = speed;
    def.maxMotorTorque = torque;
    def.enableMotor = true;
    def.enableLimit = true;

    if (anchor1)
        def.localAnchorA.Set(anchor1.x, anchor1.y);
    if (anchor2)
        def.localAnchorB.Set(anchor2.x, anchor2.y);

    let joint = world.CreateJoint(def);
    let baseAngle = body2.GetAngle();

    let limitMin = (baseAngle - amplitude) * Math.PI / 180;
    let limitMax = (baseAngle + amplitude) * Math.PI / 180;

    joint.SetLimits(limitMin, limitMax);

    setInterval(() => {
        joint.SetMotorSpeed(-joint.GetMotorSpeed());
    }, period);

    return joint;
};

Box2dEntity.prototype.addRevoluteJoint = function (body1, body2, world, anchor1, anchor2) {
    'use strict';
    let def = new B2RevoluteJointDef();
    def.Initialize(body1, body2, body2.GetWorldCenter());
    if (anchor1)
        def.localAnchorA.Set(anchor1.x, anchor1.y);
    if (anchor2)
        def.localAnchorB.Set(anchor2.x, anchor2.y);

    return world.CreateJoint(def);
};

Box2dEntity.prototype.addDistanceJoint = function (body1, body2, world, length) {
    'use strict';
    let def = new B2DistanceJointDef();
    def.bodyA = body1;
    def.bodyB = body2;
    def.length = length / this.scale;
    def.frequencyHz = 0;
    def.dampingRatio = 0;
    return world.CreateJoint(def);
};

Box2dEntity.addSpringJoint = function (body1, body2, world, length) {
    'use strict';
    let def = new B2DistanceJointDef(),
        tmp = null;
    def.bodyA = body1;
    def.bodyB = body2;
    def.length = length;
    def.frequencyHz = 4.0;
    def.dampingRatio = 0.5;
    return world.CreateJoint(def);
};

Box2dEntity.addMouseJoint = function (body, position, world, scale) {
    'use strict';
    let def = new B2MouseJointDef();
    def.bodyA = world.GetGroundBody();
    def.bodyB = body;
    def.target.Set(position.x / scale, position.y / scale);
    def.maxForce = 1000 * body.GetMass();
    return world.CreateJoint(def);
};

// http://www.binarytides.com/mouse-joint-box2d-javascript/
/**
 * p is a b2Vec2, represent mouse position in the world coordinates
 * world is the box2D world
 */
Box2dEntity.getBodyAt = function (p, world) {
    'use strict';
    let body = null;
    // Query the world for overlapping shapes.
    function getBodyCallback(fixture) {
        let b = fixture.GetBody();
        if (b.GetType() !== B2StaticBody) {
            body = fixture.GetBody();
            return false;
        }
        return true;
    }
    world.QueryPoint(getBodyCallback, p);
    return body;
};

/*Box2dEntity.getBodyAt = function (p, world) {
    'use strict';
    let body = null,
        inside = false,
        aabb = new B2AABB();
    aabb.lowerBound.Set(p.x - 0.001, p.y - 0.001);
    aabb.upperBound.Set(p.x + 0.001, p.y + 0.001);
    // Query the world for overlapping shapes.
    function getBodyCallback(fixture) {
        let shape = fixture.GetShape();
        if (fixture.GetBody().GetType() !== B2StaticBody) {
            body = fixture.GetBody();
            inside = shape.TestPoint(fixture.GetBody().GetTransform(), p);
            if (inside) {
                body = fixture.GetBody();
                return false;
            }
        }
        return true;
    }
    world.QueryAABB(getBodyCallback, aabb);
    return body;
};*/

//*****************************************************************************
// draw functions
//*****************************************************************************
Box2dEntity.prototype.drawRect = function (ctx, center, angle, width, height) {
    'use strict';
    ctx.save();
    ctx.fillStyle = this.color.rgba();

    ctx.translate(center.x * this.scale, center.y * this.scale);
    ctx.rotate(angle);
    ctx.translate(-width / 2, -height / 2);
    ctx.fillRect(0, 0, width, height);

    if (this.strokeStyle) {
        ctx.lineWidth = this.lineWidth;
        ctx.strokeStyle = this.strokeStyle;
        ctx.strokeRect(0, 0, width, height);
    }
    ctx.restore();
};

Box2dEntity.prototype.drawCircle = function (ctx, center, angle, radius) {
    'use strict';
    ctx.save();
    ctx.lineWidth = this.lineWidth;
    ctx.fillStyle = this.color.rgba();
    ctx.strokeStyle = this.strokeStyle;
    ctx.beginPath();

    ctx.translate(center.x * this.scale, center.y * this.scale);
    ctx.rotate(angle);
    ctx.arc(0, 0, radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();

    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(0, radius);
    ctx.stroke();
    ctx.closePath();
    ctx.restore();
};

Box2dEntity.prototype.drawClosedPolygon = function (ctx, center, angle, vertices) {
    'use strict';
    let i = 0;
    ctx.save();
    ctx.fillStyle = this.color.rgba();
    ctx.beginPath();

    ctx.translate(center.x * this.scale, center.y * this.scale);
    if (angle !== 0) {
        ctx.rotate(angle);
    }

    ctx.moveTo(
        vertices[0].x * this.scale,
        vertices[0].y * this.scale
    );

    for (i = 1; i < vertices.length; i += 1) {
        ctx.lineTo(
            vertices[i].x * this.scale,
            vertices[i].y * this.scale
        );
    }

    ctx.lineTo(
        vertices[0].x * this.scale,
        vertices[0].y * this.scale
    );
    ctx.closePath();
    ctx.fill();

    if (this.strokeStyle) {
        ctx.lineWidth = this.lineWidth;
        ctx.strokeStyle = this.strokeStyle;
        ctx.stroke();
    }

    ctx.restore();
};

Box2dEntity.prototype.drawOpenPolygon = function (ctx, center, angle, vertices) {
    'use strict';
    let i = 0;
    ctx.save();
    ctx.lineWidth = this.lineWidth;
    ctx.strokeStyle = this.strokeStyle;
    ctx.beginPath();

    ctx.translate(center.x * this.scale, center.y * this.scale);
    if (angle !== 0) {
        ctx.rotate(angle);
    }

    ctx.moveTo(
        vertices[0].x * this.scale,
        vertices[0].y * this.scale
    );

    for (i = 1; i < vertices.length; i += 1) {
        ctx.lineTo(
            vertices[i].x * this.scale,
            vertices[i].y * this.scale
        );
    }

    ctx.stroke();

    ctx.closePath();
    ctx.restore();
};

//******************************************************************
// Color management
//******************************************************************
Box2dEntity.prototype.changeColor = function (c) {
    'use strict';
    this.color = c;
};

Box2dEntity.prototype.restoreColor = function () {
    'use strict';
    if (this.originColor) {
        this.color = this.originColor;
    }
};

Box2dEntity.prototype.setColor = function (color) {
    'use strict';
    this.originColor = color;
    this.color = color;
};