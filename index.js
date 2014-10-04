module.exports = PixelStack;

function PixelStack(type, width, height){
    if (!(this instanceof PixelStack)) return new PixelStack(type, width, height);

    // config
    this._type = type || 'rgb';
    this._width = width;
    this._height = height;
    this._buffer = new Buffer(width * 3 * height);

    // Fill with black
    this.background([0, 0, 0]);
}

PixelStack.prototype.width = function(){
    return this._width;
};

PixelStack.prototype.height = function(){
    return this._height;
};

PixelStack.prototype.push = function(data, w, h, x, y){
    var buf_i = 0;

    var start = y * this.width() * 3 + x * 3;
    var buf = this.buffer();

    for (i = 0; i < h; i++) {
        for (j = 0; j < w; j++) {
            for (k = 0; k < 3; k++) {
                buf[start + i * this.width() * 3 + j * 3 + k] = data[buf_i + k];
            }

            if ('rgba' == this._type) {
                buf_i += 4;
            } else {
                buf_i += 3;
            }
        }
    }

    return this;
};

PixelStack.prototype.background = function(data){
    var i = 0;
    var buf = this.buffer();

    while (i < buf.length) {
        buf[i++] = data[0];
        buf[i++] = data[1];
        buf[i++] = data[2];
    }

    return this;
};

PixelStack.prototype.buffer = function(){
    return this._buffer;
};
