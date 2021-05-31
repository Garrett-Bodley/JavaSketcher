<h1 align="center">👋 Welcome to JavaSketcher 👋</h1>
<p>
  <a href="https://github.com/Garrett-Bodley/JavaSketcher/blob/main/LICENSE" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-yellow.svg" />
  </a>
</p>

> JavaSketcher is a single page application that allows users to draw and save sketches. You can view other people's sketches and give them a thumbs up/down. It communicates with a Rails API backend using AJAX requests.

### ✨ [Demo](https://stoic-ride-9fda3f.netlify.app/)

## Technologies
JavaSketcher was built using
- JavaScript ES6
- Rails API 6.1
- Bulma 0.9.2

## Features
- Utilizes the HTML5 Canvas API to let users draw on the viewport using their mouse.
- Allows users to change their brush size and color.
- Canvas maintains a state log, allowing users to undo previous actions.
- Canvas dynamically resizes while maintaining the existing drawing.
- Converts the Canvas to a .jpeg that can be downloaded locally or sent to the server as a blob via AJAX
- Sketchpad class can be easily retooled for applications elsewhere.

## Install
While in the backend directory:

```sh
bundle install
rails db:migrate 
rails s
```

## Usage

While in the frontend directory:

```sh
open index.html
```

## Author

👤 **Garrett Bodley**

* Website: https://www.linkedin.com/in/garrett-bodley/
* Github: [@Garrett-Bodley](https://github.com/Garrett-Bodley)
* LinkedIn: [@garrett-bodley](https://linkedin.com/in/garrett-bodley)

## Show your support

Give a ⭐️ if this project helped you!

## 📝 License

Copyright © 2021 [Garrett Bodley](https://github.com/Garrett-Bodley).<br />
This project is [MIT](https://github.com/Garrett-Bodley/JavaSketcher/blob/main/LICENSE) licensed.

***
_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_