/*global ColorExperiment*/
var Context = function () {
    "use strict";
    this.ctx = document.getElementById("canvas").getContext("2d");
    this.width = this.ctx.canvas.width = window.innerWidth;
    this.height = this.ctx.canvas.height = window.innerHeight;
};