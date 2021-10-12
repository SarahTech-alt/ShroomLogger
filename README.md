# Application Name

ShroomLogger

## Description

Duration: Two week build

This application is designed for users to be able to log and track their mushroom finds. The log will contain user-inputted pictures, mushroom names, location, date and time, and any other details about their find. They will be able to view the locations on a map and click to get more information about each instance. This solves the problem of people forgetting where they found mushrooms by providing them a way to easily track their discoveries. 

## Prerequisites
Node.js
React.js
Express.js
postgresql
Material UI

## Built With
Express https://expressjs.com/en/starter/installing.html
React https://reactjs.org/
PG https://www.postgresql.org/download/
Node https://nodejs.org/en/download/
Axios https://axios-http.com/docs/intro
Material UI https://mui.com/getting-started/usage/

## Installation

1. Create a database named 'shroom_logger'
2. The queries in the data.sql file are set up to create all the necessary tables and populate the needed data to allow the application to run correctly. The project is built on Postgres, so you will need to make sure to have that installed. I recommend using Postico to run those queries as that was used to create the queries.
3. Open up your editor of choice and run an npm install
4. Run npm run server in your terminal
5. Run npm run client in your terminal
6. The npm run client command will open up a new browser for you!

## Usage

1. The user will have the option to log in or register for an account and then log in.
2. The home page will show a list of pictures from their past logs. They can click on the picture to view more details about that specific find.
3. The user can click on a map icon to view their log history on a map with pins. The pins can also be clicked to view more details about that specific find.
4. There is a table view of past logs that a user can access by clicking the list icon on the home page. Here the user can edit their log history.
5. The user can add new finds via an icon on the home screen. The information they can add includes pictures, the type of mushroom, date and time, location, and additional details they wish to add. 

## Acknowledgement

Thank you to Prime Digital Academy, all of my classmates, and my friends and family for providing the support and instruction to help make this application a reality.

## Support

If you have suggestions or issues please email me at sfuoss@gmail.com


