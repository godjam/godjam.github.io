/*global Context, FrameLoop, THREE*/
var Scene = function (options) {
    "use strict";
    // 2D context
    this.ctx = null;
    // Threejs
    this.renderer = null;
    this.camera = null;
    this.scene = null;
    
    // window
    window.addEventListener('resize', this.resize.bind(this));
    this.resize();
    this.clientLeft = 0;
    this.clientTop = 0;
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
};

Scene.prototype.resize = function () {
    "use strict";
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    // 2D canvas scene
    if (this.ctx !== null) {
        this.ctx.canvas.width = this.width;
        this.ctx.canvas.height = this.height;
        this.clientLeft = this.ctx.canvas.clientLeft;
        this.clientTop = this.ctx.canvas.clientTop;
    }
    // threejs scene
    if (this.renderer !== null) {
        this.renderer.setSize(this.width, this.height);
        this.camera.aspect = this.width / this.height;
        this.camera.updateProjectionMatrix();
    }
};


Scene.prototype.init2DCanvasScene = function () {
    "use strict";
    var canvas = document.createElement('canvas'),
        container = document.querySelector('#main-container'),
        previous = document.querySelector('canvas');
        
    this.ctx = canvas.getContext("2d");
    this.ctx.canvas.width = this.width;
    this.ctx.canvas.height = this.height;
    this.clientLeft = this.ctx.canvas.clientLeft;
    this.clientTop = this.ctx.canvas.clientTop;
    
    if (previous !== null) { container.removeChild(previous); }
    container.appendChild(canvas);
};

Scene.prototype.initThreejsScene = function () {
    "use strict";
    // camera attributes
    var VIEW_ANGLE = 30,
        ASPECT = this.width / this.height,
        NEAR = 0.1,
        FAR = 10000,

        // get the DOM element to attach to
        container = document.querySelector('#main-container'),
        canvas = document.querySelector('canvas');
    

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
    this.camera.position.z = 300;

    // start the renderer
    this.renderer.setSize(this.width, this.height);

    // attach the render-supplied DOM element
    if (canvas !== null) { container.removeChild(canvas); }
    container.appendChild(this.renderer.domElement);
};