# Shift Planning System

## Objective
Develop a Shift Planning System to manage employee schedules, focusing on timezones and converting time from one timezone to another.

## User Types
- **Admin:** Responsible for creating shifts.
- **Employees:** Can create their availability and see assigned shifts.

## Authentication and Registration
Implement a login and register page with the following routes:
- **Login:** /login
- **Register:** /register

## Functionality
### For Employee Type Users
- **Availability Creation:** Create availability for a week from Sunday to Monday, with fields for date, start time, end time, and timezone.
- **Display Availability:** View assigned shifts in a table format showing the date, time range of the shift, and displayed in both the employee's timezone and the admin's timezone.

### For Admin Type Users
- **View Employee Availability:** See employee availability in a table format with the ability to select a different timezone for conversion.
- **Shift Creation:** Create shifts and assign them to employees based on their availability, ensuring shifts do not overlap with existing shifts for a day.

## Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/Harshsharma836/Shift-Planning-System.git
   ```

2. Navigate to the client and server directories:
   ```sh
   cd Shift-Planning-System/client
   cd Shift-Planning-System/server
   ```

3. Install dependencies for both client and server:
   ```sh
   npm install
   ```

4. Start the client and server:
   ```sh
   npm start
   ```

This project has more focus on the backend, and the frontend UI is not optimal due to time constraints. Sorry for any inconvenience.
