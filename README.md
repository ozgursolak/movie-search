# Movie Search 

In this project, I have created a small project to list movies from **omdbapi**.

This project consists of 2 different parts. In the client side, I have used **React** framework with **Redux** library. On the other hand, in the api side, 
I have used **Node** with **Typescript**. 

## Important For Setup: 

* After cloning repository and changing directory to the root of that project, you can run the project via this command: 
  * `docker-compose up --build`

* By default, Client side will be hosted on port **3000** and the api side will be hosted on port **5002**. You can change the ports from **docker-compose.yml**.  

* After booting the app, you can open a browser and start to search movies.

* In the api side, there are 2 different endpoints: 
  * **/api/clear**: for flushing cache 
  * **/api/movies**: for fetching movies from the third party api.
  * The expected response type of **movies** endpoint is like following:
  <br></br>
  ```json
    {
    "is_success": true,
    "movies": [
        {
            "Title": "Starwars: Goretech",
            "Year": "2018",
            "imdbID": "tt9336300",
            "Type": "movie",
            "Poster": "https://m.media-amazon.com/images/M/MV5BNTI5OTBhMGYtNTZlNS00MjMzLTk5NTEtZDZkODM5YjYzYmE5XkEyXkFqcGdeQXVyMzU0OTU0MzY@._V1_SX300.jpg"
        }
      ]
    },
  ```
 
* For the server side, you can run `npm test` to run all test suites.
* Node version I have used throughout this project is **v14.20.1**.
