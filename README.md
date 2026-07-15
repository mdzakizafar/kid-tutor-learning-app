# 🎓 Kid Tutor – AI-Powered Adaptive Learning Platform

## 📌 Project Overview

**Kid Tutor** is an interactive AI-powered educational platform designed to make learning engaging, personalized, and enjoyable for students.

The application generates topic-based quizzes using the **Google Gemini API** and automatically adjusts the difficulty level according to the learner's performance. Students receive instant feedback, AI-generated explanations, scores, and progress updates while completing quizzes.

The platform provides a responsive and user-friendly learning experience with multiple quiz modes, user authentication, progress tracking, and a leaderboard.

---

## 🌐 Live Demo

🚀 **Try the application here:**

https://kid-tutor-learning-app.vercel.app/

---

## ✨ Key Features

* 🤖 AI-generated quizzes using the Gemini API
* 📚 Topic-based quiz generation
* 🎯 Multiple difficulty levels:

  * Easy
  * Medium
  * Hard
* 🧠 Adaptive quiz difficulty based on user performance
* ⚡ Instant feedback after answering questions
* 💡 AI-generated explanations for answers
* 📊 Automatic score calculation
* 📈 Quiz progress tracking
* 🏆 Student leaderboard
* 🔐 User registration and login pages
* 📱 Fully responsive design
* 📧 Functional contact form
* ☁️ Deployed using Vercel
* 🔒 Secure API requests using Vercel Serverless Functions

---

## 🧠 Adaptive Learning System

The adaptive quiz system changes the difficulty of questions according to the student's performance.

For example:

* Correct answers may increase the difficulty level.
* Incorrect answers may maintain or reduce the difficulty level.
* Questions are dynamically generated according to the selected topic.
* Students receive immediate feedback and explanations.

This approach provides a more personalized learning experience for every student.

---

## 🛠️ Technologies Used

| Technology                  | Purpose                                             |
| --------------------------- | --------------------------------------------------- |
| HTML5                       | Creates the structure of the web pages              |
| CSS3                        | Provides styling, animations, and responsive design |
| JavaScript                  | Handles quiz logic and user interactions            |
| Gemini API                  | Generates AI-powered questions and explanations     |
| Vercel Serverless Functions | Securely handles Gemini API requests                |
| Vercel                      | Hosts and deploys the web application               |
| Git                         | Provides version control                            |
| GitHub                      | Stores and manages the project repository           |

---

## 📂 Project Structure

```text
kid-tutor-learning-app/
│
├── api/
│   └── Serverless API files
│
├── css/
│   └── Website stylesheets
│
├── js/
│   └── JavaScript files
│
├── index.html
├── login.html
├── register.html
├── quiz.html
├── ai-quiz.html
├── adaptive-quiz.html
├── leaderboard.html
├── contact.html
├── vercel.json
└── README.md
```

---

## 📄 Application Pages

### 🏠 Home Page

The home page introduces the Kid Tutor platform and allows students to explore its learning and quiz features.

### 🔐 Login Page

Allows registered users to access the learning platform.

### 📝 Registration Page

Allows new users to create an account.

### ❓ Quiz Page

Provides interactive quiz questions and automatically calculates the student's score.

### 🤖 AI Quiz Page

Uses the Gemini API to generate quiz questions dynamically according to the selected topic.

### 🧠 Adaptive Quiz Page

Automatically changes the question difficulty according to the student's performance.

### 🏆 Leaderboard Page

Displays student scores and rankings.

### 📧 Contact Page

Allows users to submit questions, feedback, or other messages.

---

## ⚙️ How the Application Works

1. The user opens the Kid Tutor website.
2. The user registers or logs into the platform.
3. The student selects a topic for the quiz.
4. The application sends a request to the Gemini API.
5. AI generates questions according to the selected topic.
6. The student answers the generated questions.
7. The application provides instant feedback.
8. AI-generated explanations help the student understand the answers.
9. The adaptive system changes the difficulty according to performance.
10. The final score is calculated and displayed.

---

## 🚀 How to Run the Project Locally

### 1. Clone the repository

```bash
git clone https://github.com/mdzakizafar/kid-tutor-learning-app.git
```

### 2. Open the project folder

```bash
cd kid-tutor-learning-app
```

### 3. Open the project

You can open the project using **Visual Studio Code**:

```bash
code .
```

### 4. Run the application

Open `index.html` directly in a web browser or use the **Live Server** extension in Visual Studio Code.

---

## 🔑 Gemini API Configuration

The project uses the **Google Gemini API** to generate quiz questions and explanations.

For security reasons:

* Do not expose the Gemini API key directly in frontend JavaScript files.
* Store the API key as an environment variable.
* Use Vercel Serverless Functions to communicate securely with the Gemini API.

Example environment variable:

```env
GEMINI_API_KEY=your_api_key_here
```

> Never upload API keys, passwords, or other sensitive information to GitHub.

---

## 🎯 Project Objectives

* Make learning interactive and engaging.
* Generate quizzes dynamically using Artificial Intelligence.
* Provide personalized quizzes based on student performance.
* Give instant feedback and meaningful explanations.
* Improve student understanding through adaptive learning.
* Create a responsive educational platform accessible on different devices.

---

## 🔮 Future Improvements

* Add Firebase or database-based authentication
* Store user quiz history
* Create individual student profiles
* Add detailed performance analytics
* Add subject-wise progress reports
* Introduce achievement badges and learning rewards
* Add quiz timers
* Add voice-based questions
* Add text-to-speech functionality
* Add more subjects and learning categories
* Create separate student and teacher dashboards
* Allow teachers to create custom quizzes
* Add multiplayer quiz competitions
* Develop a mobile application

---

## 👨‍💻 Author

**Md Zaki Zafar**

B.Tech – Computer Science and Engineering
Data Science Specialization
Lovely Professional University

GitHub: https://github.com/mdzakizafar

---

## 🤝 Contributions

Contributions, suggestions, and improvements are welcome.

To contribute:

1. Fork the repository.
2. Create a new branch.
3. Make the required changes.
4. Commit your changes.
5. Push the branch to GitHub.
6. Create a Pull Request.

---

## ⭐ Support

If you find this project useful or interesting, consider giving the repository a ⭐.

Your support is appreciated!
