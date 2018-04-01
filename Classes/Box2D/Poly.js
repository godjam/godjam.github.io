/*global Box2dEntity, B2BodyDef, B2FixtureDef, B2PolygonShape, B2DynamicBody, B2Vec2*/
let Poly = function (x, y, scene, world, scale) {
    "use strict";
    Box2dEntity.call(this, x, y, scene, world, scale);
    this.strokeStyle = null;
    
    let points = [
            { x: -15,   y: 25 },
            { x: 15,    y: 0 },
            { x: 20,    y: -15 },
            { x: -10,   y: -10 }
        ],
        shape = this.createPolyShape(points);
    this.body = this.addBody(x, y, world, B2DynamicBody);
    this.addFixture(shape, this.body);
};
Poly.prototype = Object.create(Box2dEntity.prototype);
Poly.prototype.constructor = Poly;


Poly.prototype.display = function (ctx) {
    "use strict";
    let center = this.body.GetPosition(),
        angle = this.body.GetAngle(),
        node = null,
        shape = null;
  
    for (node = this.body.GetFixtureList(); node; node = node.GetNext()) {
        shape = node.GetShape();
        this.drawClosedPolygon(ctx, center, angle, shape.GetVertices());
    }
    
    Box2dEntity.prototype.display.call(this, ctx);
};