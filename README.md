# JavaSketcher
JavaSketcher is a single page application that allows users to draw and save sketches. You can also view other people's sketches and give the a thumbs up/down. It communicates with a Rails API backend using AJAX requests.

## Technologies
JavaSketcher was built using
- JavaScript ES6
- Rails API 6.1
- Bulma 0.9.2

## Setup
Upon download navigate to the `/backend` directory and run `bundle install` to install the necessary gems. Run `rails db:migrate` to set up the database. From there the server can be hosted locally using `rails s`.

To view the page locally first start the server using `rails s` while inside the `/backend` directory. Then navigate to the `/frontend` directory and enter `open index.html`.

## Features
- Utilizes the HTML5 Canvas API to let users draw on the viewport using their mouse.
- Allows users to change their brush size and color.
- Canvas maintains a state log, allowing users to undo previous actions.
- Canvas dynamically resizes while maintaining the existing drawing.
- Converts the Canvas to a .jpeg that can be downloaded locally or sent to the server as a blob via AJAX
- Sketchpad class can be easily retooled for applications elsewhere.