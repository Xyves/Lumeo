# Lumeo


## Description:

My app is a social media platform built as part of The Odin Project curriculum. It allows users to create posts, follow users, and explore content. The app utilizes Next.js for both the frontend and backend, and PostgreSQL for the database.

Deployed on [Netlify](https://lumeo-xyves.netlify.app)

## Pages:

You can access the app through your web browser. Here are some key features:

- **Landing Page**: Contains login buttons and logic. Login with GitHub and Guest functionality.
- **Feed**: Secured route displaying posts from users you follow.
- **Explore**: Secured route showcasing featured posts from all users.
- **Search**: Public route with the ability to search users.
- **User Profile**: Public route displaying user profile, follower/following count, and the ability to follow/unfollow users. Users can change their name, picture, and email from their profile. Displays user's posts and liked posts.
- **Post Details**: Public route showing post details, likes, and replies.

## Tech Stack & Features

- **Next.js**: Handles both frontend and backend, providing a seamless full-stack framework with built-in routing, API handling, and server-side rendering.
- **PostgreSQL Database**: Stores user information, posts, profile data, media content, and interactions (likes, comments, follows).
- **User Authentication**: Secure login using NextAuth.js with GitHub OAuth and JWT support, along with the option to continue as a guest.
- **Media Upload Support**: Users can upload images with their posts.
- **Profile Customization**: Users can personalize their profiles, including uploading a profile picture.
- **Infinite Scrolling**: Automatically loads more content as users scroll for a smooth experience.
- **Responsive Design**: Optimized for all screen sizes—from desktop to mobile.
- **Social Interactions**: Includes following other users for a customized feed, as well as liking and commenting on posts.

## Installation:

1.  Clone the repository to your local machine: `git clone https://github.com/Xyves/Lumeo`
2.  Navigate to the project directory: `cd Lumeo`
3. Setup environment variables:
Create a .env file in the root of the project and add the following environment variables:
```shell
DATABASE_URL
NEXTAUTH_SECRET 
NEXTAUTH_URL
GITHUB_ID 
GITHUB_SECRET=
CLOUDINARY_NAME  
CLOUDINARY_API_KEY 
CLOUDINARY_API_SECRET_KEY
NEXT_PUBLIC_BASE_URL= "https://localhost.com:3000"
```
4.  Install the required dependencies: `npm install`
5.  Start the development server: `npm run dev`
