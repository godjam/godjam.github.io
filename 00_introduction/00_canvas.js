/*global Scene, Vector2, MouseEvtListener, Color, Tools*/
var CanvasTestScene = function () {
	"use strict";
    Scene.call(this);
    this.intro("Simple canvas experiment", "Reacts to pointer events with easing.");

    this.radius = 50;
    this.pos = new Vector2(this.size.x / 2, this.size.y / 2);
    this.color = Color.createLightColor();
    this.eventListeners.push(new MouseEvtListener(this.canvas, this, this.mouseEvent));
    this.motionX = null;
    this.motionY = null;
    this.motionH = null;
};
CanvasTestScene.prototype = Object.create(Scene.prototype);
CanvasTestScene.prototype.constructor = CanvasTestScene;


CanvasTestScene.prototype.loop = function () {
    "use strict";
    // update
    if (this.motionX !== null) { this.motionX.update(this.frameloop.delta); }
    if (this.motionY !== null) { this.motionY.update(this.frameloop.delta); }
    // update color
    if (this.motionH !== null) {
        this.motionH.update(this.frameloop.delta);
        this.color.hslToRgb();
    }

    // render
    this.ctx.clearRect(0, 0, this.size.x, this.size.y);
    this.ctx.beginPath();
    this.ctx.arc(this.pos.x, this.pos.y, this.radius, 0, Math.PI * 2, true);
    this.ctx.closePath();

    this.ctx.shadowOffsetY = 6;
    this.ctx.shadowBlur = 6;
    this.ctx.strokeStyle = this.color.rgba();
    this.ctx.fillStyle = this.color.darken().rgba();
    this.ctx.shadowColor = this.color.modify(0, -0.2, -0.2).rgba();
    this.ctx.stroke();
    this.ctx.fill();

    Scene.prototype.loop.call(this);
};


CanvasTestScene.prototype.mouseEvent = function (position) {
    "use strict";
    this.motionX = new Tools.Motion(this.pos, "x", this.pos.x, position.x, 2, Tools.elasticEaseOut);
    this.motionY = new Tools.Motion(this.pos, "y", this.pos.y, position.y, 2, Tools.elasticEaseOut);
    // link x position to hue
    this.motionH = new Tools.Motion(this.color, "h", (this.pos.x / this.size.x), (position.x / this.size.x), 2, Tools.elasticEaseOut);
};