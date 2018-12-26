/*global Box2dEntity, B2BodyDef, B2FixtureDef, B2StaticBody, B2Vec2, B2PolygonShape*/
//*************************************************
let PolyBoundary = function (scene, world, scale) {
    'use strict';
    Box2dEntity.call(this, 0, 0, scene, world, scale);
    const w = scene.size.x;
    const h = scene.size.y;
    const points = this.createPoints(w, h);
    const shape = this.createPolyShape(points);
    this.body = this.addBody(0, scene.size.y, world, B2StaticBody);
    this.strokeStyle = null;
    this.addFixture(shape, this.body);
};
PolyBoundary.prototype = Object.create(Box2dEntity.prototype);
PolyBoundary.prototype.constructor = PolyBoundary;
//************************************************
PolyBoundary.prototype.display = function (ctx) {
    'use strict';
    let node = null,
        shape = null,
        center = this.body.GetWorldCenter();
    for (node = this.body.GetFixtureList(); node; node = node.GetNext()) {
        shape = node.GetShape();
        this.drawClosedPolygon(ctx, center, 0, shape.GetVertices());
    }
};

PolyBoundary.prototype.createPoints = function (w, h) {
    let points = [];
    const i = ~~(w / 5);
    const j = ~~(h / 20);
    points.push({ x: 0,     y: 0 });
    points.push({ x: 1*i,   y: 1.0*j });
    points.push({ x: 2*i,   y: 1.5*j });
    points.push({ x: 3*i,   y: 1.5*j });
    points.push({ x: 4*i,   y: 1.0*j });
    points.push({ x: 5*i,   y: 0 });
    return points;
}
