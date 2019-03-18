const fs = require('fs');
const ejs = require('ejs');

const data = require('./src/data');
const ejsFiles = [
  `404`,
  `index`
];

ejsFiles.forEach((filename) => {
  const html = ejs.render(fs.readFileSync(`${__dirname}/src/${filename}.ejs`, {
    encoding: 'utf-8'
  }), data);
  fs.writeFileSync(`${__dirname}/public/${filename}.html`, html, {
    encoding: 'utf-8'
  });
});