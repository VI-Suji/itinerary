const fs = require("fs");
const matter = require("gray-matter");

function mergeAdjacentElements(arr) {
  arr.shift();
  const mergedArray = [];
  for (let i = 0; i < arr.length; i += 2) {
    const mergedObj = { ...arr[i] };
    if (i + 1 < arr.length) {
      Object.assign(mergedObj, arr[i + 1]);
    }
    mergedArray.push(mergedObj);
  }
  return mergedArray;
}

export default function createArray(parsedContent) {

  // Split the content into individual lines
  const lines = parsedContent.split("\n");

  let itineraryArray = [];
  let currentItem = {};

  lines.forEach((line) => {
    // Check if the line contains key-value pairs
    if (line.includes(":")) {
      const [key, value] = line.split(":").map((item) => item.trim());
      currentItem[key] = value;
    } else if (line.trim() === "---") {
      // If the line is '---', it indicates the end of an item
      if (Object.keys(currentItem).length !== 0) {
        itineraryArray.push(currentItem);
        currentItem = {};
      }
    } else {
      // For other lines, consider them as points
      if (currentItem.points === undefined) {
        currentItem.points = [line];
      } else {
        currentItem.points.push(line);
      }
    }
  });

  const mergedResult = mergeAdjacentElements(itineraryArray);
  return mergedResult;
}
