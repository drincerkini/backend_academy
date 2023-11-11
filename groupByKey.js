const groupByKey = (arr, key) => {
  const groupedMap = new Map();

  arr.forEach((element) => {
    const value = element[key];

    if (groupedMap.has(value)) {
      groupedMap.get(value).push(element);
    } else {
      groupedMap.set(value, [element]);
    }
  });

  return groupedMap;
};

// Test usage:
const data = [
  { id: 1, category: "A", name: "Item 1" },
  { id: 2, category: "B", name: "Item 2" },
  { id: 3, category: "A", name: "Item 3" },
  { id: 4, category: "B", name: "Item 4" },
  { id: 5, category: "C", name: "Item 5" },
];

const groupedData = groupByKey(data, "category");
console.log(groupedData);
