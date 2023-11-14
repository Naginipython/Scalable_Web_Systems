import fs from 'fs';

const read = () => {
  if (fs.existsSync('query.json')) {
    return JSON.parse(fs.readFileSync('query.json', 'utf8'));
  } else {
    return {};
  }
};

const write = (query) => {
  fs.writeFileSync('query.json', JSON.stringify(query));
};

export default {
  read,
  write,
};
