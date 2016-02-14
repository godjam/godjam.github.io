/*global Scene, MouseEvtListener, Vehicle, Vector2, Flowfield, Path, Tools*/
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
    for (i = 0; i < 150; i += 1) {
        var v = new Vehicle(this, Math.random() * this.size.x, Math.random() * this.size.y);;
        this.vehicles.push(v);
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
        if (this.options.behavior_type === 8) {
            this.updateCohesion(i);
        }
        if (this.options.behavior_type === 9) {
            this.updatePathSeparation(i);
        }
        if (this.options.behavior_type === 10) {
            this.updateSeekSeparate(i);
        }
        if (this.options.behavior_type === 11) {
            this.updateFlock(i);
        }
        if (this.options.behavior_type === 12) {
            this.updateFlockPath(i);
        }
        if (this.options.behavior_type === 13) {
            this.updateFlockView(i);
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
    this.target = position;
    this.targetSpeed.copyFrom(this.target);
    this.targetSpeed.subInPlace(this.lastTarget);
};

VehiclesSystemScene.prototype.initScene = function () {
    var a = 0;

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
        this.intro("Behavior: Avoid Walls", "Seeking + Avoid Walls.");
    }
    if (this.options.behavior_type === 5) {
        this.intro("Behavior: Follow Flow Field", "the vehicles follow the flow field.");
        this.field = new Flowfield(20, 20, this);
    }
    if (this.options.behavior_type === 6) {
        this.intro("Behavior: Path Following", "The vehicles follow the path.");
        a = Math.round(Math.random() * 8 + 2);
        this.path = new Path(a, this);
    }
    if (this.options.behavior_type === 7) {
        this.intro("Behavior: Path Evolution", "The vehicles follow the path.<br>The path change with time.");
        this.path = new Path(5, this);
    }
    if (this.options.behavior_type === 8) {
        this.intro("Behavior: Cohesion", "Each vehicle steer towards the others.");
    }
    if (this.options.behavior_type === 9) {
        this.intro("Behavior: Path following 2", "Path Following + Separation.");
        a = Math.round(Math.random() * 8 + 2);
        this.path = new Path(a, this);
    }
    if (this.options.behavior_type === 10) {
        this.intro("Behavior: Weighted Seek And Separate", "Seeking + Separation + Flow Field.<br>Weights evolve according to a Perlin noise.");
        this.field = new Flowfield(20, 20, this);
    }
    if (this.options.behavior_type === 11) {
        this.intro("Behavior: Flock", "Separation, Align and Cohesion. Use FOV");
    }
    if (this.options.behavior_type === 12) {
        this.intro("Behavior: Flock And Path Following", "Separation, Align, Cohesion and Path Following. Use FOV");
        a = Math.round(Math.random() * 8 + 2);
        this.path = new Path(a, this);
    }
    if (this.options.behavior_type === 13) {
        this.intro("Behavior: Flock View", "Separation, Align, Cohesion and View. Use FOV");
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
        this.vehicles[i].pursuit(this.target, this.targetSpeed);
    }
    this.vehicles[i].goCenter();
};

VehiclesSystemScene.prototype.updateWandering = function (i) {
    this.vehicles[i].wandering();
};

VehiclesSystemScene.prototype.updateAvoidWalls = function (i) {
    if (this.target) {
        this.vehicles[i].seek(this.target);
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

VehiclesSystemScene.prototype.updateCohesion = function (i) {
    var vehicles = this.vehicles[i].getVehiclesInRange(this.vehicles, this.vehicles[i].viewRadius);
    this.vehicles[i].cohesion(vehicles);
};

VehiclesSystemScene.prototype.updatePathSeparation = function (i) {
    if (this.path) {
        this.vehicles[i].pathFollowing(this.path);
    }
    var vehicles = this.vehicles[i].getVehiclesInRange(this.vehicles, this.vehicles[i].avoidanceRadius);
    this.vehicles[i].separate(vehicles);
};

VehiclesSystemScene.prototype.updateSeekSeparate = function (i) {
    var v = this.field.get(this.vehicles[i].mover.location.x, this.vehicles[i].mover.location.y);
    if (v) {
        v.x = Tools.clamp(v.x + 1, 1, 5);
        v.y = Tools.clamp(v.y + 1, 0, 5);

        var vehicles = this.vehicles[i].getVehiclesInRange(this.vehicles, this.vehicles[i].avoidanceRadius);
        this.vehicles[i].separate(vehicles, v.x);
        if (this.target) {
            this.vehicles[i].pursuit(this.target, this.targetSpeed, v.y);
        }
    }
    this.vehicles[i].flowFieldFollowing(this.field, 0.5);
    this.vehicles[i].avoidWalls();
};

VehiclesSystemScene.prototype.updateFlock = function (i) {
    var vehiclesAvoid = this.vehicles[i].getVehiclesInRange(this.vehicles, this.vehicles[i].avoidanceRadius);
    var vehiclesView = this.vehicles[i].getVehiclesInFOV(this.vehicles, this.vehicles[i].viewRadius, this.ctx);
    this.vehicles[i].separate(vehiclesAvoid, 1.5);
    this.vehicles[i].align(vehiclesView, 0.5);
    this.vehicles[i].cohesion(vehiclesView, 0.5);

};

VehiclesSystemScene.prototype.updateFlockPath = function (i) {
    var vehiclesAvoid = this.vehicles[i].getVehiclesInFOV(this.vehicles, this.vehicles[i].avoidanceRadius);
    var vehiclesView = this.vehicles[i].getVehiclesInFOV(this.vehicles, this.vehicles[i].viewRadius);
    this.vehicles[i].separate(vehiclesAvoid);
    this.vehicles[i].align(vehiclesView);
    this.vehicles[i].cohesion(vehiclesView);
    this.vehicles[i].pathFollowing(this.path, 2);
};

VehiclesSystemScene.prototype.updateFlockView = function (i) {
    var vehiclesAvoid = this.vehicles[i].getVehiclesInRange(this.vehicles, this.vehicles[i].avoidanceRadius);
    var vehiclesView = this.vehicles[i].getVehiclesInFOV(this.vehicles, this.vehicles[i].viewRadius, this.ctx);
    this.vehicles[i].separate(vehiclesAvoid, 1.5);
    this.vehicles[i].align(vehiclesView, 0.5);
    this.vehicles[i].cohesion(vehiclesView, 0.5);
    this.vehicles[i].view(vehiclesView, 1.5);
};
