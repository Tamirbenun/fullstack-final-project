
# AirPanda Server - Side Project

## Backend Project
The server-side project is built with **C#.NET** and is divided into two main parts. The first part handles API requests, while the second part manages database reading and writing.


### Built using
> Language & framework: `C#`+`.net`

> Libraries & nuget packege: `jwt` + `Net.Mail` + `jwt` + `Identity.EntityFrameworkCore`+`EntityFrameworkCore`+`EntityFrameworkCore.Design`+`EntityFrameworkCore.SqlServer` +`EntityFrameworkCore.Tools` 


## Overview

The AirPanda server-side project is built using **C#.NET** and is divided into two main parts:
1. A project responsible for handling API requests.
2. A project that handles database interactions (reading and writing data).

The server-side architecture includes several controllers and services that work together to manage users, flights, payments, notifications, and more.

## Project Structure

### Controllers:
- **Users Controller**: Manages user-related operations such as registration, authentication, and user data updates.
- **Flights Controller**: Handles operations related to flight data, including flight availability and bookings.
- **Destinations Controller**: Manages information about the destinations that AirPanda flies to.
- **Notifications Controller**: Sends notifications to users about important updates.
- **Newsletter Controller**: Manages the subscription process and sends newsletters to users.
- **Payments Controller**: Processes payment requests, updates flight seat availability, creates new tickets, sends notifications to users, and performs price validation on the server to prevent end-user manipulation of prices.
- **External APIs (NINJAS API)**: Handles API calls to NINJAS API for retrieving airport data based on search criteria.
- **Emails Controller**: Sends emails using Net.Mail and Google’s SMTP server.

### Services:
- **JWT Service**: Used for generating tokens and validating user permissions.
- **Email Service**: Sends emails via Google's SMTP server.

## Features

- **Secure Payments**: Handles payment processing, including updating flight data and sending notifications to users upon successful payments.
- **Flight Booking Management**: Ensures smooth handling of flight bookings, including seat reservations and price validation.
- **Notifications**: Sends notifications to users regarding important updates and activities in the booking process.
- **Newsletter Subscription**: Allows users to subscribe to newsletters for updates and promotions.
- **External Airport Search**: Integrates with NINJAS API to fetch airport data based on user search.
- **Email Communication**: Handles email communication with users for registration, booking confirmations, and promotions.

## Technologies Used

- **C#.NET** for server-side development
- **JWT (JSON Web Token)** for user authentication and authorization
- **Net.Mail** for sending emails via Google’s SMTP server
- **NINJAS API** for external airport search

## Setup

1. [Download the project](https://drive.google.com/drive/folders/1IDhAAc-w23THK68_y1oipaqZgMfUTq6n?usp=sharing) *The link contains all the projects
2. Open the project in **Visual Studio Code**
3. Open the **Package Manager Console**
4. Run the following command to update the database schema:
```bash 
update-database

