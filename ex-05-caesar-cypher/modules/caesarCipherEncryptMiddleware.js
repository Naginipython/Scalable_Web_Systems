import { caesarEncrypt } from "./caesar.js";

export default (req, res, next) => {
    // let word = req.body['word'];
    // let shift = req.body['shift'];

    // req.encrypt = caesarEncrypt(word, shift);
    // console.log(req.encrypt);

    next();
}