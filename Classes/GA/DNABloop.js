function DNABloop(dnaSize, options) {
  // TODO : remove copy + rename class to DNAFloat => ou directement DNA
  'use strict';
  DNA.call(this, dnaSize, options);
}
DNABloop.prototype = Object.create(DNA.prototype);
DNABloop.prototype.constructor = DNABloop;

DNABloop.prototype.copy = function () {
  let copy = new DNABloop(this.dnaSize, this.options);
  copy.genes = this.genes;
  return copy;
}

DNABloop.prototype.createGene = function () {
  'use strict';
  return Math.random();
}