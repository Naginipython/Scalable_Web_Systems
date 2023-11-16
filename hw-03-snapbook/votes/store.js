import fs from 'fs';

const read = () => {
  if (fs.existsSync('votes.json')) {
    const votes = fs.readFileSync('votes.json');
    return JSON.parse(votes);
  } else {
    return {};
  }
};

const write = (votes) => {
  fs.writeFileSync('votes.json', JSON.stringify(votes));
};

export default {
  read,
  write,
};
