/*global Vector2, Particle, Tools*/
function Smoke(location, baseColor, scene, decrease, theta, variability, speed) {
    "use strict";
    Particle.call(this, location, baseColor, scene, decrease, theta, variability, speed);
}
Smoke.prototype = Object.create(Particle.prototype);
Smoke.prototype.constructor = Smoke;

Smoke.prototype.display = function (ctx) {
	"use strict";
    this.mover.displayAsSmoke(ctx);
};
