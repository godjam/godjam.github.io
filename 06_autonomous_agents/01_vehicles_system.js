/*global Scene, MouseEvtListener, Vehicle, Vector2*/
//*************************************************
var VehiclesSystemScene = function(options) {
    "use strict";
    Scene.call(this);
    this.intro("Vehicles seek/pursuit behavior", "Vehicles react to touch.");
    
    this.vehicle0 = new Vehicle(this, Math.random() * this.size.x, Math.random() * this.size.y);
    this.vehicle1 = new Vehicle(this, Math.random() * this.size.x, Math.random() * this.size.y);
    this.target = new Vector2(this.size.x / 2, this.size.y / 2);
    this.lastTarget = new Vector2(0, 0);
    this.targetSpeed = new Vector2(0, 0);
    this.eventListeners.push(new MouseEvtListener(this.canvas, this, this.mouseStartEvt));
}
VehiclesSystemScene.prototype = Object.create(Scene.prototype);
VehiclesSystemScene.prototype.constructor = VehiclesSystemScene;


VehiclesSystemScene.prototype.loop = function() {
    "use strict";
    var f0 = null,
        f1 = null;
    f0 = this.vehicle0.pursuit(this.target, this.targetSpeed);
    this.vehicle0.applyForce(f0);
    this.vehicle0.update();

    f1 = this.vehicle1.seek(this.target);
    this.vehicle1.applyForce(f1);
    this.vehicle1.update();

    this.ctx.clearRect(0, 0, this.size.x, this.size.y);
    this.vehicle0.display(this.ctx);
    this.vehicle1.display(this.ctx);

    Scene.prototype.loop.call(this);
};

VehiclesSystemScene.prototype.mouseStartEvt = function(position) {
    "use strict";
    this.lastTarget.x = this.target.x;
    this.lastTarget.y = this.target.y;
    this.target = new Vector2(position.x, position.y);
    this.targetSpeed = this.target.sub(this.lastTarget);
};