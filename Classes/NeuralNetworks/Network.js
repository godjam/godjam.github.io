let Network = function (scene, x, y, layers, weights) {
  'use strict';
  // TODO colors + merge avec perceptron
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

  if(weights == null) weights = [];
  if (Array.isArray(weights) === false) {
    throw 'Network.ctor : weights is not an array';
  }

  this.width = this.height = 400;
  this.cooldown = 0; //0.1;
  this.scene = scene;
  this.layers = [];
  this.location = new Vector2(x, y);

  let middle = (layers.length - 1) / 2;
  for (let i = 0; i < layers.length; i++) {
    const xOffset = (i - middle) * (this.width / layers.length);
    const w = (i == 0 || weights.length == 0) ? [] : weights[i - 1];
    this.addLayer(layers[i], xOffset, w);
  }
  // TODO save/load console.log(this.toJson())
}

Network.prototype.addLayer = function (neurons, xOffset, weights) {
  'use strict';
  if (typeof (neurons) !== 'number') {
    throw 'Network.addLayer : neurons is not a number';
  }
  if (typeof (xOffset) !== 'number') {
    throw 'Network.addLayer : xOffset is not a number';
  }  
  if(weights == null) weights = [];
  if (Array.isArray(weights) === false) {
    throw 'Network.ctor : weights is not an array';
  }

  let layer = [];
  const middle = (neurons - 1) / 2;
  const lastLayerIdx = this.layers.length - 1;
  const lastLayer = lastLayerIdx >= 0? this.layers[lastLayerIdx]: [];

  for (let i = 0; i < neurons; i++) {
    const yOffset = (i - middle) * (this.height / neurons);
    // create new neuron
    let neuron = new Neuron(this.scene, xOffset, yOffset, this.cooldown);
 
    // connect it to previous layer
    for (let l = 0; l < lastLayer.length; l++) {
      // use weight
      let w = l + i * lastLayer.length; 
      const weight = weights.length == 0? 0: weights[w];
      // console.log('create: ', lastLayer[l].id, neuron.id, weight);
      this.connect(lastLayer[l], neuron, weight);
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

Network.prototype.connect = function (from, to, weight) {
  'use strict';
  if (from instanceof Neuron === false) {
    throw 'Network.connect : *from* is not a Neuron';
  }
  if (to instanceof Neuron === false) {
    throw 'Network.connect : *to* is not a Neuron';
  }
  if (typeof weight !== "number") {
    throw 'Network.connect : *weight* is not a Number';
  }

  // console.log(from.id, to.id, weight);
  let connection = new Connection(this.scene, from, to, weight, this.cooldown);
  from.addConnection(connection);
}


Network.prototype.feedforward = function (input) {
  'use strict';
  if (Array.isArray(input) !== true) {
    throw 'Network.feedforward : input is not an array of numbers';
  }

  if (this.layers.length == 0) {
    throw 'Network.feedforward : neuron list is empty';
  }

  if (input.length !== this.layers[0].length) {
    throw 'Network.feedforward : input length is != from first layer length';
  }

  // apply input to each entry neurons
  let firstLayer = this.layers[0];
  for (let i = 0; i < firstLayer.length; i++) {
    firstLayer[i].feedforward(input[i]);
  }

  // get output of the network
  let output = [];
  let lastLayer = this.layers[this.layers.length - 1];
  for (let i = 0; i < lastLayer.length; i++) {
    output.push(lastLayer[i].sum);
  }
  return output;
}

Network.prototype.display = function (ctx, delta) {
  'use strict';
  ctx.save();
  ctx.translate(200, 100);
  ctx.scale(0.5, 0.5);
  ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
  ctx.fillRect(-this.width / 2, -this.height / 2, this.width, this.height);
  for (let i = 0; i < this.layers.length; ++i) {
    let layer = this.layers[i];
    for (let l = 0; l < layer.length; l++) {
      layer[l].display(ctx, delta);
    }
  }
  ctx.restore();
}


Network.prototype.toJson = function () {
  // TODO 
  'use strict';
  let layers = [];
  let weights = [];
  
  for (let i = 0; i < this.layers.length; ++i) {
    layers.push(this.layers[i].length);
  }

  for (let i = 0; i < this.layers.length; ++i) {
    let layer = this.layers[i];
    for (let l = 0; l < layer.length; l++) {
      let neuron = layer[l];
      for (let c = 0; c < neuron.connections.length; c++) {
        let cx = neuron.connections[c];
        // console.log('toJson: ', cx.a.id, cx.b.id, cx.weight);
        weights.push(cx.weight);
      }
    }
  }

  return {layers: layers, weights: weights}
}