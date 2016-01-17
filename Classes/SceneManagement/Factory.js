/*global console, Color,
Scene, CanvasTestScene, ColorTestScene, WalkerScene,
NormalDistribScene, PerlinNoiseScene, NoiseScapeScene, BouncingBallScene,
VectorWalkerScene, BouncingBall3DScene, MoverAccelerationScene, MoverPerlinScene,
MoverFollowScene, EcosystemScene_01, HeliumBalloonScene, CenterForceScene,
FrictionForceScene, DragForceScene, GravitationalAttractionScene,
CustomAttractionScene, RepulsiveMoversScene, EcosystemScene_02,
RotationScene, CannonScene, SpiralScene, SinusoidalOcillationScene,
OscillatorScene, OscillationScene, SpringsScene, EcosystemScene_03,
ParticlesScene, ParticlesAttractorScene, AsteroidsScene, SystemOfSystemsScene,
ShatteringScene, ConfettiScene, ParticlesRepellerScene, AttractiveParticlesScene,
BlendParticlesScene, BoxesScene, CollisionListenerScene, ClothSimulationScene */
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
    Factory.parseURL();
});

/*
 * Used to create a palette (4 bright colors and 1 dark color)
 */
Factory.createPalette = function () {
    "use strict";
    console.log(Color.createBrightColor().ToHex());
    console.log(Color.createBrightColor().ToHex());
    console.log(Color.createBrightColor().ToHex());
    console.log(Color.createBrightColor().ToHex());
    console.log(Color.createDarkColor().ToHex());
};

Factory.toggleFullscreen = function () {
    "use strict";
    if (!document.fullscreenElement && // alternative standard method
            !document.mozFullScreenElement &&
            !document.webkitFullscreenElement &&
            !document.msFullscreenElement) {
        // current working methods
        if (document.documentElement.requestFullscreen) {
            document.documentElement.requestFullscreen();
        } else if (document.documentElement.msRequestFullscreen) {
            document.documentElement.msRequestFullscreen();
        } else if (document.documentElement.mozRequestFullScreen) {
            document.documentElement.mozRequestFullScreen();
        } else if (document.documentElement.webkitRequestFullscreen) {
            document.documentElement.webkitRequestFullscreen();
        }
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        }
    }
};

Factory.parseURL = function () {
    "use strict";
    var defaultKey = "05_11",
        key = "";
    
    if (window !== null) {
        key = window.location.search;
        key = key.replace("?s=", "");
    }
    
    if (this.cache[key] === undefined) {
        key = defaultKey;
    }
    
    Factory.createScene(key);
};

Factory.init = function () {
    "use strict";
    console.log("%c Nature %c Code ", "color: #fff; background: #ff00bb;", "color: #fff; background: #00ffbb;");
        
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
    this.cache.ES_01 = EcosystemScene_01;
    // chap 2 : Forces
    this.cache["02_01"] = HeliumBalloonScene;
    this.cache["02_03"] = CenterForceScene;
    this.cache["02_04"] = FrictionForceScene;
    this.cache["02_05"] = DragForceScene;
    this.cache["02_08"] = GravitationalAttractionScene;
    this.cache["02_09"] = CustomAttractionScene;
    this.cache["02_10"] = RepulsiveMoversScene;
    this.cache.ES_02 = EcosystemScene_02;
    // chap 3 : Oscillation
    this.cache["03_01"] = RotationScene;
    this.cache["03_02"] = CannonScene;
    this.cache["03_04"] = SpiralScene;
    this.cache["03_06"] = SinusoidalOcillationScene;
    
    this.cache["03_07"] = OscillatorScene;
    this.objOp["03_07"] = {oscillatortype: 1};
    
    this.cache["03_08"] = OscillatorScene;
    this.objOp["03_08"] = {oscillatortype: 2};
    
    this.cache["03_09"] = OscillatorScene;
    this.objOp["03_09"] = {oscillatortype: 3};
    
    this.cache["03_10"] = OscillatorScene;
    this.objOp["03_10"] = {oscillatortype: 4};
    
    this.cache["03_11"] = OscillatorScene;
    this.objOp["03_11"] = {oscillatortype: 5};
    
    this.cache["03_12"] = OscillationScene;
    this.cache["03_16"] = SpringsScene;
    this.cache.ES_03 = EcosystemScene_03;
    
    // chap 4 : Particles
    this.cache["04_02"] = ParticlesScene;
    this.cache["04_03"] = ParticlesAttractorScene;
    this.cache["04_04"] = AsteroidsScene;
    this.cache["04_05"] = SystemOfSystemsScene;
    this.cache["04_06"] = ShatteringScene;
    this.cache["04_08"] = ConfettiScene;
    this.cache["04_09"] = ParticlesRepellerScene;
    this.cache["04_10"] = AttractiveParticlesScene;
    this.cache["04_11"] = BlendParticlesScene;
    
    // chap 5 : Physics Libraries
    this.cache["05_02"] = BoxesScene;
    this.objOp["05_02"] = {boxes_type: 0};
    
    this.cache["05_03"] = BoxesScene;
    this.objOp["05_03"] = {boxes_type: 1};
    
    this.cache["05_04"] = BoxesScene;
    this.objOp["05_04"] = {boxes_type: 2};
    
    this.cache["05_05"] = BoxesScene;
    this.objOp["05_05"] = {boxes_type: 3};
    
    //this.cache["05_06"] = BoxesScene;
    //this.objOp["05_06"] = {boxes_type: 4};
    
    this.cache["05_06"] = BoxesScene;
    this.objOp["05_06"] = {boxes_type: 5};

    this.cache["05_07"] = BoxesScene;
    this.objOp["05_07"] = {boxes_type: 6};
    
    this.cache["05_08"] = BoxesScene;
    this.objOp["05_08"] = {boxes_type: 7};
    
    this.cache["05_09"] = BoxesScene;
    this.objOp["05_09"] = {boxes_type: 8};
    
    this.cache["05_10"] = BoxesScene;
    this.objOp["05_10"] = {boxes_type: 9};
    
    this.cache["05_11"] = CollisionListenerScene;
    this.cache["05_13"] = ClothSimulationScene;
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