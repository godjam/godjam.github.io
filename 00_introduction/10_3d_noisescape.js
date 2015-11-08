/*global Scene, toxi, THREE, MouseEvtListener, Color*/
//  https://github.com/lukas2/threejs_landscape/blob/master/js/app.js
var NoiseScapeScene = function () {
    "use strict";
    Scene.call(this, {threejs : true});
    this.mouseListener = new MouseEvtListener(this.clientLeft, this.clientTop, this, this.mouseEvent);
    this.t = 0;
    this.dx = -0.001;
    this.dy = 0;
    this.res = 20;
    
    var size = Math.min(this.width, this.height) / 4,
        geometry = new THREE.PlaneGeometry(size, size, this.res, this.res),
        material = new THREE.MeshNormalMaterial({
            side: THREE.DoubleSide
        }),
        pointLight = null;

    // create a point light
    pointLight = new THREE.PointLight(0xFFFFFF);
    pointLight.position.set(10, 50, 130);
    this.scene.add(pointLight);
    
    this.plane = new THREE.Mesh(geometry, material);
    this.plane.geometry.dynamic = true;

    this.scene.add(this.plane);
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
        this.plane.geometry.vertices[i].z = h * 50;
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
    this.plane.rotation.x += this.dx;
    this.plane.rotation.y += this.dy;
    this.renderer.render(this.scene, this.camera);
    this.t += 0.001;
    
    Scene.prototype.loop.call(this);
};

NoiseScapeScene.prototype.mouseEvent = function (position) {
    "use strict";
    
    var x = (position.x - this.width / 2) / (this.width / 2),
        y = (position.y - this.height / 2) / (this.height / 2);
    
    this.dx = y / 100;
    this.dy = x / 100;
};
