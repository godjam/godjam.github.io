/*global Box2dEntity, Circle, B2KinematicBody */
let CircleBoundary = function (scene, world, scale) {
    "use strict";
    let x = scene.size.x / 2,
        y = scene.size.y / 2,
        b = null;

    Box2dEntity.call(this, x, y, scene, world, scale);
    b = new Circle(x, y, scene, world, scale, scene.size.y / 8, B2KinematicBody);
    b.body.SetAngularVelocity(Math.random() * Math.PI);
    this.addEntity("b", b);
};
CircleBoundary.prototype = Object.create(Box2dEntity.prototype);
CircleBoundary.prototype.constructor = CircleBoundary;


CircleBoundary.prototype.display = function (ctx) {
    "use strict";
    ctx.fillStyle = this.color.toHex();
    ctx.fillRect(this.x - this.boxW / 2,
                 this.y - this.boxH / 2,
                 this.boxW, this.boxH);
    Box2dEntity.prototype.display.call(this, ctx);
};

CircleBoundary.prototype.update = function () {
    "use strict";
    let i = 0,
        force = null,
        e = null,
        b = this.getEntityByName("b");


    for (i = 0; i < this.scene.boxes.length; i += 1) {
        e = this.scene.boxes[i];
        force = this.attract(b, e, 10);
        e.applyForce(force);
    }
};
