/*global Vector2*/
var RecursiveTree = function () {
    "use strict";
};

RecursiveTree.prototype.display = function (ctx) {
    "use strict";
    ctx.strokeStyle = "#000";
    ctx.lineWidth = 10;
    ctx.save();
    ctx.translate(ctx.canvas.clientWidth / 2, ctx.canvas.clientHeight);
    ctx.fillRect(-5, -5, 10, 10);
    ctx.fillRect(-5, -5 - 100, 10, 10);
    this.branch(ctx, 0);
    ctx.restore();
};

RecursiveTree.prototype.branch = function (ctx, r) {
    "use strict";
    if (r > 7) {
        return;
    }
    
    r += 1;
    ctx.beginPath();
    ctx.lineWidth = 10 / r;
    // trunk
    ctx.moveTo(0, 0);
    ctx.lineTo(0, -100 / r);
    ctx.stroke();
    ctx.closePath();
    ctx.translate(0, -100 / r);
    
    // branch 1
    ctx.save();
    ctx.rotate(Math.PI / 6);
    this.branch(ctx, r);
    ctx.restore();
    
    // branch 2
    ctx.save();
    ctx.rotate(-Math.PI / 6);
    this.branch(ctx, r);
    ctx.restore();
    
};