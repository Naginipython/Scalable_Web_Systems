import { writeFile } from 'fs/promises';

const resultOutput = `
<h2>Feedback</h2>
<p>Nice job on submitting your work. This exercise is a <strong>beta</strong> assignment. We are looking at how to move our assignments to Gradescope and what testing looks like for some of these assignments.</p>

<h2>Scoring</h2>
<p>The scoring for this exerise is simple: you get a 100% if you submit this assignment with the proper file: index.html. In the future we intend on doing additional checks, but this is the first stage in trying things out!</p>
`;

const tests = [];

function fileExists(file) {
  try {
    const indexJS = require(`/autograder/source/${file} `);
    return true;
  } catch (err) {
    return false;
  }
}

function testFileExists(file, name, output, output_fail) {
  if (fileExists(file)) {
    tests.push({
      name: name,
      score: 50,
      max_score: 50,
      output: output,
      output_format: 'html',
      visibility: 'visible',
    });
  } else {
    tests.push({
      name: name,
      score: 0,
      max_score: 50,
      output: output_fail,
      output_format: 'html',
      visibility: 'visible',
    });
  }
}

testFileExists(
  'index.js',
  'Testing if index.js exists',
  '<p>Your <code>index.js</code> file exists! Nice work!</p>',
  '<p>Your <code>index.js</code> file <strong>does not exists</strong>!</p>'
);

testFileExists(
  'Dockerfile',
  'Testing if Dockerfile exists',
  '<p>Your <code>Dockerfile</code> file exists! Nice work!</p>',
  '<p>Your <code>Dockerfile</code> file <strong>does not exists</strong>!</p>'
);

console.log(tests);

const results = {
  output_format: 'html',
  output: resultOutput,
  tests: tests,
};

try {
  console.log('Writing results to /autograder/results/results.json');
  console.log(JSON.stringify(results, null, 2));
  await writeFile('/autograder/results/results.json', JSON.stringify(results));
} catch (err) {
  console.log(err);
}
