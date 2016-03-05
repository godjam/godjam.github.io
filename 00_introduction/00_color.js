/*global Scene, Array2D, Color*/
//*************************************************
var ColorTestScene = function () {
    "use strict";
    Scene.call(this);
    this.intro("Simple color experiment", "Each dot color evolve with time.");

    var i = 0,
        j = 0,
        c = null;

    this.count = 10;
    this.colors = new Array2D(this.count, this.count);

    for (i = 0; i < this.count; i += 1) {
        c = Color.createLightColor();
        for (j = 0; j < this.count; j += 1) {
            c = c.bluify();
            this.colors.set(i, j, c);
            //colors.add(i, j, Color.createBrightColor());
        }
    }
};
ColorTestScene.prototype = Object.create(Scene.prototype);
ColorTestScene.prototype.constructor = ColorTestScene;


ColorTestScene.prototype.loop = function () {
    "use strict";
    var i = 0, j = 0, c = null,
        min = Math.min(this.size.x, this.size.y),
        step =  min / this.count,
        dx = (this.size.x - min) / 2,
        dy = (this.size.y - min) / 2;


    this.ctx.clearRect(0, 0, this.size.x, this.size.y);
    for (i = 0; i < this.colors.getWidth(); i += 1) {
        for (j = 0; j < this.colors.getHeight(); j += 1) {
            c = this.colors.get(i, j);
            this.ctx.beginPath();
            this.ctx.fillStyle = c.rgba();
            this.ctx.arc(dx + (i + 0.5) * step, dy + (j + 0.5) * step, step / 2.1, 0, Math.PI * 2);
            this.ctx.fill();
            this.ctx.closePath();
            // update ref
            c = c.mutate();
            this.colors.set(i, j, c);
        }
    }

    this.frameloop.display(this.ctx);

    Scene.prototype.loop.call(this);
};