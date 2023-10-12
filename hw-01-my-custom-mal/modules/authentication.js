import bcrypt from 'bcrypt';
import { insecureUserDatabase } from "../index.js";

// Takes a username and password, returns either {result, reason} or {result}
export default async function authentication(username, password) {
    const userData = insecureUserDatabase.find(x => x.username == username);
    if (userData != undefined) {
        const hash = userData.hash;
        let result = await bcrypt.compare(password, hash);
        return result? {result: result} : {result: result, reason: "Password incorrect"};
    } else {
        return {result: false, reason: "Username not in database"};
    }
}