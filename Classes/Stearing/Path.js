/*global Vector2*/

var Path = function (worldW, worldH, count) {
    "use strict";
    
    if (count < 2 || count === undefined) { count = 2; }
    if (count > 10) { count = 10; }
    
    this.points = [];
    this.radius = 20;
    
    var i = 0, theta = 0,
        v = null,
        center = new Vector2(worldW / 2, worldH / 2),
        r = Math.min(worldW, worldH) / 2 - 20;
    
    if (count <= 3) {
        theta = Math.PI * 2 / count;
    } else {
        theta = Math.PI * 2 / (count - 1);
    }
    
    for (i = 0; i < count; i += 1) {
        v = Vector2.fromPolar(r, i * theta);
        v.addInPlace(center);
        this.points.push(v);
    }
};

Path.prototype.display = function (ctx) {
    "use strict";
    var i = 0;
    ctx.save();
    
    for (i = 0; i < this.points.length - 1; i += 1) {
        ctx.beginPath();
        ctx.lineWidth = 2 * this.radius;
        ctx.strokeStyle = "#ddd";
        ctx.lineCap = "round";
        ctx.moveTo(this.points[i].x, this.points[i].y);
        ctx.lineTo(this.points[i + 1].x, this.points[i + 1].y);
        ctx.stroke();
        ctx.closePath();

        ctx.beginPath();
        ctx.lineWidth = 0.5;
        ctx.strokeStyle = "#333";
        ctx.moveTo(this.points[i].x, this.points[i].y);
        ctx.lineTo(this.points[i + 1].x, this.points[i + 1].y);
        ctx.stroke();
        ctx.closePath();
    }
    ctx.restore();
};