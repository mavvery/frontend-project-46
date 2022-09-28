import { cwd } from 'node:process'; // process.cwd() получение текущего каталога
import { readFileSync } from 'node:fs'; // читает файл и возыращает содержимое
import { resolve, extname } from 'node:path'; // path.resolve() последовательность пути в абсолютный путь
import _ from 'lodash'; // sortBy, unik, isEqual
import parsers from './parse.js';

const getFilePath = (filepath) => resolve(cwd(), '__fixtures__', filepath);
const readFile = (path) => readFileSync(getFilePath(path, 'utf-8'));

const getDiffInformation = (object1, object2) => {
  const keys1 = Object.keys(object1);
  const keys2 = Object.keys(object2);
  const uniq = _.uniq([...keys1, ...keys2]);
  const sortByUniq = _.sortBy(uniq);
  const result = sortByUniq.map((key) => {
    const value1 = object1[key];
    const value2 = object2[key];
    if ((value1 && value2) && (value1 !== value2)) {
      return {
        type: 'changed',
        key,
        value1,
        value2,
      };
    }
    if (_.isEqual(value1, value2)) {
      return {
        type: 'unchanged',
        key,
        value1,
      };
    }
    if (!Object.hasOwn(object2, key)) {
      return {
        type: 'deleted',
        key,
        value1,
      };
    }
    return {
      type: 'add',
      key,
      value2,
    };
  });

  return result;
};

const getFormat = (filepath) => extname(filepath).slice(1);

const gendiff = (filepath1, filepath2) => {
  const readFile1 = readFile(filepath1);
  const readFile2 = readFile(filepath2);

  const file1 = parsers(readFile1, getFormat(filepath1));
  const file2 = parsers(readFile2, getFormat(filepath2));

  const InfotmationDiff = getDiffInformation(file1, file2);

  const result = InfotmationDiff.map((diff) => {
    const typeDiff = diff.type;
    switch (typeDiff) {
      case 'changed':
        return ` - ${diff.key}: ${diff.value1}\n + ${diff.key}: ${diff.value2}`;
      case 'unchanged':
        return `   ${diff.key}: ${diff.value1}`;
      case 'deleted':
        return ` - ${diff.key}: ${diff.value1}`;
      case 'add':
        return ` + ${diff.key}: ${diff.value2}`;
      default:
        return null;
    }
  });
  return `{\n${result.join('\n')}\n}`;
};

export default gendiff;
