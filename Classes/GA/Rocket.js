function Rocket(x, y, scene, dna) {
    'use strict';
    this.scene = scene;
    this.init(x, y, dna);
}

Rocket.prototype.init = function (x, y, dna) {
    'use strict';
    this.mover = new Mover(x, y, this.scene);
    this.dna = dna;
    this.alive = true;
}

Rocket.prototype.applyDNA = function (i) {
    'use strict';
    let force = this.dna.genes[i];
    this.mover.applyForce(force);
}

Rocket.prototype.update = function (i, obstacles) {
    'use strict';
    if (this.alive) {
        this.applyDNA(i);
        this.mover.update();
        this.collide(obstacles)
    }
}

Rocket.prototype.collide = function (obstacles) {
    'use strict';
    for (let i = 0; i < obstacles.length; ++i) {
        let obstacle = obstacles[i];
        if (Vector2.distance(this.mover.location, obstacle.location) < (obstacle.mass + 2)) {
            this.alive = false;
        }
    }
}

Rocket.prototype.display = function (ctx) {
    if (this.alive)
        this.mover.displayAsPoly(ctx, 3);
}