/*global Box2dEntity, Box, B2StaticBody */
var Boundary = function (scene, world, scale) {
    "use strict";
    Box2dEntity.call(this, 0, 0, scene, world, scale);
   
    var x0 = scene.size.x / 2,
        x1 = scene.size.x / 4,
        x2 = scene.size.x / 4 * 3,
        y0 = scene.size.y / 3 * 2,
        y1 = scene.size.y / 6 * 5,
        w = scene.size.x / 4,
        b0 = new Box(x0, y0, scene, world, scale, w, 10, B2StaticBody),
        b1 = new Box(x1, y1, scene, world, scale, w, 10, B2StaticBody),
        b2 = new Box(x2, y1, scene, world, scale, w, 10, B2StaticBody);
    this.addEntity("b0", b0);
    this.addEntity("b1", b1);
    this.addEntity("b2", b2);
};
Boundary.prototype = Object.create(Box2dEntity.prototype);
Boundary.prototype.constructor = Boundary;


Boundary.prototype.display = function (ctx) {
    "use strict";
    ctx.fillStyle = this.color.ToHex();
    ctx.fillRect(this.x - this.boxW / 2,
                 this.y - this.boxH / 2,
                 this.boxW, this.boxH);
    Box2dEntity.prototype.display.call(this, ctx);
};
