PERSONAL HOBBY PROJECT
=================================
Frontend link: http://localhost:4200

Login user: 
================================
|User           |    Password   |
================================
| jim           |123            |
--------------------------------
| jill          |123            |
--------------------------------
| abedur        |123            |
================================


To start the backend application 
npm run startBackend

To start the frontend application
npm run startFrontend

To start both application
npm run start
Or
npm start


ACCESSING THE BACKEND APIs
================================
http://localhost:3000/api/

TO COUNT TOTAL NUMBER OF RECORD WITH SEARCH STRING
http://localhost:3000/api/movie/count?search=[Your search string]  GET

TO SEE ALL MOVIE LIST
http://localhost:3000/api/movie GET

TO SEE MOVIES OFFSET COUNT AND SEARCH STRING
http://localhost:3000/api/movie/search POST
Payload:   {"title": "Pa"}
 
TO ADD MOVIE
http://localhost:3000/api/movie POST

GET BY ID
http://localhost:3000/api/movie/[movieId] POST
TO DELETE
http://localhost:3000/api/movie/[movieId] DELETE

TO FULL UPDATE
http://localhost:3000/api/movie/[movieId] PUT

TO PARTIAL UPDATE
http://localhost:3000/api/movie/[movieId] PATCH


TO SEE ACTORS OF A MOVIE
http://localhost:3000/api/movie/[movieId]/actors GET

TO SEE ACTOR OF A MOVIE
http://localhost:8080/api/movie/[movieId]/actor/[actorId] GET

TO DELETE ACTOR
http://localhost:8080/api/movie/[movieId]/actor/[actorId] DELETE


