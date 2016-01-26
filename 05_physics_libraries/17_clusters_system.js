/*global toxi, Scene, OrientationEvtListener*/
var Rect = toxi.geom.Rect,
    Vec2D = toxi.geom.Vec2D,
    GravityBehavior = toxi.physics2d.behaviors.GravityBehavior,
    VerletPhysics2D = toxi.physics2d.VerletPhysics2D,
    VerletSpring2D = toxi.physics2d.VerletSpring2D;

//*************************************************
var ClustersSystemScene = function(options) {
    "use strict";
    Scene.call(this);
    if (options === undefined) { options = { sim_type: 0 }; }
    this.options = options;
    this.physics = new VerletPhysics2D();
    // use to displace an element
    this.particle = null;

    this.physics.setWorldBounds(new Rect(0, 0, this.size.x, this.size.y));
    this.physics.addBehavior(new GravityBehavior(new Vec2D(0, 0.5)));
    this.eventListeners.push(new OrientationEvtListener(this.canvas, this, this.orientationEvt));
};
ClustersSystemScene.prototype = Object.create(Scene.prototype);
ClustersSystemScene.prototype.constructor = ClustersSystemScene;

ClustersSystemScene.prototype.loop = function() {
    "use strict";
    this.physics.update();
    this.ctx.clearRect(0, 0, this.size.x, this.size.y);
    Scene.prototype.loop.call(this);
};

ClustersSystemScene.prototype.orientationEvt = function(position) {
    "use strict";
    var i = 0;
    // TODO
};
