/*global Scene, THREE, Color*/
var BouncingBall3DScene = function (options) {
    "use strict";
    Scene.call(this, options);
    this.intro("3D Bouncing Balls", "Touch to move camera.");
    this.renderer = this.canvasManager.renderer;
    this.camera = this.canvasManager.camera;
    this.scene = this.canvasManager.scene;

    //light
    var color = Color.createSoftColor().ToInt(),
        light = new THREE.AmbientLight(0xffffff); // soft white light
    this.scene.add(light);
    light = new THREE.HemisphereLight(0xffffbb, 0x080820, 1);
    this.scene.add(light);
    // fog
    this.renderer.setClearColor(color, 1);
    this.scene.fog = new THREE.FogExp2(color, 0.0005);
    // controls
    this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
    this.spheres = [];
    this.velocities = [];

    this.addSpheres();
};
BouncingBall3DScene.prototype = Object.create(Scene.prototype);
BouncingBall3DScene.prototype.constructor = BouncingBall3DScene;

BouncingBall3DScene.prototype.loop = function () {
    "use strict";
    var i = 0, sphere = null, velocity = null,
        size = Math.min(this.size.x, this.size.y) / 100;
    
    for (i = 0; i < this.spheres.length; i += 1) {
        sphere = this.spheres[i];
        velocity = this.velocities[i];
        sphere.position.add(velocity);
        
        if ((sphere.position.x + size > 50) || (sphere.position.x - size < -50)) {
            velocity.x *= -1;
        }
        
        if ((sphere.position.y + size > 50) || (sphere.position.y - size < -50)) {
            velocity.y *= -1;
        }
        
        if ((sphere.position.z + size > 50) || (sphere.position.z - size < -50)) {
            velocity.z *= -1;
        }
    }
    
    this.controls.update();
    
    this.renderer.render(this.scene, this.camera);
    Scene.prototype.loop.call(this);
};

BouncingBall3DScene.prototype.addSpheres = function (position) {
    "use strict";
    var i = 0, velocity = null,
        size = Math.min(this.size.x, this.size.y) / 100,
        geometry = new THREE.SphereGeometry(size, 16, 16),
        material = new THREE.MeshLambertMaterial({
            color: Color.createStrongColor().ToInt()
        }),
        mesh = null;
    
    geometry.computeLineDistances();
    for (i = 0; i < 100; i += 1) {
        
        mesh = new THREE.Mesh(geometry, material);
        mesh.position.x = Math.random() * 80 - 40;
        mesh.position.y = Math.random() * 80 - 40;
        mesh.position.z = Math.random() * 80 - 40;
        
        velocity = new THREE.Vector3(
            Math.random() * 2 - 1,
            Math.random() * 2 - 1,
            Math.random() * 2 - 1
        );
        
        this.scene.add(mesh);
        this.spheres.push(mesh);
        this.velocities.push(velocity);
    }
};