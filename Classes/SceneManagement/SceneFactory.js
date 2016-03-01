/*global console, Scene, TestScene, CanvasTestScene, ColorTestScene, WalkerScene,
NormalDistribScene, PerlinNoiseScene, NoiseScapeScene, BouncingBallScene,
VectorWalkerScene, BouncingBall3DScene, MoverAccelerationScene, MoverPerlinScene,
MoverFollowScene, EcosystemScene_01, HeliumBalloonScene, CenterForceScene,
FrictionForceScene, DragForceScene, GravitationalAttractionScene,
CustomAttractionScene, RepulsiveMoversScene, EcosystemScene_02, RotationScene,
CannonScene, SpiralScene, SinusoidalOcillationScene, OscillatorScene,
OscillationScene, SpringsScene, EcosystemScene_03, ParticlesScene,
ParticlesAttractorScene, AsteroidsScene, SystemOfSystemsScene,ShatteringScene,
ConfettiScene, ParticlesRepellerScene, AttractiveParticlesScene,
BlendParticlesScene, BoxesScene, CollisionListenerScene, ToxiSimulationScene,
ClustersSystemScene, VehiclesSystemScene, WolframCAScene, GameOfLifeScene,
HexaGameOfLifeScene, ProbaGameOfLifeScene, ContinuousGameOfLifeScene,
RecursiveCircleScene, KochSnowflakeScene, SierpinskiTriangleScene*/
var SceneFactory = function () {
    "use strict";
    this.scene = undefined;
    this.cache = undefined;
    this.option = undefined;
};

// start function 'default' scene
window.addEventListener("DOMContentLoaded", function () {
    "use strict";
    SceneFactory.init();
    SceneFactory.parseURL();
});

