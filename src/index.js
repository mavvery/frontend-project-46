import { cwd } from 'node:process'; //process.cwd() получение текущего каталога
import { readFileSync } from 'node:fs'; //читает файл и возыращает содержимое
import { resolve } from 'node:path'; //path.resolve() последовательность пути в абсолютный путь 
import _ from 'lodash'; //sortBy, unik, isEqual

const getFilePath= (filepath) => resolve(cwd(), '__fixtures__', filepath);
const readFile = (path) => readFileSync(path, 'utf-8');

const parsesFile = (file) => JSON.parse(file);

const getDiffInformation = (object1, object2) => {
  const keys1 = Object.keys(object1);
  const keys2 = Object.keys(object2);
  const uniq = _.uniq([...keys1, ...keys2]);
  const sortByUniq = _.sortBy(uniq);
  const result = sortByUniq.map((key) => {
 const value1 = object1[key];
 const value2 = object2[key];
 if((value1 && value2) && (value1 !== value2)){
  return {
    type: 'changed',
    key,
    value1,
    value2
  };
 }
 if(_.isEqual(value1, value2)){
  return {
    type:'unchanged',
    key,
    value1
  };
 }
 if(!Object.hasOwn(object2, key)){
  return {
    type: 'deleted',
    key,
    value1
  };
 }
 if(!Object.hasOwn(object1, key)){
  return {
    type: 'add',
    key,
    value2
  };
 }
  })
 return result;
 };



const gendiff = (filepath1, filepath2) => {
  const file1 = readFile(getFilePath(filepath1));
  const file2 = readFile(getFilePath(filepath2));

  const InfotmationDiff = getDiffInformation(parsesFile(file1), parsesFile(file2));

  const result = InfotmationDiff.map((diff) => {
    const typeDiff = diff.type;
    switch(typeDiff){
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
  })
  return `{\n${result.join('\n')}\n}`;
};

export default gendiff;