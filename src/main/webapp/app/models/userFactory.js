/**
 * @author Juan Antonio Echeverrías Aranda (juanan.echeve@gmail.com)
 *
 */
"use strict";
var user_1 = require('./user');
/**
 * It allows to instantiate an object of the class User whith a message that
 * the server send to the client when he identifies himself.
 */
var UserFactory = (function () {
    function UserFactory() {
        console.log("% UserFactory");
    }
    UserFactory.createAnUser = function (msg) {
        return new user_1.User(msg.userName, msg.userType, msg.name);
    };
    return UserFactory;
}());
exports.UserFactory = UserFactory;
//# sourceMappingURL=userFactory.js.map