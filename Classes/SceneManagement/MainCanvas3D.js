/*global THREE, Vector2*/
let MainCanvas3D = function (canvasID, sceneKey, options) {
    'use strict';
    this.reCreateMainCanvas();
    // init
    CanvasManager.call(this, canvasID, sceneKey, options);

    this.startScene();
};
MainCanvas3D.prototype = Object.create(CanvasManager.prototype);
MainCanvas3D.prototype.constructor = MainCanvas3D;

MainCanvas3D.prototype.resize = function () {
    'use strict';
    this.size = this.getViewportSize();

    // Threejs resize
    if (this.renderer) {
        this.renderer.setSize(this.size.x, this.size.y);
        this.camera.aspect = this.size.x / this.size.y;
        this.camera.updateProjectionMatrix();
    }

    return this.size;
};


MainCanvas3D.prototype.startScene = function () {
    'use strict';
    this.size = this.getViewportSize();

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
    this.renderer = new THREE.WebGLRenderer({
        canvas: this.canvas
    });
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

    // Threejs resize
    this.resize();

    CanvasManager.prototype.startScene.call(this);
}

MainCanvas3D.prototype.stopScene = function () {
    'use strict';
    this.renderer = null;
    this.camera = null;
    this.scene = null;
    this.reCreateMainCanvas();
    CanvasManager.prototype.stopScene.call(this);
}

MainCanvas3D.prototype.reCreateMainCanvas = function () {
    'use strict';
    let canvasID = 'canvas';
    let canvas = document.getElementById(canvasID);
    let parent = canvas.parentNode;

    // remove canvas
    canvas.remove();

    // create new
    let newCanvas = document.createElement('canvas');
    newCanvas.id = canvasID;

    parent.appendChild(newCanvas);
}