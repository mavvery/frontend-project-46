import { readFileSync } from 'node:fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import { expect, test } from '@jest/globals';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (file) => {
  const filePath = getFixturePath(file);
  const content = readFileSync(filePath, 'utf-8');
  return content;
};

const expectedJson = readFile('test1.txt').trim();
const expectedYml = readFile('test2.txt').trim();

test('test1', () => {
  expect(genDiff('filepath1.json', 'filepath2.json')).toEqual(expectedJson);
});

test('test2', () => {
  expect(genDiff('filepath1.yml', 'filepath2.yml')).toEqual(expectedYml);
});
