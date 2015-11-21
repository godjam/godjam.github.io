/*global Scene, CanvasTestScene, ColorTestScene, WalkerScene,
NormalDistribScene, PerlinNoiseScene, NoiseScapeScene, BouncingBallScene,
VectorWalkerScene, BouncingBall3DScene, MoverAccelerationScene, MoverPerlinScene,
MoverFollowScene, EcosystemScene_01 */
var Factory = function () {
    "use strict";
    this.scene = undefined;
    this.cache = undefined;
    this.objOp = undefined;
};


// start function 'default' scene
window.addEventListener("DOMContentLoaded", function () {
    "use strict";
    Factory.init();
    Factory.createPalette();
    Factory.createScene("Eco01");
});


Factory.createPalette = function () {
    "use strict";
    console.log(Color.createBrightColor().ToHex());
    console.log(Color.createBrightColor().ToHex());
    console.log(Color.createBrightColor().ToHex());
    console.log(Color.createBrightColor().ToHex());
    console.log(Color.createDarkColor().ToHex());
};


Factory.init = function () {
    "use strict";
    // based on : http://eloquentjavascript.net/10_modules.html
    this.cache = Object.create(null);
    this.objOp = Object.create(null);
    
    // tests
    this.cache["00"] = CanvasTestScene;
    this.cache["01"] = ColorTestScene;
    // chap 0 : introduction
    this.cache["00_01"] = WalkerScene;
    this.objOp["00_01"] = {walkertype: 0};
    
    this.cache["00_03"] = WalkerScene;
    this.objOp["00_03"] = {walkertype: 1};
    
    this.cache["00_04"] = NormalDistribScene;

    this.cache["00_05"] = WalkerScene;
    this.objOp["00_05"] = {walkertype: 2};
    
    this.cache["00_06"] = WalkerScene;
    this.objOp["00_06"] = {walkertype: 3};
    
    this.cache["00_07"] = WalkerScene;
    this.objOp["00_07"] = {walkertype: 4};

    this.cache["00_09"] = PerlinNoiseScene;
    this.cache["00_10"] = NoiseScapeScene;
    // chap 1 : Vector
    this.cache["01_01"] = BouncingBallScene;
    this.cache["01_02"] = VectorWalkerScene;
    this.cache["01_03"] = BouncingBall3DScene;
    this.cache["01_05"] = MoverAccelerationScene;
    this.cache["01_06"] = MoverPerlinScene;
    this.cache["01_08"] = MoverFollowScene;
    this.cache["Eco01"] = EcosystemScene_01;
};

Factory.autoclose = function () {
    "use strict";
    document.getElementById("togglebox").checked = false;
};

Factory.createScene = function (key) {
    "use strict";
    // check string
    if (typeof key !== "string") {
        throw "Factory.createScene : key is not a string";
    }
    
    if (this.cache[key] === undefined) {
        throw "Factory.createScene : specified key doesn't exists";
    }
    
    Factory.start(new this.cache[key](this.objOp[key]));
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