// server/index.js
const fs = require('node:fs')
const express = require("express");
const PORT = 3001;
const app = express();
const path = require('path')
const cors = require('cors')


function listFilesInFolder(folderPath) {
  let fileList = [];

  // Synchronously read the contents of the directory
  const files = fs.readdirSync(folderPath);

  files.forEach(file => {
      const filePath = path.join(folderPath, file);

      // Check if it's a directory
      if (fs.statSync(filePath).isDirectory()) {
          // If it's a directory, recursively call listFilesInFolder
          fileList = fileList.concat(listFilesInFolder(filePath));
      } else {
          // If it's a file, add it to the list
          fileList.push(filePath);
      }
  });

  return fileList;
}


app.use(cors());

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

app.get(`/content`,(req,res)=>{
    console.log(req.query.path);
    const c = fs.readdirSync(`./server/content/${req.query.path}`);
    // return JSON.stringify(c)
    res.send(JSON.stringify(c))
})

app.get('/getBook/:book',(req,res)=>{
  // return JSON.stringify(c)
  const options = {
      root: path.join(__dirname,'../server/content')
  };
  // console.log(req.params.book);
  res.sendFile(req.params.book,options)
})

app.get('/searchBook/:book',(req,res)=>{
  // return JSON.stringify(c)
  // const c = fs.readdirSync('./server/content');
  const c  =listFilesInFolder('./server/content')
  let result = [];
  c.forEach((el)=>{
    if (path.basename(el).toLowerCase().includes(req.params.book.toLowerCase())) {
      result.push(path.basename(el));
    }
  })
  res.send(JSON.stringify(result))
})