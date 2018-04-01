/*global Box2dEntity, Circle*/
let JointPair = function (x, y, scene, world, scale) {
    "use strict";
    Box2dEntity.call(this, x, y, scene, world, scale);
    let p1 = new Circle(x - 1, y, scene, world, scale),
        p2 = new Circle(x + 1, y, scene, world, scale);
    this.addEntity("p1", p1);
    this.addEntity("p2", p2);
    this.addDistanceJoint(p1.body, p2.body, world, 32);
};
JointPair.prototype = Object.create(Box2dEntity.prototype);
JointPair.prototype.constructor = JointPair;


JointPair.prototype.display = function (ctx) {
    "use strict";
    let vertices = [this.getEntityByName("p1").body.GetWorldCenter(),
                    this.getEntityByName("p2").body.GetWorldCenter()];
    Box2dEntity.prototype.drawOpenPolygon.call(this, ctx, 0, 0, vertices);
    Box2dEntity.prototype.display.call(this, ctx);
};