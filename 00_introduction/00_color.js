/*global Scene, Array2D, Color*/
//*************************************************
var ColorTestScene = function () {
    "use strict";
    Scene.call(this);
    
    var i = 0,
        j = 0,
        c = null,
        count = 10;
    
    this.colors = new Array2D(count, count);
    this.step = Math.min(this.width, this.height) / count;
    
    for (i = 0; i < count; i += 1) {
        c = Color.createLightColor();
        for (j = 0; j < count; j += 1) {
            this.colors.add(i, j, c.bluify().copy());
            //colors.add(i, j, Color.createBrightColor());
        }
    }
};
ColorTestScene.prototype = Object.create(Scene.prototype);
ColorTestScene.prototype.constructor = ColorTestScene;


ColorTestScene.prototype.loop = function () {
    "use strict";
    var i = 0, j = 0;

    this.ctx.clearRect(0, 0, this.width, this.height);
    for (i = 0; i < this.colors.getWidth(); i += 1) {
        for (j = 0; j < this.colors.getHeight(); j += 1) {
            this.ctx.beginPath();
            this.ctx.fillStyle = this.colors.get(i, j).ToHex();
            this.ctx.arc((i + 0.5) * this.step, (j + 0.5) * this.step, this.step / 2.1, 0, Math.PI * 2);
            this.ctx.fill();
            this.ctx.closePath();
            this.colors.get(i, j).mutate();
        }
    }
    
    this.frameloop.display(this.ctx);
    
    Scene.prototype.loop.call(this);
};