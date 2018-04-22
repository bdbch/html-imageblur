# `<image-blur>`

> Custom Element for adaptive, blurred images via src attributes.

![Banner](banner.jpg)

`image-blur` creates an adaptive, blurred version of an image src with full control over the blur value without using CSS3.

## Installation

`npm install --save html-imageblur`

## Usage

#### ES6:

```js
import "html-imageblur"
```

#### Via `<script>` in ES6

```js
<script src="build/image-blur.js"></script>
```

#### Via `<script>` in ES5

```js
<script src="build/image-blur.es5.js"></script>
```

When image-blur is loaded correctly, you can just use it like this:

```html
<image-blur src="https://unsplash.it/800/600" blur="20">
```

You can style the image-blur component and the canvas inside will adapt itself to your styles.

## Browser Support

This will need an update to find out what browsers are currently supporting all features

## Contribution

Feel free to send in Pull Requests. I'll take my time to look into them.
