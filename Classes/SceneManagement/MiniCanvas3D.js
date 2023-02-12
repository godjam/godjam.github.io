/*global THREE, Vector2*/
let MiniCanvas3D = function (canvas, sceneKey, options) {
    'use strict';
    // init
    CanvasManager.call(this, canvas, sceneKey, options);
    this.listenToEvents = false;
    this.fps = 30;
    this.nextInterval = 0.05;

    // size 
    this.size = this.getCanvasSize();
};

MiniCanvas3D.prototype = Object.create(CanvasManager.prototype);
MiniCanvas3D.prototype.constructor = MiniCanvas3D;

MiniCanvas3D.prototype.startScene = function() {
    'use strict';
    
    // Threejs objects
    this.renderer = null;
    this.camera = null;
    this.scene = null;

    // camera attributes
    let VIEW_ANGLE = 30,
        ASPECT = this.size.x / this.size.y,
        NEAR = 0.1,
        FAR = 10000;

    // create a WebGL renderer, camera
    // and a scene
    this.renderer = new THREE.WebGLRenderer({canvas: this.canvas});
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
    this.camera.position.y = -50;

    // Threejs resize
    if (this.renderer) {
        this.renderer.setSize(this.size.x, this.size.y);
        this.camera.aspect = this.size.x / this.size.y;
        this.camera.updateProjectionMatrix();
    }

    CanvasManager.prototype.startScene.call(this);
}

MiniCanvas3D.prototype.stopScene = function() {
    'use strict';
    CanvasManager.prototype.stopScene.call(this);
    this.renderer = null;
    this.camera = null;
    this.scene = null;
}