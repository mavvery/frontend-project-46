import buildTree from './stylish.js';
import plain from './plain.js';

const getFormatName = (content, format) => {
  switch (format) {
    case 'stylish':
      return buildTree(content);
    case 'plain':
      return plain(content);
    default:
      throw new Error(`${format} is not supported`);
  }
};
export default getFormatName;
