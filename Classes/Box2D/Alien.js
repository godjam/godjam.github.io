/*global Box2dEntity, B2CircleShape, B2PolygonShape, B2Vec2*/
var Alien = function (x, y, w, h, world) {
    "use strict";
    Box2dEntity.call(this, x, y, w, h, world);
    
    this.halfBoxWidth = 4;
    this.halfBoxHeight = 7;
    this.headRadius = 7;
    this.offset = new B2Vec2(0, -10);
    var torsoShape = this.createBoxShape(this.halfBoxWidth, this.halfBoxHeight),
        headShape = this.createCircleShape(this.headRadius),
        scaledOffset = this.offset.Copy();
    scaledOffset.Multiply(1 / this.scale);
    headShape.SetLocalPosition(scaledOffset);
    this.body = this.addBody(x, y, world, false, this);
    this.addFixture(torsoShape, this.body);
    this.addFixture(headShape, this.body);
};
Alien.prototype = Object.create(Box2dEntity.prototype);
Alien.prototype.constructor = Alien;


Alien.prototype.display = function (ctx) {
    "use strict";
    var center = this.body.GetWorldCenter(),
        angle = this.body.GetAngle(),
        localOffset = this.offset.Copy();
    localOffset.Multiply(1 / 2);
    
    ctx.save();
    ctx.beginPath();
    ctx.lineWidth = this.lineWidth;
    ctx.fillStyle = this.fillStyle;
    ctx.strokeStyle = this.strokeStyle;
    
    ctx.translate(center.x * this.scale, center.y * this.scale);
    ctx.rotate(angle);
    
    ctx.save();
    ctx.translate(-this.halfBoxWidth, -this.halfBoxHeight);
    ctx.translate(-localOffset.x, -localOffset.y);
    ctx.fillRect(0, 0, this.halfBoxWidth * 2, this.halfBoxHeight * 2);
    ctx.restore();
    
    ctx.save();
    ctx.translate(localOffset.x, localOffset.y);
    ctx.arc(0, 0, this.headRadius, 0, Math.PI * 2);
    ctx.stroke();
    ctx.fill();
    
    ctx.closePath();
    ctx.restore();
    ctx.restore();
    
    
    Box2dEntity.prototype.display.call(this, ctx);
};
