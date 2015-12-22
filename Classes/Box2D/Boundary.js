/*global Box2dEntity, B2BodyDef, B2FixtureDef, B2StaticBody, B2PolygonShape */
var Boundary = function (w, h, world) {
    "use strict";
    Box2dEntity.call(this, 0, 0, w, h, world);
   
    var bd = new B2BodyDef(),
        fd = new B2FixtureDef();
        
    bd.type = B2StaticBody;
    this.x = w / 2;
    this.y = h / 3;
    this.boxW = w / 4;
    this.boxH = 10;
    
    bd.position.x = this.x / this.scale;
    bd.position.y = this.y / this.scale;
    
    fd.shape = new B2PolygonShape();
    fd.shape.SetAsBox(
        this.boxW / 2 / this.scale,
        this.boxH / 2 / this.scale
    );
    
    this.body = world.CreateBody(bd);
    this.body.CreateFixture(fd);
};
Boundary.prototype = Object.create(Box2dEntity.prototype);
Boundary.prototype.constructor = Boundary;


Boundary.prototype.display = function (ctx) {
    "use strict";
    ctx.save();
    ctx.fillStyle = '#888';
    ctx.fillRect(this.x - this.boxW / 2,
                 this.y - this.boxH / 2,
                 this.boxW, this.boxH);
    ctx.restore();
    Box2dEntity.prototype.display.call(this, ctx);
};
