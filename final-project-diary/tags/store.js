import fs from 'fs';

const read = () => {
  if (fs.existsSync('tags.json')) {
    const tags = fs.readFileSync('tags.json');
    return JSON.parse(tags);
  } else {
    return {};
  }
};

const write = (tags) => {
  fs.writeFileSync('tags.json', JSON.stringify(tags));
};

export default {
  read,
  write,
};
