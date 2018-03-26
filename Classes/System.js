// inspired by : http://www.vinceallen.com/#/florajs-audio/
// TODO find a cool name (Fauna, Iki (small things in hawaiian), fallingstar, shootingstar, planktonjs, lifeform, Eden, Eden kit, Rez)
var System = System || {};
/**
 * http://stackoverflow.com/questions/30446277/extending-ecmascript-5-classes-in-es6-code
 *
 * Rectangle.prototype = Object.create(Shape.prototype);
 * Rectangle.prototype.constructor = Rectangle;
 */
System.extends = function(subclass, superclass) {
    "use strict";
    if (typeof superclass !== "function" && superclass !== null) {
        throw new TypeError("Super expression must either be null or a function, not " + typeof superclass);
    }

    subclass.prototype = Object.create(
        superclass && superclass.prototype, {
            constructor: {
                value: subclass,
                enumerable: false,
                writable: true,
                configurable: true
            }
        }
    );
    if (superclass) subclass.__proto__ = superclass;
};

/**
 * Entity-Components System
 *
 * http://vasir.net/blog/game-development/how-to-build-entity-component-system-in-javascript
 * http://www.richardlord.net/blog/what-is-an-entity-framework
 */
var ECSModule = {};
ECSModule.Entity = (function() {

    var Entity = function() {
        "use strict";
        // uniq id
        this.id = Entity.prototype.count;
        // this is a named array of components
        this.components = {};

        Entity.prototype.count++;
        // used for chaining
        return this;
    };
    Entity.prototype.count = 0;

    /**
     * Add a component
     **/
    Entity.prototype.addComponent = function(component) {
        "use strict";

        if (component instanceof ECSModule.Component === false) {
            throw "Entity.addComponent : component is not a System.Component";
        }

        this.components[component.name] = component;
        return this;
    };

    /**
     * Remove a component by its name or by itself
     */
    Entity.prototype.removeComponent = function(component) {
        "use strict";
        var name = component;

        if (component instanceof System.Component) {
            name = component.name;
        }

        delete this.components[name];
        return this;
    };

    /**
     * Permit to print / log information about the entity
     */
    Entity.prototype.print = function() {
        "use strict";
        console.log(JSON.stringify(this, null, 4));
        return this;
    };

    return Entity
}());

// ****************************************************************************
/**
 * Component Prototype
 *
 */
ECSModule.Component = (function() {
    var Component = function(name) {
        "use strict";
        this.name = name || "component";
        return this;
    };
    return Component;
}());


// ****************************************************************************
/**
 * Process (Or Systems)  Prototype
 */
ECSModule.System = (function() {

    function Process (scene, componentname, timeRez) {
        "use strict";
        this.scene = scene;
        this.componentsname = componentname;
        this.timeRez = timeRez || 0;
        this.nodes = [];
        // console.log("Parent");
    };


    /**
     * Add a component
     **/
    Process.prototype.addEntityComponents = function(entity) {
        "use strict";
        if (entity instanceof ECSModule.Entity === false) {
            throw "System.addEntityComponents : entity is not a System.Entity";
        }
        if (entity.components[this.componentsname]) {
            this.nodes.push(entity.components[this.componentsname]);
        }
    };

    /**
     * Remove a component by its name or by itself
     */
    Process.prototype.removeEntityComponents = function(entity) {
        "use strict";
        var i = 0,
            idx = -1;
        for (i = 0; i < entity.components.length; i += 1) {
            idx = this.nodes.indexOf(entity.components[i]);
            if (idx > 0) {
                this.nodes.slice(idx);
            }
        }
    };

    Process.prototype.stop = function() {
        "use strict";
        console.log("test 2 parent");
    };


    // TODO : add a fireUdate()
    Process.prototype.update = function(time) {
        "use strict";
        console.log("test parent " + time);
    };

    return Process;
}());
// ****************************************************************************

ECSModule.Components = (function() {
    var Health = function(value) {
        "use strict";
        ECSModule.Component.call(this, "health");
        this.value = value || 10;
    };
    System.extends(Health, ECSModule.Component);

    var Position = function(x, y, r) {
        "use strict";
        ECSModule.Component.call(this, "position");
        this.x = x;
        this.y = y;
        this.rotation = r;
    };
    System.extends(Position, ECSModule.Component);

    var Display = function() {
        "use strict";
        ECSModule.Component.call(this, "display");
        this.x = 0;
        this.y = 0;
        this.rotation = 0;
    };
    System.extends(Display, ECSModule.Component);

    return {
        Health: Health,
        Position: Position,
        Display: Display
    };
}());

// ****************************************************************************
ECSModule.Systems = {};
ECSModule.Systems.CanvasRenderer = (function() {
    function CanvasRenderer (scene) {
        "use strict";
        console.log("Child");
        ECSModule.System.apply(this, scene, "display");
    };
    CanvasRenderer.prototype = Object.create(ECSModule.System.prototype);

    CanvasRenderer.prototype.update = function(time) {
        "use strict";
        ECSModule.System.prototype.update.call(this, time);
        console.log("test Child");
        var i = 0;
        for (i = 0; i < this.nodes.length; i += 1) {
            this.nodes[i].display.view.x = this.nodes[i].position.x;
            this.nodes[i].display.view.y = this.nodes[i].position.y;
            this.nodes[i].display.view.rotation = this.nodes[i].rotation;
        }
    };

    return CanvasRenderer;
}());

ECSModule.Systems.MoveProcess = (function() {
    var MoveProcess = function(scene) {
        "use strict";
        console.log("Child 2");
        ECSModule.System.apply(this, scene, "position");
    };
    System.extends(MoveProcess, ECSModule.System);
    //MoveProcess.prototype = Object.create(ECSModule.System.prototype);

    MoveProcess.prototype.update = function(time) {
        "use strict";
        ECSModule.System.prototype.update.call(this, time);
        var i = 0;
        console.log("test Child 2");
        for (i = 0; i < this.nodes.length; i += 1) {
            this.nodes[i].position.x += this.nodes[i].velocity.x * time;
            this.nodes[i].position.y += this.nodes[i].velocity.y * time;
            this.nodes[i].rotation += this.nodes[i].velocity.angularVelocity * time;
        }
    };
    return MoveProcess;
}());
// ****************************************************************************
var FactoryModule = (function () {
    // Entity Factory
    var createSpaceShip = function(scene) {
        "use strict";
        var spaceship = new ECSModule.Entity();
        var position = new ECSModule.Components.Position(scene.size.x / 2, scene.size.y / 2, 0);
        var display = new ECSModule.Components.Display(scene.size.x / 2, scene.size.y / 2, 0);
        spaceship.addComponent(position);
        spaceship.addComponent(display);
        scene.addEntity(spaceship);
    };

    // Systems Factory
    var create = function(scene) {
        "use strict";
        var p = new ECSModule.Systems.MoveProcess(scene);
        p.stop();
        p.update(30);
        /*
        scene.addProcess(new ECSModule.Systems.MoveProcess(scene), 0);
        scene.addProcess(new ECSModule.Systems.CanvasRenderer(scene), 1);
        */
    };

    return {
        createSpaceShip: createSpaceShip,
        create: create
    };
}());
// use case :
//    System.SystemFactory.create(this);
//   System.EntityFactory.createSpaceShip(this);

//TODO : http://stackoverflow.com/questions/15436533/inheritance-and-module-pattern
// http://stackoverflow.com/questions/16366268/grasping-oop-javascript-module-pattern-with-inheritance