# Ranvijay Singh - Data Scientist Portfolio

A professional portfolio website for Ranvijay Singh, a Data Scientist specializing in data analysis, visualization, and machine learning.

## 📋 Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Development Server](#running-the-development-server)
- [Building for Production](#building-for-production)
- [Deployment](#deployment)
- [Project Structure](#project-structure)
- [Customization](#customization)
- [Technologies Used](#technologies-used)

## ✨ Features

- Responsive design for all devices
- Interactive 3D data visualization in the hero section
- Detailed sections for skills, projects, experience, and education
- Contact form with backend API integration
- Resume download functionality
- Modern UI with smooth animations

## 🔧 Prerequisites

Before you begin, ensure you have the following installed on your system:

- [Node.js](https://nodejs.org/) (v18.0.0 or higher)
- [npm](https://www.npmjs.com/) (v8.0.0 or higher) or [yarn](https://yarnpkg.com/) (v1.22.0 or higher)
- [Git](https://git-scm.com/) (optional, for cloning the repository)

## 📥 Installation

Follow these steps to set up the project locally:

1. **Clone the repository** (or download and extract the ZIP file):

\`\`\`bash
git clone https://github.com/yourusername/ranvijay-portfolio.git
cd ranvijay-portfolio

## Email Functionality Setup

To enable the contact form email functionality:

1. Create a `.env.local` file in the project root directory
2. Add your email password or app password to the file:
\`\`\`
EMAIL_PASSWORD=your-app-password-here
\`\`\`

Note: If you're using Gmail, you'll need to generate an App Password rather than using your regular account password. Follow these steps:

1. Turn on 2-Step Verification for your Google account
2. Go to your Google Account > Security > App passwords
3. Select "Mail" and "Other (Custom name)" 
4. Generate and copy the app password
5. Paste this into your `.env.local` file

This enables the contact form to send emails to ranvijay3325778@gmail.com when visitors submit the form.

