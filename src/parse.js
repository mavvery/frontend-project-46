import { load } from 'js-yaml';

const parsers = (content, format) => {
  switch (format) {
    case 'json':
      return JSON.parse(content);
    case 'yml':
    case 'yaml':
      return load(content);
    default:
      throw new Error(`${format} is not supported`);
  }
};

export default parsers;
