import { caesarDecrypt } from "./caesar.js";

export default (req, res, next) => {
    let word = req.body['word'];
    let shift = req.body['shift'];

    req.decrypt = caesarDecrypt(word, shift);
    console.log(req.decrypt);

    next();
}