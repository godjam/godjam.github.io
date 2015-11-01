/*global Box2D*/
var B2ContactListener = Box2D.Dynamics.b2ContactListener;

var ContactListener = function () {
    "use strict";
    B2ContactListener.call(this);
};
ContactListener.prototype = Object.create(B2ContactListener.prototype);
ContactListener.prototype.constructor = ContactListener;


ContactListener.prototype.BeginContact = function (contact) {
    "use strict";
    
    var fixtureA = null, fixtureB = null, bodyA = null, bodyB = null, entityA = null, entityB = null;
    
    fixtureA = contact.GetFixtureA();
    fixtureB = contact.GetFixtureB();
    
    if (fixtureA !== null) { bodyA = fixtureA.GetBody(); }
    if (fixtureB !== null) { bodyB = fixtureB.GetBody(); }
    
    entityA = bodyA.GetUserData();
    entityB = bodyB.GetUserData();
    
    if (entityA !== null) { entityA.fillStyle = "#dd22aa"; }
    if (entityB !== null) { entityB.fillStyle = "#dd22aa"; }
    
    // useless: only a method prototype
    // B2ContactListener.prototype.BeginContact.call(this, contact);
};


ContactListener.prototype.EndContact = function (contact) {
    "use strict";
    
    var fixtureA = null, fixtureB = null, bodyA = null, bodyB = null, entityA = null, entityB = null;
    
    fixtureA = contact.GetFixtureA();
    fixtureB = contact.GetFixtureB();
    
    if (fixtureA !== null) { bodyA = fixtureA.GetBody(); }
    if (fixtureB !== null) { bodyB = fixtureB.GetBody(); }
    
    entityA = bodyA.GetUserData();
    entityB = bodyB.GetUserData();
    
    if (entityA !== null) { entityA.fillStyle = "#ccc"; }
    if (entityB !== null) { entityB.fillStyle = "#ccc"; }
    // useless: only a method prototype
    // B2ContactListener.prototype.EndContact.call(this, contact);
};


ContactListener.prototype.PreSolve = function (contact, oldManifold) {"use strict"; };


ContactListener.prototype.PostSolve = function (contact, impulse) {"use strict"; };
