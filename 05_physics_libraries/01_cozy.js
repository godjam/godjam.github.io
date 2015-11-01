/*global Box2D, B2Vec2, Box2dEntity, requestAnimationFrame, Poly, B2World, B2DebugDraw, PolyBoundary, CurvyBoundary, Boundary, Windmill, Car, Circle, Box, Pair, Alien, B2StaticBody, B2AABB, console, ContactListener*/
//*************************************************
document.addEventListener("DOMContentLoaded", function (event) {
	"use strict";
    var ctx = document.getElementById("canvas").getContext("2d"),
        width = ctx.canvas.width = window.innerWidth,
        height = ctx.canvas.height = window.innerHeight,
        gravity = new B2Vec2(0, 10),
        world = new B2World(gravity, true),
        debugDraw = new B2DebugDraw(),
        i = 0,
        scale = 30,
        boxes = [],
        mouseClick = false,
        mouseJoint = null,
        lastLoop = new Date();
    world.SetContactListener(new ContactListener());
    boxes.push(new CurvyBoundary(width, height, world));
    //boxes.push(new PolyBoundary(width, height, world));
    //boxes.push(new Windmill(width / 2, height / 2, width, height, world));
    boxes.push(new Alien(width / 2, 0, width, height, world));
    
    /*
    debugDraw.SetSprite(ctx);
    debugDraw.SetDrawScale(30.0);
    debugDraw.SetFillAlpha(0.3);
    debugDraw.SetLineThickness(1.0);
    debugDraw.SetFlags(Box2D.Dynamics.b2DebugDraw.e_shapeBit | Box2D.Dynamics.b2DebugDraw.e_jointBit);
    world.SetDebugDraw(debugDraw);
    */
    
    function animate() {
        requestAnimationFrame(animate);
        var thisLoop = new Date(),
            delta = thisLoop - lastLoop;
        lastLoop = thisLoop;
        //console.log(delta);
        ctx.clearRect(0, 0, width, height);
        world.Step(
            1 / 60,   //frame-rate
            10,       //velocity iterations
            10       //position iterations
        );
        world.DrawDebugData();
        world.ClearForces();
        
        for (i = 0; i < boxes.length; i += 1) {
            boxes[i].display(ctx);
        }
        
        for (i = boxes.length - 1; i >= 0; i -= 1) {
            if (boxes[i] instanceof Box2dEntity) {
                if (boxes[i].isOut()) {
                    boxes[i].killBody();
                    boxes.splice(i, 1);
                }
            }
        }
    }
    
    
    function getBodyAt(x, y) {
        var position = new B2Vec2(x / scale, y / scale),
            body = null,
            inside = false,
            aabb = new B2AABB();
        aabb.lowerBound.Set(position.x - 0.001, position.y - 0.001);
        aabb.upperBound.Set(position.x + 0.001, position.y + 0.001);
        // Query the world for overlapping shapes.
        function getBodyCallback(fixture) {
            var shape = fixture.GetShape();
            if (fixture.GetBody().GetType() !== B2StaticBody) {
                body = fixture.GetBody();
                return false;
                //inside = shape.TestPoint(fixture.GetBody().GetTransform(), position);
                //if (inside) {
                //    body = fixture.GetBody();
                //    return false;
                //}
            }
            return true;
        }
        world.QueryAABB(getBodyCallback, aabb);
        return body;
    }
    
    function move(event) {
        event.preventDefault();
        if (mouseClick === false) { return; }
        
        var x = event.clientX - ctx.canvas.clientLeft,
            y = event.clientY - ctx.canvas.clientTop - 16,
            body = null,
            position = new B2Vec2(x / scale, y / scale);
        
        // if no mouse joint
        if (mouseJoint === null) {
            //body = getBodyAt(x, y);
            
            // if nothing => new creation
            if (body === null) {
                boxes.push(new Circle(x, y, width, height, world));
            } //else {
                //mouseJoint = Box2dEntity.prototype.addMouseJoint(body, world, x, y);
            //}
        // if mouse joint exists
        } else {
            mouseJoint.SetTarget(position);
        }
        
    }
    
    function mouseDown(event) {
        event.preventDefault();
        mouseClick = true;
    }

    function mouseUp(event) {
        event.preventDefault();
        mouseClick = false;
        if (mouseJoint !== null) {
            world.DestroyJoint(mouseJoint);
            mouseJoint = null;
        }
    }
    
	window.requestAnimationFrame(animate);
    
    // attach event listener to the doc
    document.addEventListener("mousedown", mouseDown.bind(this));
    document.addEventListener("mouseup", mouseUp.bind(this));
    document.addEventListener("mousemove", move.bind(this));
    document.addEventListener("touchmove", move.bind(this));
});