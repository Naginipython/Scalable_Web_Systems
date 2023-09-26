import { caesarDecrypt } from "./caesar.js";

export default (req, res, next) => {
    let word = req.body['word'];
    let { shift } = req.params || -1;
    shift = parseInt(shift);
    let path = req.path.substring(1,12);
    console.log(shift);
    if (path == "testDecrypt" && Number.isInteger(shift) && shift >= 0) {
        req.body.word = caesarDecrypt(word, shift);
        //time and date
        let d = new Date();
        req.body.date = `${d.getMonth()}/${d.getDay()}/${d.getFullYear()}`;
        req.body.time = `${d.getHours()}:${d.getMinutes()}`;
    }

    next();
}