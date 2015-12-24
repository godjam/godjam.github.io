/*global Vector2, Particle, Tools, Color*/
function Confetti(location, baseColor, scene, decrease, theta, variability, speed) {
    "use strict";
    var color = Color.createBrightColor().h,
        angle = Tools.map(location.x, 0, scene.size.x, 0, Math.PI * 2);
    
    Particle.call(this, location, color, scene, decrease, theta, variability, speed);
    this.applyTorque(angle);
}
Confetti.prototype = Object.create(Particle.prototype);
Confetti.prototype.constructor = Confetti;

Confetti.prototype.display = function (ctx) {
	"use strict";
    this.mover.display(ctx);
};
