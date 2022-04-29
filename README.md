# Octonews_API

Octonews it's a collaborative news API. Check the last news, filtering them by date, category or both! News can be seen without loging. If you would like to upload ur own news, like or dislike them you have the opportunity to sign in.

# SET-UP

## - Module install.

Clone this repository on ur PC and make sure that u have npm and node installed.

Open a linux terminal on and type the following command to install all modules. This command will install all required modules to make the API work.

```cmd
npm install
```

## - IMPORTING QUERYS

To test every endpoint available export the file "Octonews_postman.collection.json", located in the folder "data" to a Postman client.

## - .env

Rename "example.env" to ".env". Now fill every global var with what you need. For example:

´´´cmd
PORT=3000
PUBLIC_HOST=http://localhost:3000
MYSQL_HOST=localhost
MYSQL_USER=demo_user
MYSQL_PASSWORD=12345
MYSQL_DATABASE=example_db
UPLOADS_DIR=public/images
SECRET=secret
´´´

## - DATABASE

Copy the script locate in the folder "XXX" y paste it into a database called the same as the global var MYSQL_DATABASE in your file .env

# INITIALIZATION

## - NODE

Now open a Node terminal and type the following:

```cmd
node server.js
```

## - POSTMAN:

Now go to the Postman app and test the querys. First make the example inquiries to verify that everything works correctly.

If u would like to change any value for a different one, like "category", firstly check the categories avalaivable on the database.

For example:

In the endpoint "getNews"> try and change the route "localhost:3000/news?category=cultura" for "localhost:3000/news?category=nature"

In the endpoint "addNews No Image"> inside the body, try and change the content of the property of the object already included.
