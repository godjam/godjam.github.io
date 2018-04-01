/*globals Vector2, ColorMap, Tools*/
let TurtleRenderer = function () {
    function TurtleRenderer(scene, lsystem) {
        "use strict";

        this.scene = scene;
        this.lsystem = lsystem;
        this.init();

        // used for sizing and positionning on the scene
        this.stepsize = 1;
        this.min = scene.size.copy();
        this.max = new Vector2(0, 0);

        // used for colors
        this.actualdeep = 0;
        this.deepness = 0;
        this.colormap = ColorMap.create(10);

        // used for the draw animation
        this.imax = 0;
        this.saved_rect = null;

        // pass the instructions
        this.setInstructions(lsystem.getLastGeneration());

        // permit to calculate min, max and stepsize
        this.interpret(0, this.instructions.length, null);

        // reset position and stacks (after a first interpretation)
        this.init();

        this.min.x = Tools.clamp(this.min.x, 0, this.scene.size.x);
        this.min.y = Tools.clamp(this.min.y, 0, this.scene.size.y);
        this.max.x = Tools.clamp(this.max.x, 0, this.scene.size.x);
        this.max.y = Tools.clamp(this.max.y, 0, this.scene.size.y);

        let w = this.max.x - this.min.x,
            h = this.max.y - this.min.y,
            dw = this.scene.size.x / w,
            dh = this.scene.size.y / h;

        this.stepsize = ~~Math.min(dw, dh);

        let dx1 = this.position.x - this.scene.size.x / 2, // diff entre origine et centre de l'ecran
            dy1 = this.position.y - this.scene.size.y / 2,
            dx2 = w / 2 - this.scene.size.x / 2, // diff entre centre de la zone de dessin et le centre de l'ecran
            dy2 = h / 2 - this.scene.size.y / 2;
    }

    TurtleRenderer.prototype.init = function () {
        "use strict";
        this.position = new Vector2(this.lsystem.ox, this.lsystem.oy);
        this.heading = this.lsystem.oa - Math.PI / 2;
        this.angle = this.lsystem.angle || Math.PI / 2;

        this.xstack = [];
        this.ystack = [];
        this.hstack = [];
    };


    TurtleRenderer.prototype.setInstructions = function (instructions) {
        "use strict";
        this.instructions = instructions || "";
    };

    TurtleRenderer.prototype.moveForward = function () {
        "use strict";
        let x = Math.cos(this.heading) * this.stepsize,
            y = Math.sin(this.heading) * this.stepsize;
        this.position.x += x;
        this.position.y += y;

        if (this.position.x < this.min.x) {
            this.min.x = this.position.x;
        }
        if (this.position.x > this.max.x) {
            this.max.x = this.position.x;
        }
        if (this.position.y < this.min.y) {
            this.min.y = this.position.y;
        }
        if (this.position.y > this.max.y) {
            this.max.y = this.position.y;
        }
    };

    TurtleRenderer.prototype.turnLeft = function () {
        "use strict";
        this.heading += this.angle;
    };

    TurtleRenderer.prototype.turnRight = function () {
        "use strict";
        this.heading -= this.angle;
    };

    TurtleRenderer.prototype.drawForwardLine = function (ctx) {
        "use strict";
        let x = this.position.x,
            y = this.position.y;
        this.moveForward();
        if (ctx !== null) {
            ctx.beginPath();
            ctx.strokeStyle = this.colormap.getByVal(this.actualdeep, this.deepness).rgba();
            ctx.moveTo(x, y);
            ctx.lineTo(this.position.x, this.position.y);
            ctx.closePath();
            ctx.stroke();
        }
    };

    TurtleRenderer.prototype.push = function () {
        "use strict";
        this.xstack.push(this.position.x);
        this.ystack.push(this.position.y);
        this.hstack.push(this.heading);
        this.actualdeep += 1;
        if (this.actualdeep > this.deepness) {
            this.deepness = this.actualdeep;
        }
    };

    TurtleRenderer.prototype.pop = function () {
        "use strict";
        this.position.x = this.xstack.pop();
        this.position.y = this.ystack.pop();
        this.heading = this.hstack.pop();
        this.actualdeep -= 1;
    };



    TurtleRenderer.prototype.render = function (ctx) {
        "use strict";
        // simple render
        this.interpret(0, this.instructions.length, ctx);
        this.init();
    };

    TurtleRenderer.prototype.interpret = function (imin, imax, ctx) {
        "use strict";
        let i = 0,
            c = "";
        for (i = imin; i < imax; i += 1) {
            c = this.instructions[i];
            if (c === 'F') {
                this.drawForwardLine(ctx);
            } else if (c === 'G') {
                this.moveForward();
            } else if (c === '+') {
                this.turnLeft();
            } else if (c === '-') {
                this.turnRight();
            } else if (c === '[') {
                this.push();
            } else if (c === ']') {
                this.pop();
            }
        }
    }
};