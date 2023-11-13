import fs from 'fs';

const read = () => {
  if (fs.existsSync('posts.json')) {
    const posts = fs.readFileSync('posts.json');
    return JSON.parse(posts);
  } else {
    return {};
  }
};

const write = (posts) => {
  fs.writeFileSync('posts.json', JSON.stringify(posts));
};

export default {
  read,
  write,
};
