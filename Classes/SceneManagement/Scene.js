/*global FrameLoop, Vector2*/
let Scene = function (options) {
    'use strict';
    console.log('scene ctor');

    // 2D context
    this.canvasManager = options.canvasManager;
    this.canvas = this.canvasManager.canvas;
    this.ctx = this.canvasManager.ctx; 
    this.listenToevents = this.canvasManager.listenToevents; 
    
    this.eventListeners = [];
    this.timeoutList = [];

    // resize
    if(this.listenToevents != false)
        addEventListener('resize', this.resize.bind(this));

    // frames
    this.frameloop = new FrameLoop();
    this.requestId = null;

    this.resize();
};

Scene.prototype.addListener = function (listener) {
    if (this.listenToEvents) {
        this.eventListeners.push(listener)
    }
}

Scene.prototype.update = function () {
    'use strict';
    if (this.canvasManager.isVisible) {
        
        let i = 0;
        let time = this.frameloop.update();
        
        for (i = 0; i < this.eventListeners.length; i += 1) {
            if (this.listenToevents != false && this.eventListeners[i].update) {
                this.eventListeners[i].update();
            }
            if (this.eventListeners[i].display) {
                this.eventListeners[i].display(this.ctx);
            }
        }

        this.loop();
    }

    this.requestId = window.requestAnimationFrame(this.update.bind(this));
};

Scene.prototype.start = function() {
    console.log('scene start');
    window.requestAnimationFrame(this.update.bind(this));
}

Scene.prototype.loop = function () {
    'use strict';
};

Scene.prototype.stop = function () {
    'use strict';
    console.log('scene stop');
    let i = 0;

    if (this.requestId !== null) {
        window.cancelAnimationFrame(this.requestId);
        this.requestId = null;
    }

    if (this.resize !== null) {
        window.removeEventListener('resize', this.resize);
    }

    for (i = 0; i < this.eventListeners.length; i += 1) {
        if (this.eventListeners[i] !== null) {
            this.eventListeners[i].stop();
        }
    }

    for (i = 0; i < this.timeoutList.length; i += 1) {
        if (this.timeoutList[i] !== null) {
            window.clearTimeout(this.timeoutList[i]);
        }
    }

};

Scene.prototype.resize = function () {
    'use strict';
    window.scrollTo(0, 0);

    this.size = this.canvasManager.resize();

    /*
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
    */
};

/*
Scene.prototype.init2DCanvasScene = function() {
    'use strict';
    let canvas = document.createElement('canvas'),
        container = document.getElementById('main-container');

    if (this.canvas && container) {
        if (container.contains(this.canvas))
            container.removeChild(this.canvas);
    }

// TODO : reinitSize()
//this.size = new Vector2(window.innerWidth, window.innerHeight);
this.ctx = this.canvas.getContext('2d');
this.canvas = canvas;
this.canvas.width = this.size.x;
this.canvas.height = this.size.y;
//container.appendChild(this.canvas);
};
*/
/*
Scene.prototype.initThreejsScene = function() {
    'use strict';

    this.size = new Vector2(window.innerWidth, window.innerHeight);
    // camera attributes
    let VIEW_ANGLE = 30,
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
    if (this.canvas !== null) {
        container.removeChild(this.canvas);
    }

    // save the canvas ref
    this.canvas = this.renderer.domElement;
    container.appendChild(this.canvas);
};
*/
/*
Scene.prototype.setDarkScene = function() {
    'use strict';
    if (this.ctx) {
        this.ctx.canvas.style.background = '#222';
    }
};
*/

Scene.prototype.vibrate = function (t) {
    'use strict';
    if ('vibrate' in navigator) {
        navigator.vibrate(t);
    }
};

Scene.prototype.intro = function (title, desc) {
    'use strict';
    // from https://css-tricks.com/restart-css-animation/
    let intro = document.getElementById('intro'),
        clone = null,
        text = '';
    if (intro) {
        if (title) {
            text = '<h3>' + title + '</h3>';
        }
        if (desc) {
            text += '<br>' + desc;
        }
        intro.innerHTML = text;
        clone = intro.cloneNode(true);
        intro.parentNode.replaceChild(clone, intro);
    }
};

/**
 * Adapted from https://developer.mozilla.org/en-US/docs/Web/API/WindowTimers/setTimeout
 */
Scene.prototype.addUpdatCallback = function (owner, callback, timeout) {
    'use strict';
    if (owner !== undefined && callback instanceof Function) {
        let args = Array.prototype.slice.call(arguments, 3);
        this.timeoutList.push(window.setInterval(callback.bind(owner), timeout));
    }
};