# Analyst

Run `npm install`. It will install the angular dependies required to run this application locally.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/main`. 
I have added the main route for the application to run

## Cross Origin issue
Locally it uses web-pack dev server which runs on port 4200. The express server provided for this challenge runs on port 3001. So, there is CORS issue when this
anglar app makes network call to the express server.
So, please enable the CORS on the express server usin CORS npm module and adding the below code in the express server.

`const cors = require('cors');
app.use('/hotels', cors({
  origin: ["http://localhost:4200"],
  methods: ['GET'] 
}), hotelsRouter);`



To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
