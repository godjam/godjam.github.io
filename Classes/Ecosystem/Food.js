/*global Mover, Color, Vector2*/
let Food = function (scene, x, y) {
    "use strict";
    x = x || Math.random() * scene.size.x;
    y = y || Math.random() * scene.size.y;
    let mass = 5 + Math.random() * 5;
    Mover.call(this, x, y, scene, mass);
    this.color = Color.createNormalDistribColor();
    this.health = 800 + Math.random() * 800;
    this.alive = true;
    this.isTarget = false;

};
Food.prototype = Object.create(Mover.prototype);
Food.prototype.constructor = Food;

Food.prototype.update = function (growUp) {
    "use strict";
    Mover.prototype.update.call(this, true);

    // metabolism
    this.health -= 1;
    if (growUp) this.mass *= 1.001;

    // death
    if (this.health < 0) this.alive = false;
}

Food.prototype.display = function (ctx) {
    Mover.prototype.display.call(this, ctx);
    if (this.isTarget) {
        const r = this.mass;
        ctx.beginPath();
        ctx.rect(this.location.x - r / 2, this.location.y - r / 2, r, r);
        ctx.strokeStyle = '#333';
        ctx.stroke();
        ctx.closePath();
        this.isTarget = false;
    }
}

Food.prototype.reproduce = function () {
    "use strict";

    if (Math.random() < 0.005) {
        const w = this.scene.size.x;
        const h = this.scene.size.y;
        const dx = (Math.random() < 0.5 ? 1 : -1) * 10;
        const dy = (Math.random() < 0.5 ? 1 : -1) * 10;
        let x = this.location.x + dx;
        let y = this.location.y + dy;

        if (x > w) x = this.mass / 2;
        if (x < 0) x = w - this.mass / 2;
        if (y > h) y = this.mass / 2;
        if (y < 0) y = w - this.mass / 2;
        return new Food(this.scene, x, y)
    }
};

Food.prototype.hit = function () {
    "use strict";
    this.mass -= 5;
    if (this.mass <= 0) {
        this.alive = false;
    }
};

Food.prototype.eaten = function () {
    this.alive = false;
}

Food.prototype.setAsTarget = function () {
    this.isTarget = true;
}