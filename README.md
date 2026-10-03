🚀 Mortaqi Website — Version 1.1

A modern, high-performance web project featuring an integrated contact form linked directly to a serverless Google Apps Script backend and Google Sheets for structured message logging and automated email notifications.

🌟 Key Features

Asynchronous Form Submission: Client messages are sent seamlessly using Fetch API without refreshing the page.

Interactive UI Feedback: Submit button locks visually (holding class with pointer-events: none and cursor: wait) to prevent spam or duplicate submissions during network processing.

Automated Message Logging: Real-time storage of contact entries appended directly into a private Google Sheet.

Instant Email Alerts: Automated notification pipeline triggering instant inbox alerts upon form submission.

Rate Limiting & Safety: Built-in backend safeguards to check remaining quota limits and prevent spam overflow.

🛠️ Tech Stack

Frontend: HTML5, CSS3 (normalize.css), JavaScript (ES6+, Async/Await, Fetch API)

Backend & Tooling: Google Apps Script (Serverless Web App API), @google/clasp CLI for local VS Code development

Database / Storage: Google Sheets

Version Control: Git & GitHub

📁 Project Structure

Mortaqi website/
├── css/
│ ├── main.css # Main stylesheet and layout design
│ └── normalize.css # Cross-browser CSS reset
├── imgs/ # Image assets and media files
├── js/
│ └── main.js # Client-side DOM interaction & fetch handling
├── .clasp.json # Local clasp configuration for Apps Script sync
├── .gitignore # Git rules excluding credentials and dependencies
├── appsscript.json # Apps Script deployment settings
├── index.html # Main HTML layout
├── README.md # Project documentation
└── server.js # Backend Apps Script logic

⚙️ Backend Integration Overview

Instead of relying on a dedicated server for Version 1.0, the backend is built on a serverless architecture using Google Apps Script managed locally via Clasp:

HTTP Endpoint: A custom doPost(e) endpoint handles incoming requests sent from the contact form.

Data Logging: Received payload data is verified and appended to the Google Sheet.

Automated Notification: Triggers an immediate notification email containing submission details directly to the admin inbox.

Local Tooling: Managed locally in VS Code using @google/clasp for seamless clasp push synchronization to Google Cloud.

🗺️ Long-Term Roadmap & Release Plans

🔹 Version 1.2 (Immediate Next Step)

Full Responsiveness: Refine layout and media queries for smooth rendering across mobile and tablet devices.

🔹 Version 2.0 (Frontend Upgrade)

React Migration: Rebuild the UI using React for component modularity, better state management, and scalability.

🔹 Version 3.0 (Full-Stack Evolution)

Custom Backend: Migrate from Google Apps Script to a dedicated Node.js & Express REST API.

Database Integration: Transition to Microsoft SQL Server for scalable relational database management.
