const fs = require('fs');

let files = ['file1.txt', 'file2.txt', 'file3.txt'];

fs.readFile(files[0], 'utf8', (err, data) => {
    if (err) {
      console.error(`Error reading file: ${err.message}`);
    } else {
      console.log(`Contents of ${files[0]}:\n`);
      console.log(data);
    }
  });