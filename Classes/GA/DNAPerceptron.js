function DNAPerceptron(dnaSize, options) {
  // TODO unused !
  // TODO ! VOir ex 10.1
  'use strict';
  DNA.call(this, dnaSize, options);
}
DNAPerceptron.prototype = Object.create(DNA.prototype);
DNAPerceptron.prototype.constructor = DNAPerceptron;

DNAPerceptron.prototype.copy = function () {
  let copy = new DNAPerceptron(this.dnaSize, this.options);
  copy.genes = this.genes;
  return copy;
}

DNAPerceptron.prototype.createGene = function () {
  'use strict';
  return Math.random();
}