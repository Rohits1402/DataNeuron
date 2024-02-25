# Frontend Layout

## Description

This project consists of a responsive layout comprising three different components. Users have the ability to resize these components by dragging them from any side. The neighboring components expand or shrink based on resizing operations performed on the target component. The layout is designed to be responsive on all laptop devices.

### Components
Component 1: Description of component content or purpose.

Component 2: Description of component content or purpose.

Component 3: Description of component content or purpose.

### Technologies Used
ReactJS   
React Resizable  
HTML  
CSS  
### Setup
Clone the repository.  
Install dependencies using npm install.  
Run the project using npm start.  

# Backend APIs     
## Description
This section describes the backend APIs created for the frontend layout in ReactJS. There are APIs for adding/editing data in the components, along with an API to display the count of times users have called the add and update APIs.

### Endpoints
#### 1. Add Data
URL: /api/add-data  
Method: POST  
Description: Creates a new entry in the table with the provided data.   
Parameters:  
Data fields: Specify the data fields required for the new entry.   
Response: Success message with the updated count.  
#### 2. Update Data
URL: /api/update-data  
Method: POST  
Description: Updates an existing entry in the table with the provided data.  
Parameters:  
Data fields: Specify the data fields to be updated.  
Response: Success message with the updated count.  
#### 3. API Count
URL: /api/count   
Method: GET  
Description: Retrieves the count of times users have called the add and update APIs.  
Response: JSON object containing the count for add and update operations.   
### Technologies Used
Node.js  
Express.js  
MongoDB (or any other database)  
Mongoose (for MongoDB integration)  
## Execution Time  
apiCount Middleware: Less than 100 milliseconds  
teamMember API: 40-780 milliseconds    
Please note that the execution time may vary depending on the server load and network conditions.  


