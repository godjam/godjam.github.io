/*global Scene, CanvasTestScene, ColorTestScene, WalkerScene*/
var Factory = function () {
    "use strict";
    this.scene = undefined;
};

Factory.autoclose = function () {
    "use strict";
    document.getElementById("nav-trigger").checked = false;
};

Factory.start = function (scene) {
    "use strict";
    if (scene instanceof Scene === false) {
        throw "Factory.start : scene is not a Scene";
    }
    
    this.stop();
    this.scene = scene;
    this.requestAnimValue = window.requestAnimationFrame(scene.loop.bind(scene));
    this.autoclose();
};

Factory.stop = function () {
    "use strict";
    if (this.scene !== undefined) {
        this.scene.stop();
    }
};

Factory.create00_00_canvas = function () {
    "use strict";
    this.start(new CanvasTestScene());
};

Factory.create00_00_color = function () {
    "use strict";
    this.start(new ColorTestScene());
};

Factory.create01_01_random_walker = function () {
    "use strict";
    this.start(new WalkerScene({walkertype: 0 }));
};

Factory.create01_03_random_walker = function () {
    "use strict";
    this.start(new WalkerScene({walkertype: 1 }));
};