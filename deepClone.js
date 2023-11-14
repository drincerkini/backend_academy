const deepClone = (obj) => {
  if (obj === null || typeof obj !== "object") {
    return obj;
  }

  const clonedObj = {};
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      clonedObj[key] = obj[key];
    }
  }

  return clonedObj;
};

// Test usage:
const originalObject = {
  a: 1,
  b: 3,
  c: 3,
};

const clonedObject = deepClone(originalObject);

console.log('original object: ');
console.log(originalObject);

console.log('Cloned object: ');
console.log(clonedObject);
console.log('Is original object and cloned object equal: ' + (originalObject === clonedObject));
