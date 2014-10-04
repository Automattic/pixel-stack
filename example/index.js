
var PixelStack = require('..');
var picha = require('picha');
var fs = require('fs');
var join = require('path').join;
var exec = require('child_process').exec;

var red = fs.readFileSync(join(__dirname, 'red.jpg')); // 200x144
var yel = fs.readFileSync(join(__dirname, 'yel.jpg')); // 200x144

red = picha.decodeJpegSync(red).data;
yel = picha.decodeJpegSync(yel).data;

var stack = new PixelStack(400, 288);
stack.fill([255,255,255]);
stack.push(red, 200, 144);
stack.push(yel, 200, 144, 200, 0);
stack.push(yel, 200, 144, 0, 144);
stack.push(red, 200, 144, 200, 144);

var out = join(__dirname, 'out.jpg');
var image = new picha.Image({
  width: 400,
  height: 288,
  data: stack.buffer(),
  pixel: 'rgb'
});
fs.writeFile(out, picha.encodeJpegSync(image));
exec('open ' + out, function(err){
  if (err) return console.log('JPG written to "%s"', out);
});