SceneFactory.toggleFullscreen = function () {
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

SceneFactory.parseURL = function () {
    "use strict";
    var defaultKey = "08_05",
        key = "";

    if (window !== null) {
        key = window.location.search;
        key = key.replace("?s=", "");
    }

    if (this.cache[key] === undefined) {
        key = defaultKey;
    }

    SceneFactory.createScene(key);
};

SceneFactory.init = function () {
    "use strict";
    console.log("%c Nature %c Code ", "color: #fff; background: #ff00bb;", "color: #fff; background: #00ffbb;");
    console.log("Made with cosmic dust");

    // Hides mobile browser's address bar when page is done loading.
    // http://www.html5rocks.com/en/mobile/mobifying/
    setTimeout( function(){ window.scrollTo(0, 1); }, 50 );

    // based on : http://eloquentjavascript.net/10_modules.html
    this.cache = Object.create(null);
    this.option = Object.create(null);

    // tests
    this.cache["00"] = CanvasTestScene;
    this.cache["01"] = ColorTestScene;
    this.cache["02"] = TestScene;
    // chap 0 : introduction
    this.cache["00_01"] = WalkerScene;
    this.option["00_01"] = {walkertype: 0};

    this.cache["00_03"] = WalkerScene;
    this.option["00_03"] = {walkertype: 1};

    this.cache["00_04"] = NormalDistribScene;

    this.cache["00_05"] = WalkerScene;
    this.option["00_05"] = {walkertype: 2};

    this.cache["00_06"] = WalkerScene;
    this.option["00_06"] = {walkertype: 3};

    this.cache["00_07"] = WalkerScene;
    this.option["00_07"] = {walkertype: 4};

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
    this.option["03_07"] = {oscillatortype: 1};

    this.cache["03_08"] = OscillatorScene;
    this.option["03_08"] = {oscillatortype: 2};

    this.cache["03_09"] = OscillatorScene;
    this.option["03_09"] = {oscillatortype: 3};

    this.cache["03_10"] = OscillatorScene;
    this.option["03_10"] = {oscillatortype: 4};

    this.cache["03_11"] = OscillatorScene;
    this.option["03_11"] = {oscillatortype: 5};

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
    this.option["05_02"] = {boxes_type: 0};

    this.cache["05_03"] = BoxesScene;
    this.option["05_03"] = {boxes_type: 1};

    this.cache["05_04"] = BoxesScene;
    this.option["05_04"] = {boxes_type: 2};

    this.cache["05_05"] = BoxesScene;
    this.option["05_05"] = {boxes_type: 3};

    this.cache["05_06"] = BoxesScene;
    this.option["05_06"] = {boxes_type: 5};

    this.cache["05_07"] = BoxesScene;
    this.option["05_07"] = {boxes_type: 6};

    this.cache["05_08"] = BoxesScene;
    this.option["05_08"] = {boxes_type: 7};

    this.cache["05_09"] = BoxesScene;
    this.option["05_09"] = {boxes_type: 8};

    this.cache["05_10"] = BoxesScene;
    this.option["05_10"] = {boxes_type: 9};

    this.cache["05_11"] = CollisionListenerScene;

    this.cache["05_13"] = ToxiSimulationScene;
    this.option["05_13"] = {sim_type: 0};

    this.cache["05_14"] = ToxiSimulationScene;
    this.option["05_14"] = {sim_type: 1};

    this.cache["05_15"] = ClustersSystemScene;

    this.cache["05_16"] = ToxiSimulationScene;
    this.option["05_16"] = {sim_type: 2};

    // chap 5 : Steering Behaviors
    this.cache["06_01"] = VehiclesSystemScene;
    this.option["06_01"] = {behavior_type: 0};

    this.cache["06_02"] = VehiclesSystemScene;
    this.option["06_02"] = {behavior_type: 1};

    this.cache["06_03"] = VehiclesSystemScene;
    this.option["06_03"] = {behavior_type: 2};

    this.cache["06_04"] = VehiclesSystemScene;
    this.option["06_04"] = {behavior_type: 3};

    this.cache["06_05"] = VehiclesSystemScene;
    this.option["06_05"] = {behavior_type: 4};

    this.cache["06_07"] = VehiclesSystemScene;
    this.option["06_07"] = {behavior_type: 5};

    this.cache["06_10"] = VehiclesSystemScene;
    this.option["06_10"] = {behavior_type: 6};

    this.cache["06_11"] = VehiclesSystemScene;
    this.option["06_11"] = {behavior_type: 7};

    this.cache["06_12"] = VehiclesSystemScene;
    this.option["06_12"] = {behavior_type: 8};

    this.cache["06_13"] = VehiclesSystemScene;
    this.option["06_13"] = {behavior_type: 9};

    this.cache["06_14"] = VehiclesSystemScene;
    this.option["06_14"] = {behavior_type: 10};

    this.cache["06_15"] = VehiclesSystemScene;
    this.option["06_15"] = {behavior_type: 11};

    this.cache["06_16"] = VehiclesSystemScene;
    this.option["06_16"] = {behavior_type: 12};

    this.cache["06_17"] = VehiclesSystemScene;
    this.option["06_17"] = {behavior_type: 13};

    this.cache["06_19"] = VehiclesSystemScene;
    this.option["06_19"] = {behavior_type: 14};

    // TODO: Box2DVehicle
    // TODO: The Ecosystem project (p 343)
    this.cache["07_01"] = WolframCAScene;
    this.cache["07_06"] = GameOfLifeScene;
    this.cache["07_09"] = HexaGameOfLifeScene;
    this.cache["07_10"] = ProbaGameOfLifeScene;
    this.cache["07_11"] = ContinuousGameOfLifeScene;
    // TODO: 07_12 Image processing (p 373)
    // TODO: 07_13 Cell history
    // TODO: 07_14 CA rules in a flocking system
    // TODO: 07_15 Nestad CA
    // TODO: The Ecosystem project

    this.cache["08_01"] = RecursiveCircleScene;
    this.cache["08_03"] = KochSnowflakeScene;
    this.cache["08_05"] = SierpinskiTriangleScene;

};

SceneFactory.autoclose = function () {
    "use strict";
    document.getElementById("togglebox").checked = false;
};

SceneFactory.createScene = function (key) {
    "use strict";
    // check string
    if (typeof key !== "string") {
        throw "SceneFactory.createScene : key is not a string";
    }

    if (this.cache[key] === undefined) {
        throw "SceneFactory.createScene : specified key doesn't exists";
    }

    SceneFactory.start(new this.cache[key](this.option[key]));
};

SceneFactory.start = function (scene) {
    "use strict";
    if (scene instanceof Scene === false) {
        throw "SceneFactory.start : scene is not a Scene";
    }

    this.stop();
    this.scene = scene;
    this.requestAnimValue = window.requestAnimationFrame(scene.loop.bind(scene));
    this.autoclose();
};

SceneFactory.stop = function () {
    "use strict";
    if (this.scene !== undefined) {
        this.scene.stop();
    }
};