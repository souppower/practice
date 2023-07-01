import fs from "fs";

try {
  const data = fs.readFileSync("./pride-and-prejudice.txt", "utf-8");
  const stopWords = fs.readFileSync("./stop_words.txt", "utf-8").split(",");

  const words = data
    .split(/\s+/) // split on whitespace
    .map((w) => w.replace(/\W/g, "")) // remove non-alphanumeric
    .filter((word) => word.length > 0) // remove empty words
    .filter((word) => /[^\d]+$/.test(word)) // remove words with numbers
    .map((w) => w.toLowerCase())
    .filter((word) => !stopWords.includes(word)); // remove stop words

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
