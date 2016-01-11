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
    
    if (entityA !== null && entityB !== null) {
        entityA.startContact(entityB);
        entityB.startContact(entityA);
    }
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
    
    if (entityA !== null && entityB !== null) {
        entityA.endContact(entityB);
        entityB.endContact(entityA);
    }
};


ContactListener.prototype.PreSolve = function (contact, oldManifold) {"use strict"; };


ContactListener.prototype.PostSolve = function (contact, impulse) {"use strict"; };
