let SceneFactory = function () {
    'use strict';
    this.cache = undefined;
    this.options = undefined;
    this.canvasManager = undefined;
};

// start function 'default' scene
window.addEventListener('DOMContentLoaded', function () {
    'use strict';
    SceneFactory.init();
    SceneFactory.parseURL();
    SceneFactory.initMiniMenus();
});

SceneFactory.toggleFullscreen = function () {
    'use strict';
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

SceneFactory.initMiniMenus = function () {
    'use strict';
    
    SceneFactory.createMiniScene('00', 'c_00');
    SceneFactory.createMiniScene('01', 'c_01');
    SceneFactory.createMiniScene('00_01', 'c_00_01');
    SceneFactory.createMiniScene('00_03', 'c_00_03');
    
    SceneFactory.createMiniScene('00_04', 'c_00_04');
    SceneFactory.createMiniScene('00_05', 'c_00_05');
    SceneFactory.createMiniScene('00_06', 'c_00_06');
    SceneFactory.createMiniScene('00_07', 'c_00_07');
    SceneFactory.createMiniScene('00_09', 'c_00_09');
    SceneFactory.createMiniScene('00_10', 'c_00_10');

    SceneFactory.createMiniScene('01_01', 'c_01_01');
    SceneFactory.createMiniScene('01_02', 'c_01_02');
    SceneFactory.createMiniScene('01_03', 'c_01_03');
    SceneFactory.createMiniScene('01_05', 'c_01_05');
    SceneFactory.createMiniScene('01_06', 'c_01_06');
    SceneFactory.createMiniScene('01_08', 'c_01_08');
    SceneFactory.createMiniScene('ES_01', 'c_ES_01');

    SceneFactory.createMiniScene('02_01', 'c_02_01');
    SceneFactory.createMiniScene('02_03', 'c_02_03');
    SceneFactory.createMiniScene('02_04', 'c_02_04');
    SceneFactory.createMiniScene('02_05', 'c_02_05');
    SceneFactory.createMiniScene('02_08', 'c_02_08');
    SceneFactory.createMiniScene('02_09', 'c_02_09');
    SceneFactory.createMiniScene('02_10', 'c_02_10');
    SceneFactory.createMiniScene('ES_02', 'c_ES_02');

    SceneFactory.createMiniScene('03_01', 'c_03_01');
    SceneFactory.createMiniScene('03_02', 'c_03_02');
    SceneFactory.createMiniScene('03_04', 'c_03_04');
    SceneFactory.createMiniScene('03_06', 'c_03_06');
    SceneFactory.createMiniScene('03_07', 'c_03_07');
    SceneFactory.createMiniScene('03_08', 'c_03_08');
    SceneFactory.createMiniScene('03_09', 'c_03_09');
    SceneFactory.createMiniScene('03_10', 'c_03_10');
    SceneFactory.createMiniScene('03_11', 'c_03_11');
    SceneFactory.createMiniScene('03_12', 'c_03_12');
    SceneFactory.createMiniScene('03_16', 'c_03_16');
    SceneFactory.createMiniScene('ES_03', 'c_ES_03');

    SceneFactory.createMiniScene('04_02', 'c_04_02');
    SceneFactory.createMiniScene('04_03', 'c_04_03');
    SceneFactory.createMiniScene('04_04', 'c_04_04');
    SceneFactory.createMiniScene('04_05', 'c_04_05');
    SceneFactory.createMiniScene('04_06', 'c_04_06');
    SceneFactory.createMiniScene('04_08', 'c_04_08');
    SceneFactory.createMiniScene('04_09', 'c_04_09');
    SceneFactory.createMiniScene('04_10', 'c_04_10');
    SceneFactory.createMiniScene('04_11', 'c_04_11');

    SceneFactory.createMiniScene('05_02', 'c_05_02');
    SceneFactory.createMiniScene('05_03', 'c_05_03');
    SceneFactory.createMiniScene('05_04', 'c_05_04');
    SceneFactory.createMiniScene('05_05', 'c_05_05');
    SceneFactory.createMiniScene('05_06', 'c_05_06');
    SceneFactory.createMiniScene('05_07', 'c_05_07');
    SceneFactory.createMiniScene('05_08', 'c_05_08');
    SceneFactory.createMiniScene('05_09', 'c_05_09');
    SceneFactory.createMiniScene('05_10', 'c_05_10');
    SceneFactory.createMiniScene('05_11', 'c_05_11');
    SceneFactory.createMiniScene('05_13', 'c_05_13');
    SceneFactory.createMiniScene('05_14', 'c_05_14');
    SceneFactory.createMiniScene('05_15', 'c_05_15');
    SceneFactory.createMiniScene('05_16', 'c_05_16');

    SceneFactory.createMiniScene('06_01', 'c_06_01');
    SceneFactory.createMiniScene('06_02', 'c_06_02');
    SceneFactory.createMiniScene('06_03', 'c_06_03');
    SceneFactory.createMiniScene('06_04', 'c_06_04');
    SceneFactory.createMiniScene('06_05', 'c_06_05');
    SceneFactory.createMiniScene('06_07', 'c_06_07');
    SceneFactory.createMiniScene('06_10', 'c_06_10');
    SceneFactory.createMiniScene('06_11', 'c_06_11');
    SceneFactory.createMiniScene('06_13', 'c_06_13');
    SceneFactory.createMiniScene('06_14', 'c_06_14');
    SceneFactory.createMiniScene('06_15', 'c_06_15');
    SceneFactory.createMiniScene('06_16', 'c_06_16');
    SceneFactory.createMiniScene('06_19', 'c_06_19');

    SceneFactory.createMiniScene('07_01', 'c_07_01');
    SceneFactory.createMiniScene('07_06', 'c_07_06');
    SceneFactory.createMiniScene('07_09', 'c_07_09');
    SceneFactory.createMiniScene('07_10', 'c_07_10');
    SceneFactory.createMiniScene('07_11', 'c_07_11');

    SceneFactory.createMiniScene('08_01', 'c_08_01');
    SceneFactory.createMiniScene('08_03', 'c_08_03');
    SceneFactory.createMiniScene('08_05', 'c_08_05');
    SceneFactory.createMiniScene('08_10', 'c_08_10');
    SceneFactory.createMiniScene('08_12', 'c_08_12');

    SceneFactory.createMiniScene('09_01', 'c_09_01');
}

SceneFactory.parseURL = function () {
    'use strict';
    let defaultKey = '09_01';
    let key = '';

    if (window) {
        key = window.location.search;
        key = key.replace('?s=', '');
    }

    if (this.cache[key] === undefined) {
        key = defaultKey;
    }

    SceneFactory.createScene(key);
};

SceneFactory.init = function () {
    'use strict';
    console.log('%c Nature %c Code ', 'color: #fff; background: #ff00bb;', 'color: #fff; background: #00ffbb;');
    console.log('Made with cosmic dust');

    // Hides mobile browser's address bar when page is done loading.
    // http://www.html5rocks.com/en/mobile/mobifying/
    setTimeout( function(){ window.scrollTo(0, 1); }, 50 );

    // based on : http://eloquentjavascript.net/10_modules.html
    this.cache = Object.create(null);
    this.options = Object.create(null);

    // tests
    this.cache['00'] = CanvasTestScene;
    this.cache['01'] = ColorTestScene;
    // chap 0 : introduction
    this.cache['00_01'] = WalkerScene;
    this.options['00_01'] = {walkertype: 0};

    this.cache['00_03'] = WalkerScene;
    this.options['00_03'] = {walkertype: 1};

    this.cache['00_04'] = NormalDistribScene;

    this.cache['00_05'] = WalkerScene;
    this.options['00_05'] = {walkertype: 2};

    this.cache['00_06'] = WalkerScene;
    this.options['00_06'] = {walkertype: 3};

    this.cache['00_07'] = WalkerScene;
    this.options['00_07'] = {walkertype: 4};

    this.cache['00_09'] = PerlinNoiseScene;
    this.cache['00_10'] = NoiseScapeScene;
    this.options['00_10'] = {threejs: true};
    // chap 1 : Vector
    this.cache['01_01'] = BouncingBallScene;
    this.cache['01_02'] = VectorWalkerScene;
    this.cache['01_03'] = BouncingBall3DScene;
    this.options['01_03'] = {threejs: true};    
    this.cache['01_05'] = MoverAccelerationScene;
    this.cache['01_06'] = MoverPerlinScene;
    this.cache['01_08'] = MoverFollowScene;
    this.cache.ES_01 = EcosystemScene_01;
    // chap 2 : Forces
    this.cache['02_01'] = HeliumBalloonScene;
    this.cache['02_03'] = CenterForceScene;
    this.cache['02_04'] = FrictionForceScene;
    this.cache['02_05'] = DragForceScene;
    this.cache['02_08'] = GravitationalAttractionScene;
    this.cache['02_09'] = CustomAttractionScene;
    this.cache['02_10'] = RepulsiveMoversScene;
    this.cache.ES_02 = EcosystemScene_02;
    // chap 3 : Oscillation
    this.cache['03_01'] = RotationScene;
    this.cache['03_02'] = CannonScene;
    this.cache['03_04'] = SpiralScene;
    this.cache['03_06'] = SinusoidalOcillationScene;

    this.cache['03_07'] = OscillatorScene;
    this.options['03_07'] = {oscillatortype: 1};

    this.cache['03_08'] = OscillatorScene;
    this.options['03_08'] = {oscillatortype: 2};

    this.cache['03_09'] = OscillatorScene;
    this.options['03_09'] = {oscillatortype: 3};

    this.cache['03_10'] = OscillatorScene;
    this.options['03_10'] = {oscillatortype: 4};

    this.cache['03_11'] = OscillatorScene;
    this.options['03_11'] = {oscillatortype: 5};

    this.cache['03_12'] = OscillationScene;
    this.cache['03_16'] = SpringsScene;
    this.cache.ES_03 = EcosystemScene_03;

    // chap 4 : Particles
    this.cache['04_02'] = ParticlesScene;
    this.cache['04_03'] = ParticlesAttractorScene;
    this.cache['04_04'] = AsteroidsScene;
    this.cache['04_05'] = SystemOfSystemsScene;
    this.cache['04_06'] = ShatteringScene;
    this.cache['04_08'] = ConfettiScene;
    this.cache['04_09'] = ParticlesRepellerScene;
    this.cache['04_10'] = AttractiveParticlesScene;
    this.cache['04_11'] = BlendParticlesScene;
    this.options['04_11'] = {isDark: true};

    // chap 5 : Physics Libraries
    this.cache['05_02'] = BoxesScene;
    this.options['05_02'] = {boxes_type: 0};

    this.cache['05_03'] = BoxesScene;
    this.options['05_03'] = {boxes_type: 1};

    this.cache['05_04'] = BoxesScene;
    this.options['05_04'] = {boxes_type: 2};

    this.cache['05_05'] = BoxesScene;
    this.options['05_05'] = {boxes_type: 3};

    this.cache['05_06'] = BoxesScene;
    this.options['05_06'] = {boxes_type: 5};

    this.cache['05_07'] = BoxesScene;
    this.options['05_07'] = {boxes_type: 6};

    this.cache['05_08'] = BoxesScene;
    this.options['05_08'] = {boxes_type: 7};

    this.cache['05_09'] = BoxesScene;
    this.options['05_09'] = {boxes_type: 8};

    this.cache['05_10'] = BoxesScene;
    this.options['05_10'] = {boxes_type: 9};

    this.cache['05_11'] = CollisionListenerScene;

    this.cache['05_13'] = ToxiSimulationScene;
    this.options['05_13'] = {sim_type: 0};

    this.cache['05_14'] = ToxiSimulationScene;
    this.options['05_14'] = {sim_type: 1};

    this.cache['05_15'] = ClustersSystemScene;

    this.cache['05_16'] = ToxiSimulationScene;
    this.options['05_16'] = {sim_type: 2};

    // chap 5 : Steering Behaviors
    this.cache['06_01'] = VehiclesSystemScene;
    this.options['06_01'] = {behavior_type: 0};

    this.cache['06_02'] = VehiclesSystemScene;
    this.options['06_02'] = {behavior_type: 1};

    this.cache['06_03'] = VehiclesSystemScene;
    this.options['06_03'] = {behavior_type: 2};

    this.cache['06_04'] = VehiclesSystemScene;
    this.options['06_04'] = {behavior_type: 3};

    this.cache['06_05'] = VehiclesSystemScene;
    this.options['06_05'] = {behavior_type: 4};

    this.cache['06_07'] = VehiclesSystemScene;
    this.options['06_07'] = {behavior_type: 5};

    this.cache['06_10'] = VehiclesSystemScene;
    this.options['06_10'] = {behavior_type: 6};

    this.cache['06_11'] = VehiclesSystemScene;
    this.options['06_11'] = {behavior_type: 7};

    this.cache['06_12'] = VehiclesSystemScene;
    this.options['06_12'] = {behavior_type: 8};

    this.cache['06_13'] = VehiclesSystemScene;
    this.options['06_13'] = {behavior_type: 9};

    this.cache['06_14'] = VehiclesSystemScene;
    this.options['06_14'] = {behavior_type: 10};

    this.cache['06_15'] = VehiclesSystemScene;
    this.options['06_15'] = {behavior_type: 11};

    this.cache['06_16'] = VehiclesSystemScene;
    this.options['06_16'] = {behavior_type: 12};

    this.cache['06_17'] = VehiclesSystemScene;
    this.options['06_17'] = {behavior_type: 13};

    this.cache['06_19'] = VehiclesSystemScene;
    this.options['06_19'] = {behavior_type: 14};

    // TODO: Box2DVehicle
    // TODO: The Ecosystem project (p 343)
    this.cache['07_01'] = WolframCAScene;
    this.cache['07_06'] = GameOfLifeScene;
    this.cache['07_09'] = HexaGameOfLifeScene;
    this.cache['07_10'] = ProbaGameOfLifeScene;
    this.cache['07_11'] = ContinuousGameOfLifeScene;
    // TODO: 07_12 Image processing (p 373)
    // TODO: 07_13 Cell history
    // TODO: 07_14 CA rules in a flocking system
    // TODO: 07_15 Nestad CA
    // TODO: The Ecosystem project

    this.cache['08_01'] = RecursiveCircleScene;
    this.cache['08_03'] = KochSnowflakeScene;
    this.cache['08_05'] = SierpinskiTriangleScene;
    this.cache['08_10'] = RecursiveTreeScene;
    // TODO: 08_11 RecursiveTree + Toxiclib
    this.cache['08_12'] = LSystemScene;

    this.cache['09_01'] = RocketsScene;
};

SceneFactory.autoclose = function () {
    'use strict';
    document.getElementById('togglebox').checked = false;
};

SceneFactory.createMiniScene = function (key, canvasID) {
    'use strict';
    // check string
    if (typeof key !== 'string') {
        throw 'SceneFactory.createMiniScene : key is not a string';
    }

    if (this.cache[key] === undefined) {
        throw `SceneFactory.createMiniScene : specified key (${key}) doesn't exists`;
    }

    let params = Object.assign({}, this.options[key]);

    let sceneKey = this.cache[key];
    if (sceneKey == null) {
        throw 'SceneFactory.createMiniScene : sceneKey is not a Scene';
    }
    
    let canvasManager = (params.threejs) ?
        new MiniCanvas3D(canvasID, sceneKey, params):
        new MiniCanvas2D(canvasID, sceneKey, params);
     
    params.key = key;
    params.canvasManager = canvasManager;

    //console.log('createMiniScene ' +  params.key);
};


SceneFactory.createScene = function (key) {
    'use strict';
    let canvasID = 'canvas';

    // check string
    if (typeof key !== 'string') {
        throw 'SceneFactory.createMiniScene : key is not a string';
    }

    if (this.cache[key] === undefined) {
        throw `SceneFactory.createMiniScene : specified key (${key}) doesn't exists`;
    }

    let params = Object.assign({}, this.options[key]);

    let sceneKey = this.cache[key];
    if (sceneKey == null) {
        throw 'SceneFactory.createMiniScene : sceneKey is not a Scene';
    }

    // canvasManager
    if (this.canvasManager) {
        this.canvasManager.stop();
        this.canvasManager = null;
    }
    
    this.canvasManager = (params.threejs) ?
        new MainCanvas3D(canvasID, sceneKey, params) :
        new MainCanvas2D(canvasID, sceneKey, params);

    params.key = key;
    params.canvasManager = this.canvasManager;

    // console.log('createScene ' + params.key);
    this.autoclose();
};