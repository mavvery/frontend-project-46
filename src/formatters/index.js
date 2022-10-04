import buildTree from './stylish.js';
import plain from './plain.js';
import jsonFormat from './json.js';

const getFormatName = (content, format) => {
  switch (format) {
    case 'stylish':
      return buildTree(content);
    case 'plain':
      return plain(content);
    case 'json':
      return jsonFormat(content);
    default:
      throw new Error(`${format} is not supported`);
  }
};
export default getFormatName;
