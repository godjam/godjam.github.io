/*global Context, FrameLoop, THREE, Vector2*/
var Scene = function (options) {
    "use strict";
    // canvas
    this.canvas = document.querySelector('canvas');
    // 2D context
    this.ctx = null;
    // Threejs
    this.renderer = null;
    this.camera = null;
    this.scene = null;
    this.mouseListener = null;
    
    // window
    window.addEventListener('resize', this.resize.bind(this));
    
    // frames
    this.frameloop = new FrameLoop();
    this.requestId = null;
    
    // init a Threejs scene
    if (options !== undefined && options.threejs === true) {
        this.initThreejsScene();
    
    // init a std 2D canvas.
    } else {
        this.init2DCanvasScene();
    }
    
    this.resize();
};

Scene.prototype.start = function () {"use strict"; };

Scene.prototype.loop = function () {
    "use strict";
    this.frameloop.update();
    this.requestId = window.requestAnimationFrame(this.loop.bind(this));
};

Scene.prototype.stop = function () {
    "use strict";
    if (this.requestId !== null) {
        window.cancelAnimationFrame(this.requestId);
        this.requestId = null;
    }
    
    if (this.resize !== null) {
        window.removeEventListener('resize', this.resize);
    }
    
    if (this.mouseListener !== null) {
        this.mouseListener.stop();
    }
};

Scene.prototype.resize = function () {
    "use strict";
    this.size = new Vector2(window.innerWidth, window.innerHeight);
    // 2D canvas scene
    if (this.canvas !== null) {
        this.canvas.width = this.size.x;
        this.canvas.height = this.size.y;
    }
    // threejs scene
    if (this.renderer !== null) {
        this.renderer.setSize(this.size.x, this.size.y);
        this.camera.aspect = this.size.x / this.size.y;
        this.camera.updateProjectionMatrix();
    }
};

Scene.prototype.init2DCanvasScene = function () {
    "use strict";
	var canvas = document.createElement('canvas'),
        container = document.querySelector('#main-container');
    
    if (this.canvas !== null) { container.removeChild(this.canvas); }
    
    this.size = new Vector2(window.innerWidth, window.innerHeight);
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.canvas.width = this.size.x;
    this.canvas.height = this.size.y;
    container.appendChild(this.canvas);
};

Scene.prototype.initThreejsScene = function () {
    "use strict";
    
    this.size = new Vector2(window.innerWidth, window.innerHeight);
    // camera attributes
    var VIEW_ANGLE = 30,
        ASPECT = this.size.x / this.size.y,
        NEAR = 0.1,
        FAR = 10000,

        // get the DOM element to attach to
        container = document.querySelector('#main-container');
    

    // create a WebGL renderer, camera
    // and a scene
    this.renderer = new THREE.WebGLRenderer(); //({ alpha: true })
    this.renderer.setClearColor(0xffffff, 1);
    this.camera =
        new THREE.PerspectiveCamera(
            VIEW_ANGLE,
            ASPECT,
            NEAR,
            FAR
        );
    this.camera.rotation.order = 'YXZ';

    this.scene = new THREE.Scene();

    // add the camera to the scene
    this.scene.add(this.camera);

    // the camera start position
    this.camera.position.y = -300;

    // start the renderer
    this.renderer.setSize(this.size.x, this.size.y);

    // attach the render-supplied DOM element
    if (this.canvas !== null) { container.removeChild(this.canvas); }
    
    // save the canvas ref
    this.canvas = this.renderer.domElement;
    container.appendChild(this.canvas);
};

Scene.prototype.setDarkScene = function () {
    "use strict";
    if (this.ctx) {
        this.ctx.canvas.style.background = "#222";
    }
};