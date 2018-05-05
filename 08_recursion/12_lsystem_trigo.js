/*global Scene, LSystem*/
//*************************************************
let LSystemScene = function(options) {
    "use strict";
    Scene.call(this, options);
    this.intro("LSystem");
    this.initNewLSystem();
    this.addUpdateCallback(() => this.initNewLSystem(), 2000);
};
LSystemScene.prototype = Object.create(Scene.prototype);
LSystemScene.prototype.constructor = LSystemScene;

LSystemScene.prototype.initNewLSystem = function() {
    "use strict";
    let w = this.size.x,
        h = this.size.y;


    // Koch snowflake
    // this.lsystem = new LSystem('F++F++F', {F: 'F-F++F-F'}, 2, Math.PI / 3, w / 2, h / 2);
    // Quadratic Koch Island
    //this.lsystem = new LSystem('F-F-F-F', {F: 'F-F+F+FF-F-F+F'}, 3, Math.PI / 2, w / 2, h / 2);
    //this.lsystem = new LSystem('+F', {F: 'F+F-F-F+F'}, 3);
    //this.lsystem = new LSystem('F+F+F+F', {F: 'F+f-FF+F+FF+Ff+FF-f+FF-F-FF-Ff-FFF', f: 'ffffff'}, 2, Math.PI / 2, w / 2, h / 2);

    // LSystem plant
    //this.lsystem = new LSystem('F', Math.PI / 8, w / 2, h)
    //    .addRule('F', 'FF+[+F-F-F]-[-F+F+F]')
    //    .generate(4);

    // stockastic plant
    /*
    this.lsystem = new LSystem('X', Math.PI / 8, w / 2, h)
        .addRule('X', 'F[++X]F[−X]+X', 0.2)
        .addRule('X', 'F[+X]F[−X]+X', 0.8)
        .addRule('F', 'FF')
        .generate(4);
    */
    // LSystem plant
    this.lsystem = new LSystem('F', Math.PI / 8, w / 2, h)
        .addRule('F', 'FF+[+F-F-F-F]-[-F+F+F+F]', 0.3)
        .addRule('F', 'FF-[-F+F+F+F]+[+F-F-F-F]', 0.3)
        .addRule('F', 'FFF-[-F+F]+[+F-F]', 0.4)
        .generate(4);
    
    this.turtle = new TurtleRenderer(this, this.lsystem);
    
    // clean and render
    this.ctx.clearRect(0, 0, this.size.x, this.size.y);
    this.turtle.render(this.ctx);
}