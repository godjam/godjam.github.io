/*global Box2dEntity, B2CircleShape, B2PolygonShape, B2Vec2, Color*/
var Alien = function (x, y, scene, world, scale) {
    "use strict";
    Box2dEntity.call(this, x, y, scene, world, scale);
    
    this.halfBoxWidth = 8;
    this.halfBoxHeight = 15;
    this.headRadius = 15;
    
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
    var p = Math.PI,
        m = p / 8,
        center = this.body.GetWorldCenter(),
        angle = this.body.GetAngle(),
        l = this.offset.Copy();
    l.Multiply(1 / 2);
    ctx.lineWidth = this.lineWidth;
    ctx.fillStyle = this.color.ToHex();
    ctx.strokeStyle = this.strokeStyle;
    
    ctx.save();
    ctx.translate(center.x * this.scale, center.y * this.scale);
    ctx.rotate(angle);
    ctx.save();
    
    // antenas
    ctx.fillRect(-3, -this.halfBoxWidth, l.y, -this.halfBoxHeight);
    ctx.fillRect(8, -this.halfBoxWidth, l.y, -this.halfBoxHeight);
    
    ctx.translate(-this.halfBoxWidth, -this.halfBoxHeight);
    ctx.translate(-l.x, -l.y);
    // body
    ctx.fillRect(0, 0, this.halfBoxWidth * 2, this.halfBoxHeight * 2);
    // arms
    ctx.fillRect(-this.halfBoxWidth, -l.y * 4, this.halfBoxWidth * 4, l.y);
    ctx.restore();
    
    //head
    ctx.save();
    ctx.translate(l.x, l.y + this.halfBoxWidth / 2);

    // head/helm
    ctx.beginPath();
    ctx.arc(0, 0, this.headRadius, 0, p * 2);
    ctx.strokeStyle = "#000";
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.closePath();
    
    // face
    ctx.beginPath();
    ctx.arc(0, 3, this.headRadius / 2, m, p - m);
    ctx.stroke();
    ctx.closePath();
    ctx.beginPath();
    ctx.arc(-6, 2, this.headRadius / 6, p, 0);
    ctx.stroke();
    ctx.closePath();
    ctx.beginPath();
    ctx.arc(6, 2, this.headRadius / 6, p, 0);
    ctx.stroke();
    ctx.closePath();
    ctx.restore();
    ctx.restore();
    
    //Box2dEntity.prototype.display.call(this, ctx);
};
