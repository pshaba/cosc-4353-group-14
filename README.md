# Project Title

Group 14

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Testing](#testing)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgments](#acknowledgments)

## Features

- List the main features of your application.
- Explain what makes it unique or useful.

## Technologies Used

- **Frontend:** React, Redux, etc.
- **Backend:** Node.js, Express, etc.
- **Database:** MySQL
- **Testing:** Jest, @testing-library, etc.

## Installation

1. Clone the repository:
 
```bash
   git clone https://github.com/pshaba/cosc-4353-group-14
   cd cosc-4353-group-14

```   

## Run test

```bash

    ##One test will fail. Please run the test separately
    ##install JEST
    npm install jest supertest --save-dev
    npm install ts-jest jest @types/jest --save-dev
    npm install ts-node --save-dev
    npx jest --init ##answer yes to all questions. USE node and v8 

    npm run test

    ##volunteerHistory.test.js test will fail. Please run the volunteerHistory.test.js separately as follows
    npx jest volunteerHistory.test.js --watch

```
## Run Server
```bash
    npm run dev
    

```
## Run Client
 ```bash
    npm start
```
