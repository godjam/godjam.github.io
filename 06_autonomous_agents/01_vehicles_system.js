/*global Scene, MouseEvtListener, Vehicle, Vector2, Flowfield, Path*/
//*************************************************
var VehiclesSystemScene = function (options) {
    "use strict";
    Scene.call(this);
    if (options === undefined) {
        behavior_type: 0;
    }
    this.options = options;

    this.vehicles = [];

    this.target = null; //new Vector2(Math.random() * this.size.x, Math.random() * this.size.y);
    //remove lastTarget, targetSpeed
    this.lastTarget = new Vector2(0, 0);
    this.targetSpeed = new Vector2(0, 0);
    this.field = null;
    this.path = null;

    this.initScene();
    var i = 0;
    for (i = 0; i < 200; i += 1) {
        this.vehicles.push(new Vehicle(this, Math.random() * this.size.x, Math.random() * this.size.y));
    }
    this.eventListeners.push(new MouseEvtListener(this.canvas, this, this.mouseStartEvt));
};
VehiclesSystemScene.prototype = Object.create(Scene.prototype);
VehiclesSystemScene.prototype.constructor = VehiclesSystemScene;


VehiclesSystemScene.prototype.loop = function () {
    "use strict";
    var i = 0;

    this.ctx.clearRect(0, 0, this.size.x, this.size.y);

    if (this.field) {
        this.field.updatePerlin();
        this.field.display(this.ctx);
    }

    if (this.path) {
        if (this.options.behavior_type === 7) { this.path.updatePerlin(); }
        this.path.display(this.ctx);
    }

    for (i = 0; i < this.vehicles.length; i += 1) {
        if (this.options.behavior_type === 0) {
            this.updateFlee(i);
        }
        if (this.options.behavior_type === 1) {
            this.updatePursuit(i);
        }
        if (this.options.behavior_type === 2) {
            this.updateCenterTrap(i);
        }
        if (this.options.behavior_type === 3) {
            this.updateWandering(i);
        }
        if (this.options.behavior_type === 4) {
            this.updateAvoidWalls(i);
        }
        if (this.options.behavior_type === 5) {
            this.updateFlowFieldFollowing(i);
        }
        if (this.options.behavior_type === 6 || this.options.behavior_type === 7) {
            this.updatePathFollowing(i);
        }

        this.vehicles[i].update();
        this.vehicles[i].display(this.ctx);
    }

    Scene.prototype.loop.call(this);
};

VehiclesSystemScene.prototype.mouseStartEvt = function (position) {
    "use strict";
    if (this.target) {
        this.lastTarget.x = this.target.x;
        this.lastTarget.y = this.target.y;
    }
    this.target = new Vector2(position.x, position.y);
    this.targetSpeed = this.target.sub(this.lastTarget);
};

VehiclesSystemScene.prototype.initScene = function () {
    if (this.options.behavior_type === 0) {
        this.intro("Behavior: Flee", "Vehicles will flee from touch point.");
    }
    if (this.options.behavior_type === 1) {
        this.intro("Behavior: Pursuit", "Vehicles will pursuit touch point.");
    }
    if (this.options.behavior_type === 2) {
        this.intro("Center Trap", "The more vehicles will be near the center point, the more they will be slow.");
    }
    if (this.options.behavior_type === 3) {
        this.intro("Behavior: Wandering", "The vehicles wander around.");
    }
    if (this.options.behavior_type === 4) {
        this.intro("Behavior: Avoid Walls", "Flee + avoid walls.");
    }
    if (this.options.behavior_type === 5) {
        this.intro("Behavior: Follow Flow Field", "the vehicles follow the flow field.");
        this.field = new Flowfield(20, 20, this);
    }
    if (this.options.behavior_type === 6) {
        this.intro("Behavior: Path Following", "The vehicles follow the path.");
        var a = Math.round(Math.random() * 8 + 2);
        this.path = new Path(a, this);
    }

    if (this.options.behavior_type === 7) {
        this.intro("Behavior: Path Evolution", "The vehicles follow the path.<br>The path change with time.");
        this.path = new Path(5, this);
    }
};

VehiclesSystemScene.prototype.updateFlee = function (i) {
    if (this.target) {
        this.vehicles[i].flee(this.target);
    }
};

VehiclesSystemScene.prototype.updatePursuit = function (i) {
    if (this.target) {
        this.vehicles[i].pursuit(this.target, this.targetSpeed);
    }
};

VehiclesSystemScene.prototype.updateCenterTrap = function (i) {
    if (this.target) {
        var d = Math.pow((this.size.x / 2 - this.vehicles[i].mover.location.x) / this.size.x, 2) +
                Math.pow((this.size.y / 2 - this.vehicles[i].mover.location.y) / this.size.y, 2);
        this.vehicles[i].maxSpeed = d * 100;
        this.vehicles[i].seek(this.target);
    }
};

VehiclesSystemScene.prototype.updateWandering = function (i) {
    this.vehicles[i].wandering();
};

VehiclesSystemScene.prototype.updateAvoidWalls = function (i) {
    if (this.target) {
        this.vehicles[i].flee(this.target);
    }
    this.vehicles[i].avoidWalls();
};

VehiclesSystemScene.prototype.updateFlowFieldFollowing = function (i) {
    if (this.field) {
        this.vehicles[i].flowFieldFollowing(this.field);
    }
};

VehiclesSystemScene.prototype.updatePathFollowing = function (i) {
    if (this.path) {
        this.vehicles[i].pathFollowing(this.path);
    }
};