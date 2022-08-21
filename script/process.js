const fs = require("fs");
const path = require("path");

fs.readFile(path.join(__dirname, "/input.txt"), "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  let d = {};
  let arr = data.split("\n\n");

  let i = 0;
  arr.forEach((word) => {
    if (word.split("/")[1]) {
      d[word.split("/")[0].trim()] = {
        count: i,
        word: word.split("/")[0].trim(),
        pronunciation: word.split("/")[1].split("/")[0].trim(),
        definition: word
          .split("/")
          .slice(2, word.split("/").length)
          .join("/")
          .replace(/(\r\n|\n|\r)/gm, "")
          .trim(),
        data: word.replace(/(\r\n|\n|\r)/gm, "").trim(),
      };
      i++;
    }
  });

  fs.writeFile(
    path.join(__dirname, "/output.json"),
    JSON.stringify(d),
    function (err) {
      if (err) {
        return console.log(err);
      }
      console.log("New output saved!");
    }
  );
});
