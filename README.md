# E-ducation
This is an online educational application to ease the work of colleges and schools in this pandemic.

## Tech Stack
- Front-end: ReactJS
- Back-end: Firebase
- GUI CSS: Bootstrap, Material UI, SCSS
- Database: Firestore

## Access Controls
1. Admin portal
2. Faculty portal
3. Student portal

## Features
1. University database management in admin portal
2. Virtual Training & Placement Cell
3. Attendance and Grades inventory plus marking (accessible to only authorized faculty)
4. Seat booking feature for student in Offline-classes (following COVID norms)
5. Student portal for getting all the academic information (marks, grades, assignments, tests) and all college related notifications at one place.

## Architecture and User-Interface

For all the three roles, there is role-based access control using firebase authentication (no teacher can login as admin/student and vice-versa)

### 1. Admin Portal
- The admin portal manage data (add,delete,modify) of Faculty staff, students, departments, subjects, T&P cell.
- The admin cannot make another admin (Mandatory access control) because such high privilege (adding/deleting departments) should not be able to get distributed (discretionary)
- A new admin can only be made through the main database.
- The data is pulled dynamically from other collections and used to create new documents.

### 2. Faculty Portal
- The faculty portal has its profile
- Feature to create offline class, assessment (tests, exams or assignments)
- Marking attendance and grades

### 3. Student Portal
- The student portal also has its profile.
- Feature to give the assessment
- Also, the student can register to an offline class and book seat according to covid norms.
- The student can see his attendance and grades too.

## Access keys
please check the supporting documents

## Installation
1. git clone https://github.com/diivyya/e-ducation.git
2. cd e-ducation/
3. npm install --legacy-peer-deps
4. npm start

Now view e-ducation in the browser.

  Local:            http://localhost:3000

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.


## License
[MIT](https://choosealicense.com/licenses/mit/)
