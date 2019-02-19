let Network = function (scene, x, y, layers) {
  'use strict';
  // TODO colors + merge avec perceptron + nouveau param [layer1, layer2, layer3] pour le nb de neurons par couche
  if (scene instanceof Scene === false) {
    throw 'Network.ctor : scene is not a Scene';
  }
  if (typeof (x) !== 'number') {
    throw 'Network.ctor : x is not a number';
  }
  if (typeof (y) !== 'number') {
    throw 'Network.ctor : y is not a number';
  }
  if (Array.isArray(layers) === false) {
    throw 'Network.ctor : layers is not an array';
  }

  this.width = this.height = 400;
  this.cooldown = 0.2;
  this.scene = scene;
  this.layers = [];
  this.location = new Vector2(x, y);

  let middle = (layers.length - 1) / 2;
  for (let i = 0; i < layers.length; i++) {
    const xOffset = (i - middle) * (this.width / layers.length);
    this.addLayer(layers[i], xOffset);
  }
}

Network.prototype.addLayer = function (neurons, xOffset) {
  'use strict';
  if (typeof (neurons) !== 'number') {
    throw 'Network.addLayer : neurons is not a number';
  }
  if (typeof (xOffset) !== 'number') {
    throw 'Network.addLayer : xOffset is not a number';
  }

  let layer = [];
  let middle = (neurons - 1) / 2;
  for (let i = 0; i < neurons; i++) {
    const yOffset = (i - middle) * (this.height / neurons);
    // create new neuron
    let neuron = new Neuron(this.scene, xOffset, yOffset, this.cooldown);

    // connect it to previous layer
    let lastLayerIdx = this.layers.length - 1; 
    if(lastLayerIdx >= 0) {
      let lastLayer = this.layers[lastLayerIdx]
      for (let i = 0; i < lastLayer.length; i++) {
        this.connect(lastLayer[i], neuron);
      }
    }

    // add neuron to current layer
    layer.push(neuron);
  }

  // add current layer to layers list
  this.addNeurons(layer);
}

Network.prototype.addNeurons = function (neurons) {
  'use strict';
  if (Array.isArray(neurons) === false) {
    throw 'Network.addNeurons : neurons is not an array of Neurons';
  }
  this.layers.push(neurons);
}

Network.prototype.connect = function (from, to) {
  'use strict';
  if (from instanceof Neuron === false) {
    throw 'Network.connect : *from* is not a Neuron';
  }
  if (to instanceof Neuron === false) {
    throw 'Network.connect : *to* is not a Neuron';
  }
  let connection = new Connection(this.scene, from, to, Math.random(), this.cooldown);
  from.addConnection(connection);
}


Network.prototype.feedforward = function (input) {
  'use strict';
  if (typeof (input) !== 'number') {
    throw 'Network.feedforward : input is not a number';
  }
  if (this.layers.length == 0) {
    throw 'Network.feedforward : neuron list is empty';
  }

  // apply input to all the entry neurons
  let firstLayer = this.layers[0];
  for (let i = 0; i < firstLayer.length; i++) {
    firstLayer[i].feedforward(input);
  }
}

Network.prototype.display = function (ctx, delta) {
  'use strict';
  ctx.save();
  ctx.translate(this.location.x, this.location.y);
  ctx.scale(0.5, 0.5);
  ctx.fillStyle = '#dee';
  ctx.fillRect(-this.width / 2, -this.height / 2, this.width, this.height);
  for (let i = 0; i < this.layers.length; ++i) {
    let layer = this.layers[i];
    for (let i = 0; i < layer.length; i++) {
      layer[i].display(ctx, delta);
    }
  }
  ctx.restore();
}