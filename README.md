<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CRUD Application</title>
</head>
<body>

<h1>CRUD Application</h1>

<p>This CRUD application is built using MongoDB, Node.js, Express.js for the backend, and HTML, CSS, JavaScript, and Bootstrap for the frontend. The application allows users to perform the following operations:</p>

<h2>1. Add User</h2>
<ul>
    <li><strong>Functionality</strong>: Users can add a new user by providing details such as name, age, email, phone number, gender, and password.</li>
    <li><strong>Validations</strong>:
        <ul>
            <li>Name must be at least 5 characters and should not contain numbers or special characters.</li>
            <li>Age must be a valid number.</li>
            <li>Email must follow the format and end with <code>gmail.com</code>.</li>
            <li>Phone number must be a valid number.</li>
            <li>Password must be at least 8 characters long and contain a mix of letters and numbers.</li>
        </ul>
    </li>
    <li><strong>Flow</strong>: Upon successful addition, the user is redirected to the index page.</li>
</ul>

<h2>2. Delete User</h2>
<ul>
    <li><strong>Functionality</strong>: Users can delete an existing user by providing their email.</li>
    <li><strong>Flow</strong>: If the email exists in the database, the user is deleted, and the user is redirected to the index page.</li>
</ul>

<h2>3. Update User</h2>
<ul>
    <li><strong>Functionality</strong>: Users can update the information of an existing user by providing their email. If the email exists, the current user details are fetched and displayed in input fields where new information can be provided.</li>
    <li><strong>Flow</strong>: After providing the new details and clicking the update button, the user's information is updated in the database, and the user is redirected to the index page.</li>
</ul>

<h2>4. View a User</h2>
<ul>
    <li><strong>Functionality</strong>: Users can view the details of an existing user by providing their email.</li>
    <li><strong>Flow</strong>: If the email exists, the user's information is displayed in a table format.</li>
</ul>

<h2>User Interface</h2>
<ul>
    <li><strong>Index Page</strong>: The index page provides options for all four operations (Add User, Delete User, Update User, View a User).</li>
    <li><strong>Forms and Validation</strong>: Each operation has a dedicated form with necessary input fields and validation checks to ensure data integrity.</li>
    <li><strong>Bootstrap Styling</strong>: The application uses Bootstrap for a responsive and user-friendly interface, ensuring a neat and clear layout for all forms and information displays.</li>
</ul>

<h2>Technical Stack</h2>
<ul>
    <li><strong>Backend</strong>: Node.js, Express.js, MongoDB</li>
    <li><strong>Frontend</strong>: HTML, CSS, JavaScript, Bootstrap</li>
</ul>

<p>This application provides a seamless way to manage user data with a clean and intuitive user interface, making it easy to perform CRUD operations efficiently.</p>

</body>
</html>
