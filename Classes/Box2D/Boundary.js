/*global Box2dEntity, B2BodyDef, B2FixtureDef, B2StaticBody, B2PolygonShape */
var Boundary = function (scene, world, scale) {
    "use strict";
    Box2dEntity.call(this, 0, 0, scene, world, scale);
   
    var bd = new B2BodyDef(),
        fd = new B2FixtureDef();
        
    bd.type = B2StaticBody;
    this.x = scene.size.x / 2;
    this.y = scene.size.y / 3;
    this.boxW = scene.size.y / 4;
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
    ctx.fillRect(this.x - this.boxW / 2,
                 this.y - this.boxH / 2,
                 this.boxW, this.boxH);
    Box2dEntity.prototype.display.call(this, ctx);
};
