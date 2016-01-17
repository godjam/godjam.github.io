/*global toxi, requestAnimationFrame, ToxiParticle, Array2D, LineCluster, Cluster, GridCluster, Scene, MouseEvtListener, ToxiCreature*/
var Rect = toxi.geom.Rect,
    Vec2D = toxi.geom.Vec2D,
    GravityBehavior = toxi.physics2d.behaviors.GravityBehavior,
    VerletPhysics2D = toxi.physics2d.VerletPhysics2D,
    VerletSpring2D = toxi.physics2d.VerletSpring2D;

//*************************************************
var ClothSimulationScene = function (options) {
	"use strict";
    Scene.call(this);
    if(options === undefined) {options = {simtype: 0}; }
    this.options = options;
    this.physics = new VerletPhysics2D();
    // use to displace an element
    this.particle = null;
    
    
    //this.cluster = new LineCluster(this.size.x, this.size.y, this.physics);
    this.cluster = new GridCluster(this.size.x, this.size.y, this.physics);
    //this.cluster = new Cluster(new Vec2D(this.size.x / 2, 50), this.physics);
    //this.cluster = new ToxiCreature(new Vec2D(this.size.x / 2, 50), this.physics);
    
    
    this.physics.setWorldBounds(new Rect(0, 0, this.size.x, this.size.y));
    this.physics.addBehavior(new GravityBehavior(new Vec2D(0, 0.5)));
    this.mouseListener = new MouseEvtListener(this.canvas, this, this.mouseStartEvt, this.mouseStoptEvt);
};
ClothSimulationScene.prototype = Object.create(Scene.prototype);
ClothSimulationScene.prototype.constructor = ClothSimulationScene;

ClothSimulationScene.prototype.loop = function () {
    "use strict";
    this.physics.update();
    this.ctx.clearRect(0, 0, this.size.x, this.size.y);
    this.cluster.display(this.ctx);
    Scene.prototype.loop.call(this);
};

ClothSimulationScene.prototype.mouseStartEvt = function (position) {
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
                if (isIn) {this.particle = particle; }
            }
        }
    }
    
    if (this.particle !== null) {
        this.particle.x = p1.x;
        this.particle.y = p1.y;
    }
};

ClothSimulationScene.prototype.mouseStoptEvt = function () {
    "use strict";
    // release particle
    this.particle = null;
};