
# Flight Booking System

## Overview of Projects

This repository contains three separate projects that work together to form a comprehensive flight booking system. Each project serves a distinct role, ensuring a secure, efficient, and user-friendly experience.

### Frontend
> Language & framework: `Vite`+`React.Js`+`typscript`

> Libraries: `Rauter` + `axios` + `jwt` + `Formik`+`Yup`+`React Select`+`Tailwindcss` +`React icons` +`React QR`+`React Spinners`+`ApexCharts.js`

### Backend
> Language & framework: `C#`+`.net`

> Libraries & nuget packege: `jwt` + `Net.Mail` + `jwt` + `Identity.EntityFrameworkCore`+`EntityFrameworkCore`+`EntityFrameworkCore.Design`+`EntityFrameworkCore.SqlServer` +`EntityFrameworkCore.Tools` 

*Detailed information on each project

### 1. Frontend Project (React.js)

- **Description:**
  A dynamic and interactive website for customers to book flights. Built with React.js to offer a fast and responsive experience.

- **Key Features:**
  - Flight search by date, destination, and passenger count.
  - Seat selection interface for users.
  - Secure passenger information form.
  - Booking summary and confirmation before payment.
  - Secure payment processing.

- **Technologies Used:**
  - React.js
  - Axios (for API calls)
  - CSS/SCSS (for styling)

---

### 2. Admin Dashboard (Frontend)

- **Description:**
  A separate admin-only dashboard used to manage flight data, user accounts, and other administrative tasks. It is kept separate from the customer-facing frontend to ensure maximum security.

- **Key Features:**
  - **Destination Management:** Add, edit, and delete destinations.
  - **Flight Management:** Manage all flights, including seats (e.g., marking unavailable seats).
  - **User Management:** Add, delete, and manage user roles, as well as view their flight bookings.
  - **Newsletter Management:** View and manage email subscriptions for newsletters.
  - **Reporting:** Track key statistics like upcoming flights, user count, and popular destinations.

- **Technologies Used:**
  - React.js
  - Axios (for API calls)
  - Material-UI or similar libraries for UI components

---

### 3. Backend Project

- **Description:**
  The backend project handles all business logic and database interactions for the flight booking system. It's built with C#.NET and includes API request handling and database read/write operations.

- **Key Features:**
  - **User Authentication:** Uses JWT for secure user login and role verification.
  - **Flight and Destination Management:** Manage flight data, destinations, and seat availability.
  - **Notifications and Emails:** Send notifications and emails to users via Google’s SMTP server.
  - **Payment Processing:** Handles secure payment transactions and updates the database (flights, tickets, notifications).
  - **External API Integration:** Integrates with NINJAS API for airport searches.

- **Technologies Used:**
  - C#.NET
  - SQL Server (or other databases)
  - JWT for authentication
  - Google SMTP for email sending

---

## Project Separation for Enhanced Security

The **admin dashboard** is separated from the **customer-facing website** to maximize security. By isolating the management functionalities, sensitive operations such as database control and user management are protected from unauthorized access.

- **Admin Dashboard:** Only accessible to admin users through a separate URL.
- **Customer Website:** A public-facing website where users can search and book flights.

This separation ensures that only authorized users can access and modify sensitive data.


## Features and Future Enhancements

### Current Features:
- Flight search, booking, and management.
- Admin dashboard with flight, destination, and user management.
- Secure user authentication and payment processing.

### Planned Features:
- Send newsletters to multiple emails simultaneously.
- Improve user interface for enhanced usability.
- Add analytics and reporting features to track flight bookings and revenue.

## Backend Setup

1. [Download the project](https://drive.google.com/drive/folders/1IDhAAc-w23THK68_y1oipaqZgMfUTq6n?usp=sharing) *The link contains all the projects
2. Open the project in **Visual Studio**
3. Open the **Package Manager Console**
4. Run: `update-database`


## Frontend Setup
1. [Download the project](https://drive.google.com/drive/folders/1IDhAAc-w23THK68_y1oipaqZgMfUTq6n?usp=sharing) *The link contains all the projects
2. Open the project in **Visual Studio Code**
3. in Terminal Install dependencies: `npm install`.
4. run: `npm run dev`



