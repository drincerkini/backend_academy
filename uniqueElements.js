// --> One line
const uniqueElementsOneLine = (arr1, arr2) => {
  return [...new Set([...arr1, ...arr2])];
};

const uniqueElements = (arr1, arr2) => {
  const set = new Set();

  for (const e of arr1) {
    set.add(e);
  }

  for (const e of arr2) {
    set.add(e);
  }

  const convertSetToArray = [...set];

  return convertSetToArray;
};

// Test usage:
const array1 = [1, 2, 3, 4];
const array2 = [3, 4, 5, 6];
//   const result = uniqueElementsOneLine(array1, array2);

const result = uniqueElements(array1, array2);

console.log(result);
