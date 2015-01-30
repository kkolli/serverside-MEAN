# serverside-MEAN - Krishna Kolli

This is a simple file that introduces the server-side MEAN stack. It uses Mongoose to simplify the interaction with Mongo-DB. 

## Disclaimer
It currently doesn't use Module exports to clean up the code. Using MVC pattern makes it manageable and alot easier to read. My intention with this file is more of a reference guide to write server side code.

### What is happening?
In this example, we are creating a simple serverside implementation for a blog. One can GET, POST, UPDATE, DELETE on both posts and comments of those posts. All calls are being passed as JSON.

### Routes for Post's
GET /post <br/>
POST /post <br/>
PUT /post/:id <br/>
DELETE /post/:id <br/>

### Routes for Comments
GET /post/:id/comment <br/>
POST /post/:id/comment <br/>
PUT/post/:id/comment/:Cid <br/>
DELETE /post/:id/comment/:Cid <br/>

### Sample CURL Commands
  curl -X POST http://localhost:3000/post -d "Name=MyLife"
  curl -X POST http://localhost:3000/post/5454cbca2853abdcb60196f59f/comment -d "Name=MyFav"
  curl -X PUT http://localhost:3000/post/54cbca2853abdcb60196f59f -d "Name=MyLife2"
  curl -H "Content-Type: application/json" http://localhost:3000/post





