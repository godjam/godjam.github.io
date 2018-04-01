/*global Scene, toxi, THREE*/
//  https://github.com/lukas2/threejs_landscape/blob/master/js/app.js
var NoiseScapeScene = function (options) {
    "use strict";
    Scene.call(this, options);
    this.intro("Noise Scape", "3D plot of Perlin noise.<br>Evolve with time.");
    
    this.renderer = this.canvasManager.renderer;
    this.camera = this.canvasManager.camera;
    this.scene = this.canvasManager.scene;

    this.t = 0;
    this.dx = -0.001;
    this.dy = 0;
    this.res = 20;

    let size = Math.min(this.size.x, this.size.y) / 4,
        geometry = new THREE.PlaneGeometry(size, size, this.res, this.res),
        material = new THREE.MeshNormalMaterial({
            side: THREE.DoubleSide
        });

    // create a point light 
    let pointLight = new THREE.PointLight(0xFFFFFF);
    pointLight.position.set(10, 50, 130);
    this.scene.add(pointLight);

    this.plane = new THREE.Mesh(geometry, material);
    this.plane.geometry.dynamic = true;

    this.scene.add(this.plane);

    // controls
    this.controls = (this.canvas) ? 
        new THREE.OrbitControls(this.camera, this.canvas):
     null
};
NoiseScapeScene.prototype = Object.create(Scene.prototype);
NoiseScapeScene.prototype.constructor = NoiseScapeScene;

NoiseScapeScene.prototype.updateGeometry = function () {
    "use strict";
    var i = 0, l = 0, h = 0,
        heights = this.getHeightMap();

    // keep in mind, that the plane has more vertices than segments. If there's one segment, there's two vertices, if
    // there's 10 segments, there's 11 vertices, and so forth.
    // The simplest is, if like here you have 100 segments, the image to have 101 pixels. You don't have to worry about
    // "skewing the landscape" then..

    // to check uncomment the next line, numbers should be equal
    //console.log("length: " + heights.length + ", vertices length: " + geometry.vertices.length);
    for (i = 0, l = this.plane.geometry.vertices.length; i < l; i += 1) {
        h = heights[i];
        this.plane.geometry.vertices[i].z = h * 30;
    }
    // changes to the vertices
    this.plane.geometry.verticesNeedUpdate = true;

    // changes to the normals
    this.plane.geometry.normalsNeedUpdate = true;
    this.plane.geometry.computeFaceNormals();
    this.plane.geometry.computeVertexNormals();
};


NoiseScapeScene.prototype.getHeightMap = function () {
    "use strict";
    var i = 0, j = 0, heights = [], count = this.res + 1,
        perlin = toxi.math.noise.simplexNoise;

    for (i = 0; i < count; i += 1) {
        for (j = 0; j < count; j += 1) {
            heights.push(perlin.noise(i / count, j / count, this.t));
        }
    }
    return heights;
};


NoiseScapeScene.prototype.loop = function () {
    "use strict";
    this.updateGeometry();
    this.renderer.render(this.scene, this.camera);
    
    if(this.controls)
        this.controls.update();
    
    this.t += 0.001;
    Scene.prototype.loop.call(this);
};

/*
NoiseScapeScene.prototype.mouseEvent = function (position) {
    "use strict";

    var x = (position.x - this.size.x / 2) / (this.size.x / 2),
        y = (position.y - this.size.y / 2) / (this.size.y / 2);

    this.dx = y / 100;
    this.dy = x / 100;
};
*/