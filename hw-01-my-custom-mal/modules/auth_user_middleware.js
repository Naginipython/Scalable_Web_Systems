import { insecureUserDatabase } from "../index.js";
import authentication from './authentication.js';
import { errLogger } from '../logger/logger.js';

export default async (req, res, next) => {
    const { user } = req.params || null;
    const userData = insecureUserDatabase.find(x => x.username == user);
    const json = req.body;
    if (json.hasOwnProperty('username') && json.hasOwnProperty('password')) {
        // Checks if username/password checks out
        const auth = await authentication(json['username'], json['password']);
        if (auth.result && json['username'] == user) {
            next();
        } else {
            const err = `${auth.reason}`;
            errLogger.error({ message: err, userData: json, path: user});
            res.status(500).send({ "Error": err });
        }
    } else {
        const err = "Username/Password required in body";
        errLogger.error({ message: err, userData: json, path: user});
        res.status(500).send({ "Error": err });
    }
}