# Flatagram

Today you'll be building an app for viewing, liking, and commenting on a single picture. You will be using a local API and building out the frontend for our app, Flatagram.

## Demo

Use this gif as an example of how the app should work.

![demo gif](assets/demo.gif)

## Setup

- Fork and clone this repository
- Run `json-server --watch db.json` to get the backend started
- Open the `index.html` file on your browser

## Endpoints

Your base URL for your API will be: http://localhost:3000

The endpoints you will need are:

- GET `/image`
- PATCH `/image`

## Core Deliverables

As a user, I can:

<!-- - See the image received from the server, including its likes and comments when the page loads -->
- Click on the heart icon to increase image likes, and still see them when I reload the page
- Add a comment (no persistence needed)

## Advanced Deliverables

These deliverables are not required to pass the code challenge, but if you have the extra time, or even after the code challenge, they are a great way to stretch your skills. Consider refactoring your current code before moving on.

> Note: If you are going to attempt these advanced deliverables, please be sure to have a working commit with all the Core Deliverables first!

As a user, I can:

- Still see the comments written after reloading the page
- Downvote an image
- Delete a comment

## Rubric

### DOM Manipulation

1. Did not properly render elements to the DOM.

2. Rendered elements to the DOM, but with some errors.

3. Successfully rendered and updated the DOM as described by the Core Deliverables.

4. Structured HTML creation code cleanly and in a reusable way, using a semantically correct HTML structure without any unnecessary elements.

5. All of the above, plus completed at least one Advanced Deliverable.

### Events

1. Did not attach event listeners to respond to events.

2. Attached event listeners, but incompletely or with some errors.

3. Successfully attached event listeners to handle DOM events and met all of the Core Deliverables.

4. Structured code in a clean and reusable way, splitting functions, using descriptive names and using target properties effectively.

5. All of the above, plus completed at least one Advanced Deliverable.

### Communication with the Server

1. Unable to communicate with the server.

2. Partially able to communicate with the server, but incompletely or with some errors.

3. Able to perform a GET and a non-GET request successfully. All Core Deliverables met.

4. Code structured in a clean and reusable way, splitting into functions and reusing them where needed, with clear function and variable naming.

5. All of the above, plus completed at least one Advanced Deliverable.
