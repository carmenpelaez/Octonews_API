# Octonews_API

Octonews it's a collaborative news API. Check the latest news, filtering them by date, category or both! News can be seen without sign in. If you would like to create your own news, like or dislike them, you have the opportunity to register an account.

# SET-UP

## - Module install.

Clone this repository on your PC and make sure that you have Node.js already installed.

Open a terminal on the repository folder and type the following command to install all modules. This command will install all required modules to make the API work.

```cmd
npm install
```

## - IMPORTING QUERYS

To test every endpoint available import the file "Octonews_postman.collection.json", located in the folder "data" on the Postman app.

## - .env

Rename "example.env" to ".env". Now fill every enviromental variable with what you need. For example:

```cmd
PORT=3000
MYSQL_HOST=localhost
MYSQL_USER=demo_user
MYSQL_PASSWORD=12345
MYSQL_DATABASE=example_db
UPLOADS_DIR=public/images
SECRET=secret
```

## - DATABASE (MySQL)

Create a database MySQL called the same as the enviromental variable MYSQL_DATABASE name you have chosen in your file .env.

Then import the database.sql located in the folder "data" or copy and paste the code inside it on your MYSQL workbench or terminal.

# INITIALIZATION

## - NODE

Now open a terminal in your repository and type the following:

```cmd
node server.js
```

or

```cmd
npm start
```

## - POSTMAN:

Now go to the Postman app and test the endpoints. First, test the example requests to verify that everything works correctly.

If you would like to change any value for a different one, like "category", first check the categories available on the database.

Example:

In the endpoint "getNews" try and change the route "localhost:3000/news?category=culture" for "localhost:3000/news?category=nature"

In the endpoint "addNews No Image" inside the body request, try and change the json's content values already included.
