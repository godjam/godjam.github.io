/*global Box2dEntity, B2KinematicBody, Box, B2Vec2*/
let KinematicObstacle = function (scene, world, scale) {
    "use strict";
    let i = 0,
        j = 0,
        w = scene.size.x,
        h = scene.size.y,
        b = null,
        c = 10,
        vx = 1;
    this.pw = Math.max(50, w / 4);
    this.s = h / c;
    
    Box2dEntity.call(this, 0, 0, scene, world, scale);
    
    for (i = 2; i < c; i += 1) {
        j = Math.floor(i / 2) * 2;
        b = new Box(w / 2, j * this.s, scene, world, scale, this.pw, 10, B2KinematicBody);
        if (i % 2 === 0) {vx = -1; } else {vx = 1; }
        vx = Math.random() * (c - i) * vx * 0.5;
        b.body.SetLinearVelocity(new B2Vec2(vx, 0));
        this.addEntity("b" + i, b);
    }
};
KinematicObstacle.prototype = Object.create(Box2dEntity.prototype);
KinematicObstacle.prototype.constructor = KinematicObstacle;

KinematicObstacle.prototype.update = function () {
    "use strict";
    let i = 0,
        s = 0,
        x = 0;
    for (i = 0; i < this.entitiesArray.length; i += 1) {
        s = this.entitiesArray[i].body.GetLinearVelocity().x;
        x = this.entitiesArray[i].body.GetWorldCenter().x * this.scale;
        if ((x < this.pw && s < 0) || (x > this.scene.size.x - this.pw && s > 0)) {
            s *= -1;
            this.entitiesArray[i].body.SetLinearVelocity(new B2Vec2(s, 0));
		}
    }
};

