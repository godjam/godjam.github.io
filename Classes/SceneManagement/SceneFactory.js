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
    SceneFactory.initMenu();
    SceneFactory.parseURL();
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

SceneFactory.initMenu = function () {
    'use strict';
    
    SceneFactory.initButton('00');
    SceneFactory.initButton('01');
    SceneFactory.initButton('00_01');
    SceneFactory.initButton('00_03');
    
    SceneFactory.initButton('00_04');
    SceneFactory.initButton('00_05');
    SceneFactory.initButton('00_06');
    SceneFactory.initButton('00_07');
    SceneFactory.initButton('00_09');
    SceneFactory.initButton('00_10');

    SceneFactory.initButton('01_01');
    SceneFactory.initButton('01_02');
    SceneFactory.initButton('01_03');
    SceneFactory.initButton('01_05');
    SceneFactory.initButton('01_06');
    SceneFactory.initButton('01_08');
    SceneFactory.initButton('ES_01');

    SceneFactory.initButton('02_01');
    SceneFactory.initButton('02_03');
    SceneFactory.initButton('02_04');
    SceneFactory.initButton('02_05');
    SceneFactory.initButton('02_08');
    SceneFactory.initButton('02_09');
    SceneFactory.initButton('02_10');
    SceneFactory.initButton('ES_02');

    SceneFactory.initButton('03_01');
    SceneFactory.initButton('03_02');
    SceneFactory.initButton('03_04');
    SceneFactory.initButton('03_06');
    SceneFactory.initButton('03_07');
    SceneFactory.initButton('03_08');
    SceneFactory.initButton('03_09');
    SceneFactory.initButton('03_10');
    SceneFactory.initButton('03_11');
    SceneFactory.initButton('03_12');
    SceneFactory.initButton('03_16');
    SceneFactory.initButton('ES_03');

    SceneFactory.initButton('04_02');
    SceneFactory.initButton('04_03');
    SceneFactory.initButton('04_04');
    SceneFactory.initButton('04_05');
    SceneFactory.initButton('04_06');
    SceneFactory.initButton('04_08');
    SceneFactory.initButton('04_09');
    SceneFactory.initButton('04_10');
    SceneFactory.initButton('04_11');

    SceneFactory.initButton('05_02');
    SceneFactory.initButton('05_03');
    SceneFactory.initButton('05_04');
    SceneFactory.initButton('05_05');
    SceneFactory.initButton('05_06');
    SceneFactory.initButton('05_07');
    SceneFactory.initButton('05_08');
    SceneFactory.initButton('05_09');
    SceneFactory.initButton('05_10');
    SceneFactory.initButton('05_11');
    SceneFactory.initButton('05_13');
    SceneFactory.initButton('05_14');
    SceneFactory.initButton('05_15');
    SceneFactory.initButton('05_16');

    SceneFactory.initButton('06_01');
    SceneFactory.initButton('06_02');
    SceneFactory.initButton('06_03');
    SceneFactory.initButton('06_04');
    SceneFactory.initButton('06_05');
    SceneFactory.initButton('06_07');
    SceneFactory.initButton('06_10');
    SceneFactory.initButton('06_11');
    SceneFactory.initButton('06_13');
    SceneFactory.initButton('06_14');
    SceneFactory.initButton('06_15');
    SceneFactory.initButton('06_16');
    SceneFactory.initButton('06_19');

    SceneFactory.initButton('07_01');
    SceneFactory.initButton('07_06');
    SceneFactory.initButton('07_09');
    SceneFactory.initButton('07_10');
    SceneFactory.initButton('07_11');

    SceneFactory.initButton('08_01');
    SceneFactory.initButton('08_03');
    SceneFactory.initButton('08_05');
    SceneFactory.initButton('08_10');
    SceneFactory.initButton('08_12');

    SceneFactory.initButton('09_01');
    SceneFactory.initButton('ES_09');
}

SceneFactory.parseURL = function () {
    'use strict';
    const prefered_keys = ['00_10', '02_09', '03_11', '04_03', '04_08', 
                           '05_05', '05_06', '05_10', '05_13', '05_14', 
                           '06_07', '06_11', '06_19', '07_01', '07_09',
                           '07_11', '08_03', '08_10', '08_12', '09_01',
                           'ES_09']
    let rnd_index = ~~(Math.random()*prefered_keys.length)
    let defaultKey = prefered_keys[rnd_index]; // '09_12'

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
    this.cache['09_12'] = Box2dSimScene;
    this.cache.ES_09 = EcosystemScene_09;
};

SceneFactory.autoclose = function () {
    'use strict';
    document.getElementById('togglebox').checked = true;
};

SceneFactory.initButton = function (id) {
    'use strict';
    // check string
    if (typeof id !== 'string') {
        throw 'SceneFactory.initButton : id is not a string';
    }

    if (this.cache[id] === undefined) {
        throw `SceneFactory.initButton : specified id (${id}) doesn't exists`;
    }

    let button = document.getElementById(id);
    let canvas = button.querySelector('canvas');
    
    if (button == null) {
        throw 'SceneFactory.initButton : button is null';
    }
    if (canvas instanceof HTMLCanvasElement == false) {
        throw 'SceneFactory.initButton : canvas is null';
    }
    button.onclick = (e) => SceneFactory.createScene(id)

    let params = Object.assign({}, this.options[id]);

    let sceneKey = this.cache[id];
    if (sceneKey == null) {
        throw 'SceneFactory.initButton : sceneKey is not a Scene';
    }

    let canvasManager = (params.threejs) ?
        new MiniCanvas3D(canvas, sceneKey, params):
        new MiniCanvas2D(canvas, sceneKey, params);
     
    params.key = id;
    params.canvasManager = canvasManager;

    //console.log('initButton ' +  params.key);
};


SceneFactory.createScene = function (id) {
    'use strict';
    // check string
    if (typeof id !== 'string') {
        throw 'SceneFactory.createScene : id is not a string';
    }

    if (this.cache[id] === undefined) {
        throw `SceneFactory.createScene : specified id (${id}) doesn't exists`;
    }

    let canvasID = 'canvas';
    let canvas = document.getElementById(canvasID);

    if (canvas instanceof HTMLCanvasElement == false) {
        throw 'SceneFactory.initButton : canvas is null';
    }

    let params = Object.assign({}, this.options[id]);

    let sceneKey = this.cache[id];
    if (sceneKey == null) {
        throw 'SceneFactory.createScene : sceneKey is not a Scene';
    }

    // canvasManager
    if (this.canvasManager) {
        this.canvasManager.stop();
        this.canvasManager = null;
    }
    
    this.canvasManager = (params.threejs) ?
        new MainCanvas3D(canvas, sceneKey, params) :
        new MainCanvas2D(canvas, sceneKey, params);

    params.key = id;
    params.canvasManager = this.canvasManager;

    // console.log('createScene ' + params.key);
    
    let highlighted = document.querySelectorAll('.highlight');
    Array.from(highlighted).forEach((e) => e.classList.remove('highlight'));
    let button = document.getElementById(id);
    button.scrollIntoView({behavior: "smooth", block: "center", inline: "center"});
    button.classList.add('highlight')
    button.focus()

    this.autoclose();
};