import bcrypt from 'bcrypt';
import { insecureUserDatabase } from "../index.js";
import authentication from './authentication.js';

export default async (req, res, next) => {
    const { user } = req.params || null;
    const userData = insecureUserDatabase.find(x => x.username == user);
    //First checks if a user is public. If it is, there is no problems.
    if (!userData.public) {
        //If it isn't then I need to make sure the request contains a user's login data
        const json = req.body;
        if (json.hasOwnProperty('username') && json.hasOwnProperty('password')) {
            // Checks if username/password checks out
            const auth = await authentication(json['username'], json['password']);
            if (auth.result) {
                next();
            } else {
                // throw new Error("ERROR: Password incorrect");
                res.status(500).send(`ERROR: ${auth.reason}`);
            }
        } else {
            // throw new Error("ERROR: User is not public. Please GET with a username & password json body");
            res.status(500).send("ERROR: User is not public. Please GET with a username & password json body");
        }
    } else {
        next();
    }
}