const fs = require('fs');

let files = ['file1.txt', 'file2.txt', 'file3.txt'];

for (let i = 0; i < files.length; i++) {
    fs.readFile(files[i], (err, data) => {
        if (err) {
            console.error(`Error reading files: ${err.message}`);
        } else {
            console.log(`${files[i]}: ${data}`);
        }
    });
}