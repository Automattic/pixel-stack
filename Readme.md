
# pixel-stack

Interface to composite RGB/RGBA buffers together into larger buffers
representing images.

## How to use

```js
var PixelStack = require('pixel-stack');
var stack = new PixelStack;
stack.background([0,0,0]);
stack.push([255,255,255,255,255,255], 0, 0, 2, 1);
stack.push([255,255,255,255,255,255], 0, 1, 2, 1);
stack.buffer();
```

## API

### PixelStack(String type, Number width, Number height)

- `type` can be `'rgb'` or `'rgba'`. Defaults to `rgb`.
- `width` and `height` are optional. If `width` is supplied, `height`
  must be supplied as well.

### PixelStack#push(Buffer data, Number x, Number y, Number w, Number h)

- Inserts the `data` pixel buffer a the coordinates `x,y`
- `data` can be any `Array`-like datastructure (`Buffer`, `ArrayBuffer`).
- Returns the `PixelStack` instance.

### PixelStack#background(Buffer data)

- Sets the given `data` pixel buffer as background color.
- Returns the `PixelStack` instance.

### PixelStack#width()

- Returns the `width` of the stack. Useful when not specified in the
  constructor and calculated dynamically.

### PixelStack#height()

- Returns the `height` of the stack. Useful when not specified in the
  constructor and calculated dynamically.

### PixelStack#buffer()

- Returns the calculated pixel `Buffer`.

### PixelStack#destroy()

- Cleans the internal buffer.

## Credits

Inspired by the `FixedJpegStack` and `DynamicJpegStack` interfaces of
the [node-jpeg](https://github.com/pkrumins/node-jpeg) project by [@pkrumins](https://github.com/pkrumins/node-jpeg).

## Authors

- Nick Momrik ([@nickmomrik](https://github.com/nickmomrik))
- Guillermo Rauch ([@guille](https://github.com/guille))

## License

MIT – Copyright (c) 2014 Automattic, Inc.
