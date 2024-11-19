// server/models/loginUserModel.js

//In-memory storage for demo
//will adjust once database is set up
//const users = []; //removed now that database has been implementeed//Database Implemented 

require('dotenv').config(); //load environment variables
const db = require("../database"); // Use require instead of import -- database.js

const User = {
    findUser: async (email) => { //made async when database implemented
        //users.find(user => user.email === email) // demo removed now that database has been implemented

        try {
            const [rows] = await db.query('SELECT * FROM userCredentials WHERE email = ?', [email]);
            return rows[0];
        } catch (error) {
            console.error('Database query error:', error);
            throw error; 
        }
        
    }, 
    
    addUser: async (user) => { //made async when database implemented
        //user.profileComplete = false; //set default value of profile complete to false
        //users.push(user); 

        //database implemntation
        try {
            const {email, password} = user; 
            await db.query('INSERT INTO userCredentials (email, password) VALUES (?, ?)', [email, password]); 
        } catch (error) {
            console.error('Database query error:', error);
            throw error;
        }
    }, 

    isProfileComplete: async (email) => { //made async when database implemented
        const user = await User.findUser(email); //added await when database implemnted, everything else stayed same
        if (!user) {
            return false; 
        }

        console.log("Is profile complete? ", user.profileComplete); // 0 for not; 1 for true
        return user.profileComplete === 1; 
        //return user.profileComplete ? user : 0;
    }, 

    setProfileComplete: async (user_id) => { //made async when database implemented
        /*const user = User.findUser(email); 
        if (user) {
            user.profileComplete = true; 
        }*/

        await db.query('UPDATE userCredentials SET profileComplete = ? WHERE id = ?', [1, user_id]); 
    }, 

    __resetUsers: async () => { //made async when database implemented
        //users.length = 0; // Clear users for testing -- used during demo replaced once database implemented

        await db.query('DELETE FROM usersCredentials'); 
    }
}; 

module.exports = User; 
