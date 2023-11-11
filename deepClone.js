const deepClone = (obj) => {
  if (obj === null || typeof obj !== "object") {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map((element) => deepClone(element));
  }

  const clonedObj = {};
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      clonedObj[key] = deepClone(obj[key]);
    }
  }

  return clonedObj;
};

// Test usage:
const originalObject = {
  a: 1,
  b: 3,
  d: 3,
};

const clonedObject = deepClone(originalObject);

console.log(clonedObject);
console.log(originalObject === clonedObject);
