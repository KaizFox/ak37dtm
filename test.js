const fs = require('fs');

fs.readFile('./list.json', 'utf-8', (err, dat) => {
  if (err) console.error(err);
  let data = JSON.parse(dat.toString());
  data.push(data.shift());
  let t;
  data[4][0] = data[0][0]; data[0][0] = '';
  data[4][1] = data[0][1]; data[0][1] = '';
  data[4][8] = data[0][8]; data[0][8] = '';
  data[4][9] = data[0][9]; data[0][9] = '';
  fs.writeFile("./list.json", JSON.stringify(data), (err) => {
    if (err) console.error(err);
    console.log("Updated successful");
  })
  // console.log(data);
});