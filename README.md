# Project Setup Guide

## 1. Clean the Repository
Clone this repository into your local.
```bash
git clone https://github.com/divaasanjaya/diva-test.git
```
After cloning, navigate into the project folder
```bash
cd diva-test
```

## 2. Start the Backend
Install dependencies:
```bash
npm install
```
Run the backend:
```bash
npm start
```
NOTES:
- All API routes and automation schedulers are active once the server is running.
- The scheduler will collect data and save it into **home/cron/** at 08.00, 12.00, and 15.00 WIB.
- File stored in **home/cron/** for more than one month will be deleted automatically at 00.00 WIB everyday.
- The answer for question 3 (Data Processing) can be found in **SQL_query.md**.

## 3. Run the Frontend
Open the file **frontend/form.html** in your browser. You can submit data throught the form and display the saved data in table format.


