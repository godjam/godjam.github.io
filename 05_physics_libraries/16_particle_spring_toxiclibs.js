/*global toxi,  LineCluster, Cluster, GridCluster, Scene, MouseEvtListener, ToxiCreature, OrientationEvtListener*/
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
    this.particle = null;
    // gravity
    this.rotation = new Vec2D(0, 0);
    this.gravity = new Vec2D(0, 1);
    this.gravityBehavior = new GravityBehavior(this.gravity);
    
    if (options.sim_type === 0) {
        //this.cluster = new LineCluster(this.size.x, this.size.y, this.physics);
        this.cluster = new GridCluster(this.size.x, this.size.y, this.physics);
    }
    else if (options.sim_type === 1) {
        this.cluster = new ToxiCreature(new Vec2D(this.size.x / 2, 50), this.physics);
    }
    // TODO next exercice
    //this.cluster = new Cluster(new Vec2D(this.size.x / 2, 50), this.physics);

    // TODO : resize : change world bound
    this.physics.setWorldBounds(new Rect(0, 0, this.size.x, this.size.y));
    // TODO : Orientation : change gravity
    this.physics.addBehavior(this.gravityBehavior);
    this.eventListeners.push(new MouseEvtListener(this.canvas, this, this.mouseStartEvt, this.mouseStoptEvt));
    this.eventListeners.push(new OrientationEvtListener(this.canvas, this, this.changeGravityEvt));
};
ToxiSimulationScene.prototype = Object.create(Scene.prototype);
ToxiSimulationScene.prototype.constructor = ToxiSimulationScene;

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
    
    // limits tiltFB
    if (tiltFB > 30) {
        tiltFB = 30;
    }
    if (tiltFB < -30) {
        tiltFB = -30;
    }

    // limits tiltLR
    if (tiltLR > 30) {
        tiltLR = 30;
    }
    if (tiltLR < -30) {
        tiltLR = -30;
    }

    // TODO : remove
    console.log(dir, tiltFB, tiltLR);

    // release particle
    this.gravity.x += tiltLR / (30 * 10);
    this.gravity.y += tiltFB / (30 * 10);
    
        // limits tiltFB
    if (this.gravity.x > 2) {
        this.gravity.x = 2;
    }
    if (this.gravity.x < -2) {
        this.gravity.x = -2;
    }

    // limits tiltLR
    if (this.gravity.y > 2) {
        this.gravity.y = 2;
    }
    if (this.gravity.y < -2) {
        this.gravity.y = -2;
    }
    
    // canvas rotation
    this.rotation.x = this.gravity.x * 10;
    this.rotation.y = this.gravity.y * 10;

    // Apply the transform to the canvas
    this.canvas.style.webkitTransform = "rotate3d(0,1,0," + this.rotation.x + "deg) rotate3d(1,0,0, " + (this.rotation.y * -1) + "deg)";
    this.canvas.style.MozTransform = "rotate3d(0,1,0," + this.rotation.x + "deg)";
    this.canvas.style.transform = "rotate3d(0,1,0," + this.rotation.x + "deg) rotate3d(1,0,0, " + (this.rotation.y * -1) + "deg)";
 
    this.gravityBehavior.setForce(this.gravity);
};