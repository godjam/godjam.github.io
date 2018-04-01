/*global toxi, ToxiParticle, Vec2D, VerletSpring2D, Color, Tools*/
let ToxiCreature = function(position, physics) {
    "use strict";

    if (position instanceof toxi.geom.Vec2D === false) {
        throw "Cluster.constructor : position is not a Vec2D";
    }

    let i = 0,
        j = 0,
        particle = null,
        spring = null,
        bodyLength = 12,
        tailLength = 6,
        radius = 50,
        strength = 0.003,
        point = new Vec2D(0, 0),
        angle = 0;

    this.color = Color.createBrightColor().mutate();
    this.physics = physics;
    // paticles of the border
    this.body = [];
    this.faceAngle = 0;

    //console.log(l, radius);
    for (i = 0; i < bodyLength; i += 1) {
        angle = i * Math.PI * 2 / bodyLength;
        point.x = position.x + Math.cos(angle) * radius;
        point.y = position.y + Math.sin(angle) * radius;

        // create particle
        particle = new ToxiParticle(point, physics);
        // add particle to particles list
        this.body.push(particle);
        // add springs between all particles
        if (i > 0) {
            for (j = i - 1; j >= 0; j -= 1) {
                let dX = this.body[i].p.x - this.body[j].p.x;
                let dY = this.body[i].p.y - this.body[j].p.y;
                let d = Math.sqrt(dX * dX + dY * dY);
                spring = new VerletSpring2D(this.body[i].p, this.body[j].p, d, strength);
                physics.addSpring(spring);
            }
        }
    }

    // tentacles
    for (i = 0; i < 5; i += 1) {
        let tail = [];
        for (j = 0; j < tailLength; j += 1) {
            point.x = position.x;
            point.y = position.y + 10;
            particle = new ToxiParticle(point, physics);
            // add particle to particles list
            tail.push(particle);

            if (j === 0) {
                spring = new VerletSpring2D(this.body[2 + i * 2].p, tail[j].p, 30, strength * 10);
            } else {
                spring = new VerletSpring2D(tail[j-1].p, tail[j].p, 30 - (i * 4), strength * 10);
            }
            physics.addSpring(spring);
        }
    }
};

ToxiCreature.prototype.display = function(ctx) {
    "use strict";
    let c = new Vec2D(0, 0),
        s = null,
        i = 0,
        m = 0,
        n = 0,
        l = 0;

    // "bubbles"
    ctx.fillStyle = this.color.rgba();//"#FF0";
    for (i = 0; i < this.physics.springs.length; i += 1) {
        s = this.physics.springs[i];
        m = (s.a.x + s.b.x) / 2;
        n = (s.a.y + s.b.y) / 2;
        let dx = s.a.x - s.b.x;
        let dy = s.a.y - s.b.y;
        l = Math.sqrt(dx * dx + dy * dy);
        ctx.beginPath();
        ctx.arc(m, n, l / 4, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();
    }

    for (i = 0; i < this.body.length; i += 1) {
        c.x += this.body[i].p.x;
        c.y += this.body[i].p.y;
    }
    c.x /= this.body.length;
    c.y /= this.body.length;

    // test ear
    ctx.save();
    ctx.translate(c.x, c.y);
    ctx.rotate(this.faceAngle);
    ctx.beginPath();
    ctx.arc(-40, -40, 5, 0, Math.PI * 2);
    ctx.arc(40, -40, 5, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
    // eyes
    ctx.fillStyle = "#fff";
    ctx.beginPath();
    ctx.arc(-30, 0, 15, 0, Math.PI, true);
    ctx.fill();
    ctx.closePath();

    ctx.beginPath();
    ctx.arc(30, 0, 15, 0, Math.PI, true);
    ctx.fill();
    ctx.closePath();

    // smile
    ctx.beginPath();
    ctx.arc(0, 10, 20, 0, Math.PI);
    ctx.fill();
    ctx.closePath();
    ctx.restore();

    // *************************************************
    /*
    // border points
    for (i = 0; i < this.body.length; i += 1) {
        ctx.fillRect(this.body[i].p.x - 1, this.body[i].p.y - 1, 2, 2);
    }

    // draw inner lines
    for (i = 0; i < this.physics.springs.length; i += 1) {
        ctx.beginPath();
        s = this.physics.springs[i];
        ctx.moveTo(s.a.x, s.a.y);
        ctx.lineTo(s.b.x, s.b.y);
        ctx.closePath();
        ctx.lineWidth = 0.5;
        ctx.stroke();
    }
    */
};

ToxiCreature.prototype.setFaceAngle = function(angle) {
    this.faceAngle = Tools.clamp(angle, -Math.PI / 2, Math.PI);
}