# Environment

Angular CLI 10.1.1.
Angular Material 10.2.7
MongoDB

# Project
Project contained the below two tasks
1. Upload CSV function -- 
2. Employee dashboard -- using mock data in MongoDB 
  a. Open MongoDBCompass
  b. Connect to localhost - mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&ssl=false
  c. Under "local", create a new collection "employee"
  d. Import the mock data, change data type of "salary" to "double" and import.

## Run the web application

1. Connect to MongoDB 
2. Open a CMD in the project, run "server.js" to connect to the database.
3. Open another CMD, run "ng serve -o" to launch the web application on port 4200.

## Task 1
1. Click on upload button to open the file selection window.
2. Upon selection, a snack bar will display showing "file is uploading". 
3. Actual upload functionality is not implemented

## Task 2
1. Select "employee dashboard" at the side bar.
2. Enter the search criteria, and click "search".
3. The employee details will be shown according to the search parameters.

