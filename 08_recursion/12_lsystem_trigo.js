/*global Scene, LSystem, ECSModule*/
//*************************************************
var LSystemScene = function() {
    "use strict";
    Scene.call(this);
    this.intro("LSystem");
    var w = this.size.x,
        h =this.size.y;

    // Koch snowflake
    // this.lsystem = new LSystem('F++F++F', {F: 'F-F++F-F'}, 2, Math.PI / 3, w / 2, h / 2);
    // Quadratic Koch Island
    //this.lsystem = new LSystem('F-F-F-F', {F: 'F-F+F+FF-F-F+F'}, 3, Math.PI / 2, w / 2, h / 2);
    //this.lsystem = new LSystem('+F', {F: 'F+F-F-F+F'}, 3);
    //this.lsystem = new LSystem('F+F+F+F', {F: 'F+f-FF+F+FF+Ff+FF-f+FF-F-FF-Ff-FFF', f: 'ffffff'}, 2, Math.PI / 2, w / 2, h / 2);
    this.lsystem = new LSystem('F', {F: 'FF+[+F-F-F]-[-F+F+F]'}, 4, Math.PI / 8, w / 2, h);

    this.turtle = new ECSModule.TurtleRenderer(this, this.lsystem);
};
System.extends(LSystemScene, Scene);

LSystemScene.prototype.loop = function() {
    Scene.prototype.loop.call(this);
    this.ctx.clearRect(0, 0, this.size.x, this.size.y);
    this.turtle.render(this.ctx);
};