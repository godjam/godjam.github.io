/*global Box2dEntity, Circle*/
var Pair = function (x, y, w, h, world) {
    "use strict";
    Box2dEntity.call(this, x, y, w, h, world);
    var p1 = new Circle(x - 1, y, w, h, world),
        p2 = new Circle(x + 1, y, w, h, world);
    this.addEntity("p1", p1);
    this.addEntity("p2", p2);
    this.addDistanceJoint(p1.body, p2.body, world, 32);
};
Pair.prototype = Object.create(Box2dEntity.prototype);
Pair.prototype.constructor = Pair;


Pair.prototype.display = function (ctx) {
    "use strict";
    var vertices = [this.getEntityByName("p1").body.GetWorldCenter(),
                    this.getEntityByName("p2").body.GetWorldCenter()];
    Box2dEntity.prototype.drawOpenPolygon.call(this, ctx, 0, 0, vertices);
    Box2dEntity.prototype.display.call(this, ctx);
};