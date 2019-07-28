function DNAText(dnaSize, options) {
  // TODO : remove copy + rename class to DNAFloat
  'use strict';
  DNA.call(this, dnaSize, options);
}
DNAText.prototype = Object.create(DNA.prototype);
DNAText.prototype.constructor = DNAText;

DNAText.prototype.copy = function () {
  // use the right constructor
  let copy = new DNAText(this.dnaSize, this.options);
  copy.genes = this.genes;
  return copy;
}

DNAText.prototype.createGene = function () {
  'use strict';
  return Tools.rnd(32, 128);
}

DNAText.prototype.computeFitness = function (target) {
  'use strict';
  let score = 0;
  for (let i = 0; i < this.genes.length; ++i) {
      if (this.genes[i] === target.charCodeAt(i)) {
          score++;
      }
  }
  let fit = score / target.length;
  this.fitness = fit * fit;
}

DNAText.prototype.decode = function () {
  let str = '';
  for (let k = 0; k < this.genes.length; ++k) {
      let g = this.genes[k];
      str += String.fromCharCode(g);
  }
  return str;
}