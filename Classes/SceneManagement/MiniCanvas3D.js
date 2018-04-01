/*global THREE, Vector2*/
var MiniCanvas3D = function (canvasID, sceneKey, options) {
    "use strict";
    // init
    CanvasManager.call(this, canvasID, sceneKey, options);
    this.listenToevents = false;

    // size 
    this.size = this.getCanvasSize();

    // Threejs objects
    this.renderer = null;
    this.camera = null;
    this.scene = null;

    // camera attributes
    var VIEW_ANGLE = 30,
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
    if (this.renderer !== null) {
        this.renderer.setSize(this.size.x, this.size.y);
        this.camera.aspect = this.size.x / this.size.y;
        this.camera.updateProjectionMatrix();
    }
};

MiniCanvas3D.prototype = Object.create(CanvasManager.prototype);
MiniCanvas3D.prototype.constructor = MiniCanvas3D;