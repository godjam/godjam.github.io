let Trainer = function (x, y, a) {
  'use strict';
  this.inputs = [];
  this.target;
  
  this.inputs.push(x, y, 1);
  this.target = a;
}