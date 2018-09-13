let path = require("path");
let glob = require("glob");
function getHtmlPath() {
    let globPath = "src/*.html";
    let filesPath = glob.sync(globPath);
    // for (let i = 0; i < filesPath.length; i++) {
    //   var filePath = filesPath[i].replace(/(.*\/)*([^.]+).*/ig, '$1');
    //   var fileName = filesPath[i].replace(/(.*\/)*([^.]+).*/ig, '$2');
    //   var fileExt = filesPath[i].replace(/.+\./, '');
    //   console.log('第'+(i+1)+'个文件，路径：'+filePath+'，文件名：'+fileName+'，后缀名：'+fileExt);
    // }
  return filesPath;
}
console.log(JSON.stringify(getHtmlPath()));

function getEntry() {
  let entryObj = {}
  getHtmlPath().forEach(item => {
    let filePath = item.replace(/(.*\/)*([^.]+).*/ig, '$1');
    let fileName = item.replace(/(.*\/)*([^.]+).*/ig, '$2');
    entryObj[fileName] = './'+filePath+'js/'+fileName+'.js';
  });
  return entryObj
}
console.log(JSON.stringify(getEntry()));

function getHtmlPlugin() {
  let HtmlPlugin = [];
  getHtmlPath().forEach(item => {
    let fileName = item.replace(/(.*\/)*([^.]+).*/ig, '$2');
    let fileExt = item.replace(/.+\./, '');
    HtmlPlugin.push(new HtmlWebpackPlugin({
      template: 'html-withimg-loader!'+item,
      minify: {
          collapseWhitespace: true
      },
      hash: true,
      filename: fileName+'.'+fileExt,
      chunks: ['common', fileName]
    }));
  });
  return HtmlPlugin;
}
