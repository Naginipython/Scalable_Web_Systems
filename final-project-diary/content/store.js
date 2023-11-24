import fs from 'fs';

const read = () => {
  if (fs.existsSync('content.json')) {
    const content = fs.readFileSync('content.json');
    return JSON.parse(content);
  } else {
    return {};
  }
};

const write = (content) => {
  fs.writeFileSync('content.json', JSON.stringify(content));
};

export default {
  read,
  write,
};
