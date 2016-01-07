/*global Box2dEntity, Circle, Box, B2DynamicBody, B2StaticBody*/
var ChainBoundary = function (scene, world, scale) {
    "use strict";
    Box2dEntity.call(this, 0, 0, scene, world, scale);
    var i = 0,
        s = 25,
        max = Math.round(scene.size.x / s),
        y = 0.6 * scene.size.y,
        a = null,
        b = null,
        bodyType = B2DynamicBody;
    
    for (i = 0; i <= max; i += 1) {
        bodyType = B2DynamicBody;
        // lock 1st and last
        if (i === 0 || i === max) {
            bodyType = B2StaticBody;
        }
        if (b) {a = b; }
        
        b = new Box(i * s, y, scene, world, scale, 10, 10, bodyType);
        this.addEntity("b" + i, b);
        if (a !== null) {
            this.addDistanceJoint(a.body, b.body, world, s - 1);
        }
    }
};
ChainBoundary.prototype = Object.create(Box2dEntity.prototype);
ChainBoundary.prototype.constructor = ChainBoundary;


ChainBoundary.prototype.display = function (ctx) {
    "use strict";
    var i = 0,
        vertices = null,
        b1 = 0,
        b2 = 0;
    for (i = 0; i < this.entitiesArray.length - 1; i += 1) {
        b1 = i;
        b2 = i + 1;
        vertices = [this.getEntityByName("b" + b1).body.GetWorldCenter(),
                    this.getEntityByName("b" + b2).body.GetWorldCenter()];
        Box2dEntity.prototype.drawOpenPolygon.call(this, ctx, 0, 0, vertices);
    }
    Box2dEntity.prototype.display.call(this, ctx);
};