function Rocket(x, y, scene, dna) {
    'use strict';
    this.scene = scene;
    this.init(x, y, dna);
}

Rocket.prototype.init = function (x, y, dna) {
    'use strict';
    this.mover = new Mover(x, y, this.scene);
    this.dna = dna;
}

Rocket.prototype.applyDNA = function (i) {
    'use strict';
    let force = this.dna.genes[i];
    this.mover.applyForce(force);
}

Rocket.prototype.update = function (i) {
    'use strict';
    this.applyDNA(i);
    this.mover.update();
}