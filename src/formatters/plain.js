import _ from 'lodash';

const inputValue = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  if (_.isString(value)) {
    return `'${value}'`;
  }
  return value;
};

const plain = (array) => {
  const iter = (node, parent = []) => {
    const result = node.map((element) => {
      const path = [...parent, element.key].join('.');
      if (element.type === 'stay same') {
        return null;
      }
      if (element.type === 'deleted') {
        return `Property '${path}' was removed`;
      }
      if (element.type === 'added') {
        return `Property '${path}' was added with value: ${inputValue(element.children)}`;
      }
      if (element.type === 'diffValue') {
        return `Property '${path}' was updated. From ${inputValue(element.children)} to ${inputValue(element.children2)}`;
      }
      if (element.type === 'parent') {
        return `${iter(element.children, [path])}`;
      }
      return (`Type: ${node.type} is undefined`);
    });
    return _.compact(result).join('\n');
  };
  return iter(array);
};

export default plain;
