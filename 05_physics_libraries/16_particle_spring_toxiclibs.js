/*global toxi, GridCluster, Scene, MouseEvtListener, ToxiCreature, ToxiSystem, OrientationEvtListener, Tools*/
var Rect = toxi.geom.Rect,
    Vec2D = toxi.geom.Vec2D,
    GravityBehavior = toxi.physics2d.behaviors.GravityBehavior,
    VerletPhysics2D = toxi.physics2d.VerletPhysics2D;

//*************************************************
var ToxiSimulationScene = function(options) {
    "use strict";
    Scene.call(this);

    if (options === undefined) {
        options = {
            sim_type: 0
        };
    }
    this.options = options;
    this.physics = new VerletPhysics2D();
    // use to displace an element
    this.particle = null;    // gravity
    this.gravity = new Vec2D(0, 1);
    this.behavior = new GravityBehavior(this.gravity);

    if (options.sim_type === 0) {
        this.intro("Cloth Simulation (Toxiclibs)", "Reacts to touch events and to orientation events.<br>Screen lock is recomended.");
        this.cluster = new GridCluster(this.size, this.physics);
    }
    else if (options.sim_type === 1) {
        this.intro("Creature (Toxiclibs)", "Reacts to touch events and to orientation events.<br>Screen lock is recomended.");
        this.cluster = new ToxiCreature(new Vec2D(this.size.x / 2, 50), this.physics);
    }
    else if (options.sim_type === 2) {
        this.intro("Toxi Attractor", "Far movers are attracted by the attractor. Close movers are repel.");
        this.behavior.force.y = 0;
        this.cluster = new ToxiSystem(this.size, this.physics);
    }
    // resize : change world bound
    this.physics.setWorldBounds(new Rect(0, 0, this.size.x, this.size.y));
    // Orientation : change gravity
    this.physics.addBehavior(this.behavior);
    this.eventListeners.push(new MouseEvtListener(this.canvas, this, this.mouseStartEvt, this.mouseStoptEvt));
    this.eventListeners.push(new OrientationEvtListener(this.canvas, this, this.changeGravityEvt));
};
ToxiSimulationScene.prototype = Object.create(Scene.prototype);
ToxiSimulationScene.prototype.constructor = ToxiSimulationScene;


ToxiSimulationScene.prototype.stop = function() {
    "use strict";
    Scene.prototype.stop.call(this);
};

ToxiSimulationScene.prototype.resize = function() {
    "use strict";
    Scene.prototype.resize.call(this);
    if (this.physics) {
        this.physics.setWorldBounds(new Rect(0, 0, this.size.x, this.size.y));
    }
};

ToxiSimulationScene.prototype.loop = function() {
    "use strict";
    this.physics.update();
    this.ctx.clearRect(0, 0, this.size.x, this.size.y);
    this.cluster.display(this.ctx);
    Scene.prototype.loop.call(this);
};

ToxiSimulationScene.prototype.mouseStartEvt = function(position) {
    "use strict";
    var i = 0,
        particle = null,
        isIn = false,
        p1 = new Vec2D(position.x, position.y),
        p2 = null;

    if (this.particle === null) {
        // search for a particle near to the mouse
        for (i = 0; i < this.physics.particles.length; i += 1) {
            particle = this.physics.particles[i];
            if (particle.isLocked === false) {
                p2 = new Vec2D(particle.x, particle.y);
                isIn = p1.isInCircle(p2, 16);
                if (isIn) {
                    this.particle = particle;
                }
            }
        }
    }

    if (this.particle !== null) {
        this.particle.x = p1.x;
        this.particle.y = p1.y;
    }
};

ToxiSimulationScene.prototype.mouseStoptEvt = function() {
    "use strict";
    // release particle
    this.particle = null;
};

ToxiSimulationScene.prototype.changeGravityEvt = function(dir, tiltFB, tiltLR) {
    "use strict";

    // limits tilts
    tiltFB = Tools.clamp(tiltFB, -45, 45);
    tiltLR = Tools.clamp(tiltLR, -45, 45);

    // release particle
    this.gravity.x = tiltLR / 45;
    this.gravity.y = tiltFB / 45;

    // limits gravity
    this.gravity.x = Tools.clamp(this.gravity.x, -1, 1);
    this.gravity.y = Tools.clamp(this.gravity.y, -1, 1);

    if (this.options.sim_type === 1)
        this.changeClusterOrientation();

    // Apply the transform to the canvas
    //this.canvas.style.transform = "rotate3d(0,1,0," + this.rotation.x + "deg) rotate3d(1,0,0, " + (this.rotation.y * -1) + "deg)";
    this.behavior.setForce(this.gravity);
};

ToxiSimulationScene.prototype.changeClusterOrientation = function() {

    var aX = Math.abs(this.gravity.x),
        aY = Math.abs(this.gravity.y);
    // x axis
    if (aX > aY) {
        if (this.gravity.x < 0) {
            this.cluster.setFaceAngle(Math.PI / 2);
        }
        else if (this.gravity.x >= 0) {
            this.cluster.setFaceAngle(-Math.PI / 2);
        }
    }
    // y axis
    else {
        if (this.gravity.y < 0) {
            this.cluster.setFaceAngle(Math.PI);
        }
        else if (this.gravity.y >= 0) {
            this.cluster.setFaceAngle(0);
        }
    }

}