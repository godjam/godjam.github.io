/*global THREE, Vector2*/
var MainCanvas3D = function (isDark) {
    "use strict";

    // Threejs
    this.renderer = null;
    this.camera = null;
    this.scene = null;

    this.resize();

    // camera attributes
    var VIEW_ANGLE = 30,
        ASPECT = this.size.x / this.size.y,
        NEAR = 0.1,
        FAR = 10000;

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

    // save the canvas ref
    this.canvas = this.renderer.domElement;

    // add canvas
    let container = document.getElementById('main-container');
    container.appendChild(this.canvas);
};


MainCanvas3D.prototype.stop = function () {
    'use strict';
    // clear canvas context
    this.canvas.remove();
};

MainCanvas3D.prototype.resize = function () {
    "use strict";
    this.size = new Vector2(window.innerWidth, window.innerHeight);

    // Threejs resize
    if (this.renderer !== null) {
        this.renderer.setSize(this.size.x, this.size.y);
        this.camera.aspect = this.size.x / this.size.y;
        this.camera.updateProjectionMatrix();
    }

    return this.size;
};


MainCanvas3D.prototype.ctx = function () {
    'use strict';
    return thix.ctx;
}