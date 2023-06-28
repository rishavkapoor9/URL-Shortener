# URL Shortener

This project is a URL shortener application built using the MERN stack (MongoDB, Express.js, React.js, and Node.js). It provides a simple and convenient way to shorten long URLs, making them easier to share and remember. Additionally, it allows users to add notes while creating short URLs and search for specific URLs using the associated notes.

## Features

- Shorten long URLs: The application generates a unique short URL for any provided long URL.
- Custom note addition: Users can add optional notes while creating short URLs, allowing them to provide additional context or information.
- URL searching: Users can search for specific URLs using the associated notes, making it easier to locate and manage saved URLs.

## Technology Stack

The project utilizes the following technologies:

- MongoDB: A NoSQL database used to store and manage the URLs and their associated information.
- Express.js: A web application framework for Node.js, used to build the server-side API endpoints.
- React.js: A JavaScript library used to build the user interface and components.
- Node.js: A JavaScript runtime used to execute server-side code.

## Getting Started

To run this project locally, follow these steps:

1. Clone the repository:

```
git clone https://github.com/rishavkapoor9/URL-Shortener.git
```

2. Change into the project directory:

```
cd URL-Shortener
```

3. Install the dependencies for both the server and client:

```
cd server
npm install

cd ../client
npm install
```

4. Start the server:

```
cd ../server
npm run devStart
```

5. Start the client:

```
cd ../client
npm start
```

This will start the server and client applications concurrently, allowing you to access the URL shortener application at [http://localhost:3000](http://localhost:3000).

## Usage

1. Open the URL shortener application in your web browser at [http://localhost:3000](http://localhost:3000).

2. Enter a long URL in the input field and optionally add a note.

3. Click the "Generate" button to generate a unique short URL.

4. The generated short URL will be displayed along with the associated note (if provided).

5. To search for a specific URL using a note, enter the note in the search bar. The matching URLs will be displayed.

