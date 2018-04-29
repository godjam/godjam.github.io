/*global Vector2, Particle, Tools, Color*/
function Confetti(location, size, baseColor, scene, decrease, theta, variability, speed) {
    "use strict";
    let color = Color.createBrightColor().h,
        angle = Tools.map(location.x, 0, scene.size.x, 0, Math.PI * 2);
    
    Particle.call(this, location, size, color, scene, decrease, theta, variability, speed);
    this.applyTorque(angle);
}
Confetti.prototype = Object.create(Particle.prototype);
Confetti.prototype.constructor = Confetti;

Confetti.prototype.display = function (ctx) {
	"use strict";
    this.mover.display(ctx);
};
