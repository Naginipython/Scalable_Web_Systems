import fs from 'fs';

const read = () => {
  if (fs.existsSync('query.json')) {
    const query = fs.readFileSync('query.json');
    return JSON.parse(query);
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
