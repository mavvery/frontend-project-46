import fs from 'fs';
import { cwd } from 'node:process';
import { resolve, extname } from 'node:path';
import compareData from './compareData.js';
import parsers from './parse.js';
import buildTree from './formatters/stylish.js';
// import getFormat from './formatters/index.js';

const getFilePath = (filepath) => resolve(cwd(), '__fixtures__', filepath);
const readFile = (path) => fs.readFileSync(getFilePath(path, 'utf-8'));
const getFormat = (filepath) => extname(filepath).slice(1);

const gendiff = (filepath1, filepath2, formatName = 'stylish') => {
  const readFile1 = readFile(filepath1);
  const readFile2 = readFile(filepath2);

  const file1 = parsers(readFile1, getFormat(filepath1));
  const file2 = parsers(readFile2, getFormat(filepath2));

  const differences = compareData(file1, file2, formatName);
  return buildTree(differences);
};

export default gendiff;
