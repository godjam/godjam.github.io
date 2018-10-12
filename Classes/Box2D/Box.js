/*global Box2dEntity, B2BodyDef, B2FixtureDef, B2PolygonShape, B2DynamicBody, B2StaticBody, Color*/
let Box = function (x, y, scene, world, scale, boxW, boxH, bodyType, options) {
    'use strict';
    Box2dEntity.call(this, x, y, scene, world, scale);
    this.strokeStyle = null;

    this.boxW = boxW || Math.random() * 16 + 8;
    this.boxH = boxH || Math.random() * 16 + 16;

    if (bodyType === undefined) {bodyType = B2DynamicBody; }

    this.body = this.addBody(x, y, world, bodyType);
    let shape = this.createBoxShape(this.boxW / 2, this.boxH / 2);
    this.addFixture(shape, this.body, options);
};
Box.prototype = Object.create(Box2dEntity.prototype);
Box.prototype.constructor = Box;


Box.prototype.display = function (ctx) {
    'use strict';
    let center = this.body.GetWorldCenter(),
        angle = this.body.GetAngle();

    this.drawRect(ctx, center, angle, this.boxW, this.boxH);
    Box2dEntity.prototype.display.call(this, ctx);
};
