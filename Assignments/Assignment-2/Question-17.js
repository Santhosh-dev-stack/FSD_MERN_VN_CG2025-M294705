// 17.Write a function downloadFile(filename, callback) that prints
// "Downloading [filename]..." after 2 seconds, then uses a callback to print
// "Download complete!".

function downloadFile(filename,callback){
  console.log(`Downloading ${filename}`);

  setTimeout(()=>{
     callback()
  },2000)
}

function callBack(){
  console.log("Download complete");
  
}

downloadFile("Sandy.txt",callBack)