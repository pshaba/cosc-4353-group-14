
// server/models/loginUserModel.js

//In-memory storage for demo
//will adjust once database is set up
const users = []; 

const User = {
    findUser: (email) => users.find(user => user.email === email), 
    
    addUser: (user) => {
        user.profileComplete = false; //set default value of profile complete to false
        users.push(user); 
    }, 

    isProfileComplete: (email) => {
        const user = User.findUser(email); 
        return user ? user.profileComplete : false; 
    }, 

    setProfileComplete: (email) => {
        const user = User.findUser(email); 
        if (user) {
            user.profileComplete = true; 
        }
    }, 

    __resetUsers: () => {
        users.length = 0; // Clear users for testing
    }
}; 

module.exports = User; 