/*global Box2dEntity, B2BodyDef, B2FixtureDef, B2StaticBody, noise, B2Vec2, B2PolygonShape*/
let CurvyBoundary = function (scene, world, scale) {
    "use strict";
    let shape = null,
        points = [],
        i = 0,
        x = 0,
        y = 0,
        w = scene.size.x,
        h = scene.size.y,
        scaleW = 0.3,
        scaleH = h / 4,
        step = 50;
    
    Box2dEntity.call(this, 0, 0, scene, world, scale);
    this.body = this.addBody(0, h, world, B2StaticBody);
    
    for (i = 0; i <= step; i += 1) {
        x = i * w / step;
        y = Math.sin(x / 100) * h / 4 + h / 4; // sin wave
        points.push({x: x, y: y});
    }
        
    for (i = 0; i < points.length - 1; i += 1) {
        shape = this.createEdgeShape(points[i].x, points[i].y, points[i + 1].x, points[i + 1].y);
        this.addFixture(shape, this.body);
    }
};
CurvyBoundary.prototype = Object.create(Box2dEntity.prototype);
CurvyBoundary.prototype.constructor = CurvyBoundary;

CurvyBoundary.prototype.display = function (ctx) {
    "use strict";
    let node = null,
        shape = null,
        center = this.body.GetWorldCenter();
    for (node = this.body.GetFixtureList(); node; node = node.GetNext()) {
        shape = node.GetShape();
        this.drawOpenPolygon(ctx, center, 0, shape.GetVertices());
    }
};

