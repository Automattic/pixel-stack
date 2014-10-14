module.exports = PixelStack;

function PixelStack(width, height, type){
  if (!(this instanceof PixelStack)) {
    return new PixelStack(type, width, height);
  }

  this._type = type || 'rgb';
  this._width = width;
  this._height = height;

  var len = 'rgba' == type ? 4 : 3;
  this._buffer = new Buffer(width * len * height);
}

PixelStack.prototype.width = function(){
  return this._width;
};

PixelStack.prototype.height = function(){
  return this._height;
};

PixelStack.prototype.push = function(data, w, h, x, y, stride){
  if (!this._filled) this.fill([0, 0, 0]);

  x = x || 0;
  y = y || 0;

  var buf_i = 0;
  var len = 'rgba' == this._type ? 4 : 3;
  stride = stride || w * len;
  var width = this.width();
  var start = y * width * len + x * len;
  var buf = this.buffer();

  for (var i = 0; i < h; i++) {
    for (var j = 0; j < w; j++) {
      for (var k = 0; k < len; k++) {
        buf[start + i * width * len + j * len + k] = data[buf_i + k];
      }
      buf_i += len;
    }
    buf_i = (i + 1) * stride;
  }

  return this;
};

PixelStack.prototype.fill = function(data){
  var buf = this._buffer;
  var i = 0;

  while (i < buf.length) {
    buf[i++] = data[0];
    buf[i++] = data[1];
    buf[i++] = data[2];
    if (4 == data.length) {
      buf[i++] = data[3];
    }
  }

  this._filled = true;

  return this;
};

PixelStack.prototype.buffer = function(){
  if (!this._filled) this.fill([0, 0, 0]);
  return this._buffer;
};
