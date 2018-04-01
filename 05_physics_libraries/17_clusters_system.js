/*global toxi, Scene, OrientationEvtListener, MouseEvtListener, Tools, Color*/
//*************************************************
let ClustersSystemScene = function(options) {
    "use strict";
    Scene.call(this, options);
    this.intro("Force Directed Graph", "Touch to add new elements in clusters.<br>Reacts to orientation events.<br>Screen lock is recomended.");

    this.threshold = Math.max(this.size.x, this.size.y) / 5;
    this.time = 0;
    this.colorDot = Color.createBrightColor();
    this.colorLine = Color.createLightColor();
    this.physics = new VerletPhysics2D();
    // use to displace an element
    this.particle = null;
    // gravity
    this.gravity = new Vec2D(0, 0);
    this.gravityBehavior = new GravityBehavior(this.gravity);

    // resize : change world bound
    this.physics.setWorldBounds(new Rect(0, 0, this.size.x, this.size.y));
    // Orientation : change gravity
    this.physics.addBehavior(this.gravityBehavior);
    this.addListener(new MouseEvtListener(this.canvas, this, this.mouseStartEvt, this.mouseStoptEvt));
    this.addListener(new OrientationEvtListener(this.canvas, this, this.changeGravityEvt));
    this.addFirstParticles();
};
ClustersSystemScene.prototype = Object.create(Scene.prototype);
ClustersSystemScene.prototype.constructor = ClustersSystemScene;

ClustersSystemScene.prototype.stop = function() {
    "use strict";
    Scene.prototype.stop.call(this);
};

ClustersSystemScene.prototype.resize = function() {
    "use strict";
    Scene.prototype.resize.call(this);
    if (this.physics) {
        this.physics.setWorldBounds(new Rect(0, 0, this.size.x, this.size.y));
    }
};

ClustersSystemScene.prototype.loop = function() {
    "use strict";
    let i = 0,
        s = null,
        p = null;
    this.time += this.frameloop.delta;
    this.physics.update();
    this.ctx.clearRect(0, 0, this.size.x, this.size.y);

    this.ctx.strokeStyle = this.colorLine.rgba();
    for (i = 0; i < this.physics.springs.length; i += 1) {
        s = this.physics.springs[i];
        this.ctx.beginPath();
        this.ctx.moveTo(s.a.x, s.a.y);
        this.ctx.lineTo(s.b.x, s.b.y);
        this.ctx.stroke();
        this.ctx.closePath();
    }

    this.ctx.fillStyle = this.colorDot.rgba()
    for (i = 0; i < this.physics.particles.length; i += 1) {
        p = this.physics.particles[i];
        this.ctx.fillRect(p.x - 5, p.y - 5, 10, 10);
    }

    Scene.prototype.loop.call(this);
};

ClustersSystemScene.prototype.mouseStartEvt = function(position) {
    "use strict";
    let i = 0,
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
    else if (this.time > 0.3) { // in s
        this.addParticle(p1);
        this.time = 0;
    }
};

ClustersSystemScene.prototype.mouseStoptEvt = function() {
    "use strict";
    // release particle
    this.particle = null;
};

ClustersSystemScene.prototype.changeGravityEvt = function(dir, tiltFB, tiltLR) {
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
    this.gravityBehavior.setForce(this.gravity);
};

ClustersSystemScene.prototype.addParticle = function(position) {
    "use strict";
    let i = 0,
        d = 0,
        n = null,
        p = null,
        s = null,
        f = 0.005;
    if (position instanceof Vec2D === false) {
        throw "ClustersSystemScene.addParticle : position is not a Vec2D";
    }
    n = new VerletParticle2D(position);

    for (i = 0; i < this.physics.particles.length; i += 1) {
        p = this.physics.particles[i];
        d = position.distanceTo(p.getPreviousPosition());
        if (d < this.threshold) {
            s = new VerletSpring2D(n, p, d, f);
        }
        else {
            s = new VerletMDSpring2D(n, p, d, f);
        }
        this.physics.addSpring(s);
    }

    this.physics.addParticle(n);
};


ClustersSystemScene.prototype.addFirstParticles = function() {
    "use strict";
    let i = 0,
        x = 0,
        y = 0;
    for (i = 0; i < 3; i += 1) {
        x = Math.random() * 100 - 50;
        y = Math.random() * 100 - 50;
        this.addParticle(new Vec2D(this.size.x / 2 + x, this.size.y / 2 + y));
    }
}