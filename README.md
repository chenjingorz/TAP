# Environment

1. Angular CLI 10.1.1.
2. Angular Material 10.2.7
3. MongoDB and MongoDBCompass

# Project
Project is implemented using the MEAN stack. It contained the below two functionalities:
1. Upload CSV function
2. Employee dashboard -- using mock data in MongoDB   

## Run the web application

1. Open MongoDBCompass 
2. Connect to localhost - mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&ssl=false
3. Under "local", create a new collection "employee"
4. Import the mock data, change data type of "salary" to "double" and import
5. Open a CMD in the project directory, run "node server.js" to connect to the database.
7. Open another CMD in the project directory, run "ng serve -o" to launch the web application on port 4200.

## Task 1
1. Click on upload button to open the file selection window.
2. Upon selection, a snack bar will display showing "File uploaded!". 
3. Actual upload functionality is not implemented successfully, source code is commented.

## Task 2 (Please upload the mock data to MongoDB in order to run this part)
1. Select "employee dashboard" at the side bar.
2. Enter the search criteria, and click "search".
3. The employee details will be shown according to the search parameters.

