/*global Box2dEntity, B2BodyDef, B2FixtureDef, B2StaticBody, B2Vec2, B2PolygonShape, toxi*/
//*************************************************
var PerlinBoundary = function (scene, world, scale) {
    "use strict";
    Box2dEntity.call(this, 0, 0, scene, world, scale);
    var shape = null,
        points = [],
        i = 0,
        x = 0,
        y = 0,
        w = scene.size.x,
        h = scene.size.y,
        scaleW = 0.3,
        scaleH = h / 8,
        step = 50,
        d = new Date(),
        t = d.getHours() * 60 + d.getMinutes();
    this.body = this.addBody(0, h, world, true);
    for (i = 0; i <= step; i += 1) {
        x = i * w / step;
        y = scaleH + toxi.math.noise.simplexNoise.noise(i * scaleW * w / step / 100, t) * scaleH;
        points.push({x: x, y: y});
    }
        
    for (i = 0; i < points.length - 1; i += 1) {
        shape = this.createEdgeShape(points[i].x, points[i].y, points[i + 1].x, points[i + 1].y);
        this.addFixture(shape, this.body);
    }
};
PerlinBoundary.prototype = Object.create(Box2dEntity.prototype);
PerlinBoundary.prototype.constructor = PerlinBoundary;
//************************************************
PerlinBoundary.prototype.display = function (ctx) {
    "use strict";
    var node = null,
        shape = null,
        center = this.body.GetWorldCenter();
    for (node = this.body.GetFixtureList(); node; node = node.GetNext()) {
        shape = node.GetShape();
        this.drawClosedPolygon(ctx, center, 0, shape.GetVertices());
    }
};