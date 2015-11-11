/*global Scene, CanvasTestScene, ColorTestScene, WalkerScene, NormalDistribScene, PerlinNoiseScene, NoiseScapeScene, BouncingBallScene, VectorWalkerScene, BouncingBall3DScene*/
var Factory = function () {
    "use strict";
    this.scene = undefined;
    this.cache = undefined;
};


// start function 'default' scene
window.addEventListener("DOMContentLoaded", function () {
    "use strict";
    Factory.init();
    Factory.create01_03_bouncingball3D();
});


Factory.init = function () {
    "use strict";
    // based on : http://eloquentjavascript.net/10_modules.html
    this.cache = Object.create(null);
    
    this.cache["00_00"] = Factory.create00_00_canvas;
    this.cache["00_01"] = Factory.create00_01_color;
    this.cache["01_01"] = Factory.create01_01_random_walker;
    // TODO
    this.cache["01_10"] = Factory.create01_10_noisescape;
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

Factory.create00_01_color = function () {
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

Factory.create01_04_normal_distrib = function () {
    "use strict";
    this.start(new NormalDistribScene());
};

Factory.create01_05_normal_distrib_walker = function () {
    "use strict";
    this.start(new WalkerScene({walkertype: 2 }));
};

Factory.create01_06_montecarlo_walker = function () {
    "use strict";
    this.start(new WalkerScene({walkertype: 3 }));
};

Factory.create01_07_perlin_walker = function () {
    "use strict";
    this.start(new WalkerScene({walkertype: 4 }));
};

Factory.create01_09_perlinnoise = function () {
    "use strict";
    this.start(new PerlinNoiseScene());
};

Factory.create01_10_noisescape = function () {
    "use strict";
    this.start(new NoiseScapeScene());
};

Factory.create01_10_noisescape = function () {
    "use strict";
    this.start(new NoiseScapeScene());
};

Factory.create01_01_bouncingball = function () {
    "use strict";
    this.start(new BouncingBallScene());
};

Factory.create01_02_vectorwalker = function () {
    "use strict";
    this.start(new VectorWalkerScene());
};

Factory.create01_03_bouncingball3D = function () {
    "use strict";
    this.start(new BouncingBall3DScene());
};