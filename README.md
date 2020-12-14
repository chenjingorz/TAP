# Environment
<ul>
    <li>Angular CLI 10.1.1</li>
    <li>Angular Material 10.2.7</li>
    <li>MongoDB and MongoDBCompass</li>
</ul>
 
 # Set Up
<ul>
  <li>Open MongoDBCompass, connect to localhost - mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&ssl=false</li>
  <li>Under "local", create a new collection "employee"</li>
  <li>In the project folder, copy the test file to the root directory, ie same level as /src</li>
</ul>

# Project
Project is implemented using the MEAN stack. It contained the below two functionalities:
<ul>
    <li>Upload CSV function</li>
    <li>Employee dashboard</li>
<ul>

## Run the web application
<ul>
  <li>Clone the repo, open CMD in the project folder and run "npm install"</li>
  <li>Open a CMD in the project directory, run "node server.js" to connect to the database.</li>
  <li>Open another CMD in the project directory, run "ng serve -o" to launch the web application on port 4200.</li>
</ul>

## Task 1
<ul>
    <li>Click on upload button to open the file selection window.</li>
    <li>Upon selection, a snack bar will display showing "File uploaded!"</li>
<ul>

## Task 2
<ul>
  <li>Select "employee dashboard" at the side bar.</li>
  <li>Enter the search criteria, and click "search".</li>
  <li>The employee details will be shown according to the search parameters.</li>
</ul>
