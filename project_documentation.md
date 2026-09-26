# 🚀 Mortaqi Website — Version 1.0

A modern, high-performance, and responsive developer portfolio website. Built with vanilla web technologies and integrated with a serverless backend using Google Apps Script and Google Sheets for handling contact form submissions and email notifications.

## 🌟 Key Features

- **Dynamic Navigation**: Mobile and desktop navigation powered by `IntersectionObserver` for accurate section highlighting.

- **Functional Contact Form**: Real-time storage of client messages directly in Google Sheets.

- **Instant Email Notifications**: Automated notification system sending form submission details directly to the developer's inbox.

- **Security & Validation**: Form input sanitization and `localStorage`-based attempt tracking (maximum 2 submissions) to prevent spam.

- **CORS-Proof Architecture**: Optimized request delivery using `mode: "no-cors"` to bypass cross-origin browser limitations seamlessly.

## 🛠️ Tech Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+, Async/Await, Fetch API)

- **Backend**: Google Apps Script (Serverless Web App API)

- **Database / Storage**: Google Sheets

- **Deployment**: GitHub Pages

## 📁 Project Structure

```
.
├── index.html          # Main HTML layout
├── style.css           # Global styling and layout design
├── main.js             # Navigation logic, DOM manipulation, and fetch integration
└── README.md           # Project documentation
```

## ⚙️ Backend Integration Overview

Instead of relying on a dedicated server for Version 1.0, the backend is built on a serverless architecture using **Google Apps Script**:

1. **HTTP Endpoint**: A custom `doPost(e)` endpoint listens for incoming requests sent from the contact form.
2. **Data Parsing & Sanitization**: Received payload data is validated and cleaned to ensure integrity.
3. **Storage**: Submissions are automatically appended as new rows inside a private Google Sheet.
4. **Automated Notification**: A trigger sends an immediate notification email containing the user's name, email, phone number, and message via the `MailApp` service.

---

## 🗺️ Long-Term Roadmap & Release Plans

### 🔹 Version 1.1 (Immediate Next Step)

- **User Authentication**: Add Sign Up and Sign In features.
- **Full Responsiveness**: Refine and activate CSS Media Queries for smooth displays across all device screen sizes.

### 🔹 Version 2.0 (Frontend Upgrade)

- **React Migration**: Rebuild the UI using React for modularity and state management.
- **Course Hub**: Integrate direct links, resources, and previews for educational courses.

### 🔹 Version 3.0 (Full-Stack Evolution)

- **Custom Backend**: Migrate from Google Apps Script to a dedicated Node.js & Express REST API.
- **Database Integration**: Implement SQL (PostgreSQL / MySQL) for structured database management and user records.

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
