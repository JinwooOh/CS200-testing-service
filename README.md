# Usage
Install Node packages
` npm install `

For node server on http://localhost:5000/,
type ` npm run server `


For react server on http://localhost:3000/,
in a client directory type ` npm run dev `

Overview:

Develop should always be merged into Test first so the following testing procedures can be undergone before updating the stable version of the application in the origin/Master branch.

4.3. Integration Testing (Iterations 1-3)
 
While unit testing ensures each separate function works correctly, integration testing tests several modules to ensure they all work together as expected. These include but are not limited to class interaction, data flow between the frontend and the backend, HTTP requests handling, and CRUD operations. In our system, integration testing will be performed on the following:
Navigation: This will test that the “view” of our application is successfully rendered when a corresponding action is taking place. For instance, when the professor clicks a “create test” button, a form should occur for the input. CasperJS is a javascript library that we decide to use for the purpose of frontend testing.
CRUD: This will test if users can perform CRUD operations (relating to backend MongoDB) on the testing service that fulfills the need for frontend and backend integration.
Data flow: this will test how data is stored and sent with each user action. For instance, when students take the test, the answers should be stored in local variables. When they confirm to submit the test, the data is sent to the backend. After CRUD operations, the score is then sent to the user and displayed on the web browser.

4.4. System Testing (Iterations 2-3)
 
System testing aims to test the product as a black box. At this step, any user action will be tested in a randomized manner. In the case of this project, this system testing will be done via simulating starting from test creation, deployment to students, students taking practice tests and then taking real tests in a controlled setting, and finally receiving grades.

4.5. Performance Testing (Iterations 1-3)
 
Performance testing is to ensure that the application can run at a desired and usable rate. These mainly involve testing the server response time as well as database query time. Optimization should be done on the server side whenever the time delay in server and databases affects the testing experience of a student. This could include but is not limited to query optimization and/or deleting redundant segments of code.

4.6. Regression Testing (Iterations 1-3)
 
Regression testing ensures that additional features do not break older code. When a new feature is added, developers should rerun unit tests with Mocha for frontend and backend respectively and navigation tests with CasperJS to ensure the application works as expected. 
The Chrome React Dev tool can also be used to check the status of states. The developer should watch these states to make sure the application holds the correct data. 
 
4.7. Compatibility Testing (Iterations 2-3)
 
Since our project is a web application, we have to consider compatibility testing on different browsers and their versions. Although the application can run on mobile, we don’t need to deal with mobile compatibility, because the test will be running on CS Lab computers. 
Currently, we are targeting all the modern desktop browsers including Firefox, Chrome, Safari, and IE. 
We haven’t found a way to automatically test the compatibility.  
Our plan for compatibility testing is: 
Use Chrome as the main browser with a screen resolution of 1024x768 pixels.
During the major update from iteration 2 and iteration 3, we do our own user tests on the different browsers. 
If we discover possible errors, fix the codes, and repeat step b.
