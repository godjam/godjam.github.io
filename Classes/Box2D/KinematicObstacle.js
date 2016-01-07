/*global Box2dEntity, B2KinematicBody, Circle, B2Vec2*/
var KinematicObstacle = function (scene, world, scale) {
    "use strict";
    var i = 0,
        j = 0,
        w = scene.size.x,
        h = scene.size.y,
        ball = null,
        c = 10,
        vx = 1;
    
    this.s = Math.min(w, h) / c;
    
    Box2dEntity.call(this, 0, 0, scene, world, scale);
    
    for (i = 0; i < c; i += 1) {
        j = Math.floor(i / 2) * 2;
        ball = new Circle(w / 2, j * this.s, scene, world, scale, this.s / 4, B2KinematicBody);
        if (i % 2 === 0) {vx = -1; } else {vx = 1; }
        ball.body.SetLinearVelocity(new B2Vec2(vx, 0));
        this.addEntity("b" + i, ball);
    }
};
KinematicObstacle.prototype = Object.create(Box2dEntity.prototype);
KinematicObstacle.prototype.constructor = KinematicObstacle;

KinematicObstacle.prototype.update = function () {
    "use strict";
    var i = 0,
        s = 0,
        x = 0;
    for (i = 0; i < this.entitiesArray.length; i += 1) {
        s = this.entitiesArray[i].body.GetLinearVelocity().x;
        x = this.entitiesArray[i].body.GetWorldCenter().x * this.scale;
        if ((x < 10 && s < 0) || (x > this.scene.size.x - this.s / 4 && s > 0)) {
            s *= -1;
            this.entitiesArray[i].body.SetLinearVelocity(new B2Vec2(s, 0));
		}
    }
};

