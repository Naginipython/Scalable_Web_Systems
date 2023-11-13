import fs from 'fs';

const read = () => {
  if (fs.existsSync('comments.json')) {
    const comments = fs.readFileSync('comments.json');
    return JSON.parse(comments);
  } else {
    return {};
  }
};

const write = (comments) => {
  fs.writeFileSync('comments.json', JSON.stringify(comments));
};

export default {
  read,
  write,
};
