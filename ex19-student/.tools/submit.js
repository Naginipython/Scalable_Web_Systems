import fs from 'fs';
import archiver from 'archiver';

const output = fs.createWriteStream('submission.zip');
const archive = archiver('zip');

output.on('close', function () {
  console.log(archive.pointer() + ' total bytes');
  console.log(
    'archiver has been finalized and the output file descriptor has closed.'
  );
});

archive.on('error', function (err) {
  throw err;
});

archive.pipe(output);

archive.glob('*', {
  cwd: '.',
  ignore: ['node_modules*', 'tests*', 'submit.js', '*.zip'],
});

archive.finalize();
