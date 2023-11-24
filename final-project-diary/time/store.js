import fs from 'fs';

const read = () => {
  if (fs.existsSync('time.json')) {
    const time = fs.readFileSync('time.json');
    return JSON.parse(time);
  } else {
    return {};
  }
};

const write = (time) => {
  fs.writeFileSync('time.json', JSON.stringify(time));
};

export default {
  read,
  write,
};
