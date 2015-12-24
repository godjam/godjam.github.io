/*global Box2dEntity, B2BodyDef, B2FixtureDef, B2StaticBody, B2Vec2, B2PolygonShape*/
//*************************************************
var PolyBoundary = function (scene, world, scale) {
    "use strict";
    Box2dEntity.call(this, 0, 0, scene, world, scale);
    var points = [
            { x: 0,     y: 13 },
            { x: 100,   y: 105 },
            { x: 200,   y: 140 },
            { x: 300,   y: 118 },
            { x: 600,   y: 13 }
        ],
        shape = this.createPolyShape(points);
    this.body = this.addBody(scene.size.x / 2 - 300, scene.size.y, world, true);
    this.addFixture(shape, this.body);
};
PolyBoundary.prototype = Object.create(Box2dEntity.prototype);
PolyBoundary.prototype.constructor = PolyBoundary;
//************************************************
PolyBoundary.prototype.display = function (ctx) {
    "use strict";
    var node = null,
        shape = null,
        center = this.body.GetWorldCenter();
    for (node = this.body.GetFixtureList(); node; node = node.GetNext()) {
        shape = node.GetShape();
        this.drawClosedPolygon(ctx, center, 0, shape.GetVertices());
    }
};