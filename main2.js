import fs from "fs";

try {
  const data = fs.readFileSync("./pride-and-prejudice.txt", "utf-8").trim();
  const stopWords = new Set(
    fs.readFileSync("./stop_words.txt", "utf-8").split(",")
  );

  const words = [];
  let start = null;

  for (let i = 0; i < data.length; i++) {
    if (/[a-zA-Z]/.test(data[i])) {
      if (start == null) {
        start = i;
      }
    } else if (start == null) {
      continue;
    } else {
      const found = data.slice(start, i).toLowerCase();
      if (!stopWords.has(found) && found.length > 1) {
        words.push(found);
      }
      start = null;
    }
  }

  const count = {};
  for (let char of words) {
    if (count[char]) {
      count[char]++;
    } else {
      count[char] = 1;
    }
  }

  const sorted = Object.entries(count).sort((a, b) => b[1] - a[1]);
  for (const word of sorted.slice(0, 25)) {
    console.log(word[0], "-", word[1]);
  }
} catch (err) {
  console.error(err);
}
