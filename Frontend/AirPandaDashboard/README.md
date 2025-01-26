# AirPanda - Dashboard

## Frontend Management dashboard Project

This is a dashboard website designed to manage the database for a flight booking website. The site is intended for admin use only and allows administrators to manage the information on the website in a convenient and efficient manner.

### Built using

> Language & framework: `Vite`+`React.Js`+`typscript`

> Libraries: `Rauter` + `axios` + `jwt` + `Formik`+`Yup`+`React Select`+`Tailwindcss` +`React icons` +`React QR`+`React Spinners`+`ApexCharts.js`

### Installation

1.  [Download the project](https://drive.google.com/drive/folders/1IDhAAc-w23THK68_y1oipaqZgMfUTq6n?usp=sharing)
*The link contains all the projects
2.  Run in console:
    ```bash
    npm install
    npm run dev
    ```

## Pages

### 1. Login Page

- Access to the site is restricted to users who are admins.
- The validation is performed on the server side.
- The site does not allow direct registration. Registration is done by an admin who designates the new user as an admin.
- After login, the user is redirected to the main page.

---

### Dashboard Page

The dashboard page contains 5 information blocks:

1. **First Block**: Displays the 3 upcoming flights, including departure time, flight number, and destinations.
2. **Second Block**: Shows the total number of flights for the next 4 days (yesterday, today - marked in blue, tomorrow, and the day after).
3. **Third Block**: Displays the number of registered users with a button to navigate to the user management page.
4. **Fourth Block**: Shows the destinations for the company's flights, including arrows to navigate between destinations.
5. **Fifth Block**: Displays the number of emails registered for the newsletter, with a button to navigate to the newsletter page.

Each block has a refresh button in the top right corner to update the information.

---

### Destinations Page

- This page displays all flight destinations in cards.
- Each card has two buttons: "Delete" to remove the destination and "View" to display full details of the destination with the option to edit.
- At the top, there's a search bar to filter content.
- In the top-left corner, there's a button to add a new destination. Clicking the button opens a modal with a search bar for an airport. After selecting the airport, additional details like flight number and a display image can be added.

---

### Flights Page

- This page displays all flights in a table, with filtering by days.
- The top of the table has a search bar with a filter button for each relevant column.
- The date field filters by day.
- The "Add Flight" button opens a modal with a form to create a new flight.
- Each flight row contains buttons for deletion and viewing, which lead to the flight page.

---

### Flight Page

- This page shows detailed information about the selected flight.
- Below the flight details, there are two tabs:
  1. **Details**: A form with all the flight details, including the option to edit and update them.
  2. **Seats**: Displays all the seats on the flight. Clicking on a seat allows you to cancel it to prevent customers from booking it (e.g., defective or reserved seats).

---

### Newsletter Page

- This page displays all emails registered for the newsletter.
- At the top, there's a search bar to filter content.
- On the right, there's a button to add a new email.
- Each email row has a delete button.
- In the future, a button will be added to send a newsletter to multiple emails at once.

---

### Users Page

- This page displays all users of the site in a table.
- At the top, there's a search bar to filter users.
- A filter button is available for filtering by role.
- There’s also a button to add a new user.
- At the end of each row, there are "Delete" and "View" buttons. Clicking "View" leads to the user details page.

---

### User Page

- This page has 3 tabs:
  1. **Profile**: Displays the user's details with the option to edit and update them. Admins can also change the role of any user.
  2. **Tickets**: Displays all the flight tickets the customer has booked, with buttons for deletion and viewing detailed information for each ticket.
  3. **Notifications**: Displays all notifications the user has received. You can delete messages and send new ones to the user.

---

### Additional Features

- At the bottom of the navigation menu on the left side, there's a button to change the theme.
- Since this is work-related software, there's an option to switch to a dark theme to reduce eye strain during long hours of screen use.

## Users to check the site

| Role  | Email            | Password |
| ----- | ---------------- | -------- |
| Admin | tamir@gmail.coml | 123456   |
