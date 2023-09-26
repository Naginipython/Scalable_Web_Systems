export function caesarEncrypt(word, shift) {
    let theMath = (letter) => {
        let charCode = letter.charCodeAt(0) + shift;
        return String.fromCharCode(((charCode - 97)%26) + 97);
    }
    let encoded = "";
    
    return caesar(word, theMath)
}

function caesar(word, theMath) {
    let newWord = "";
    for (let w in word) {
        let letter = word[w].toLowerCase();
        if (letter.charCodeAt(0) > 96 && letter.charCodeAt(0) < 123) {
            newWord += theMath(letter);
        } else {
            newWord += word[w];
        }
    }
    console.log(newWord);
    return newWord;
}

export function caesarDecrypt(word, shift) {
    let theMath = (letter) => {
        let charCode = letter.charCodeAt(0) - shift;
        return String.fromCharCode((((charCode+26) - 97)%26) + 97);
    }

    return caesar(word, theMath);
}

// caesarEncrypt("test this", 1);
// caesarEncrypt("test", 10);
// caesarDecrypt("uftu uijt", 1);
// caesarDecrypt("docd", 10);
// a b c d e f g h i j k l m o p q r s t u v w x y z 
//test, 10 -> docd