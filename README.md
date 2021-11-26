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

![image](https://user-images.githubusercontent.com/68610804/143624395-5c842d6f-8e8a-45e3-89ec-38f901b03350.png)

### 1. Admin Portal
- The admin portal manage data (add,delete,modify) of Faculty staff, students, departments, subjects, T&P cell.
- The admin cannot make another admin (Mandatory access control) because such high privilege (adding/deleting departments) should not be able to get distributed (discretionary)
- A new admin can only be made through the main database.
- The data is pulled dynamically from other collections and used to create new documents.

![image](https://user-images.githubusercontent.com/68610804/143624900-bf968ea7-92ea-4dc1-9d11-4463a4cf37e7.png)

### 2. Faculty Portal
- The faculty portal has its profile
- Feature to create offline class, assessment (tests, exams or assignments)
- Marking attendance and grades

![image](https://user-images.githubusercontent.com/68610804/143625523-f4fb28bd-bdc0-4942-b6e9-ad6dfb278ac5.png)
![image](https://user-images.githubusercontent.com/68610804/143625563-3a82b447-32d0-421a-80f8-1a175127460b.png)
![image](https://user-images.githubusercontent.com/68610804/143625587-9abab24d-d2e5-410a-ad24-85ce7b3107cc.png)
![image](https://user-images.githubusercontent.com/68610804/143625604-9f19cf42-d4e7-4221-9384-75e583f111ec.png)


### 3. Student Portal
- The student portal also has its profile.
- Feature to give the assessment
- Also, the student can register to an offline class and book seat according to covid norms.
- The student can see his attendance and grades too.

![image](https://user-images.githubusercontent.com/68610804/143625753-cc371c3a-f7d2-4bda-a0c7-c81f12e1bc85.png)
![image](https://user-images.githubusercontent.com/68610804/143625664-c09f4ddf-afb0-43e9-87ce-ffb3adbd2fec.png)
![image](https://user-images.githubusercontent.com/68610804/143625703-451ad91a-2b87-42d1-abb8-4c4f69b1e98c.png)
![image](https://user-images.githubusercontent.com/68610804/143625731-f996d514-1c12-446d-9e25-7978625cd72a.png)
![image](https://user-images.githubusercontent.com/68610804/143625771-17ffed0a-cad3-4343-8868-bb88fcb60758.png)


## Access keys

Admin: 

email id: diivyyat@gmail.com
password: 110701

Faculty:

email id: jtc@gmail.com
password: faculty123

Student:

email id: divyatembhurne1107@gmail.com
password: 110701


## Installation
1. git clone https://github.com/diivyya/e-ducation.git
2. cd e-ducation/
3. npm install
4. npm start

Now view e-ducation in the browser.

  Local:            http://localhost:3000

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.


## License
[MIT](https://choosealicense.com/licenses/mit/)
