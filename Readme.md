<!-- Learning Backend From - Hitesh Choudhary (Youtube). -->

MyTube - Backend

- [Models Link] (https://app.eraser.io/workspace/YtPqZ1VogxGy1jzIDkzj).

Here is the complete `README.md` file for your project:

````markdown
# MyTube_backend API

This project provides a set of APIs for managing videos, playlists, likes, subscriptions, and user-related actions in the Chai_And_Code application.

## Table of Contents

- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
  - [Auth](#auth)
  - [Videos](#videos)
  - [Playlists](#playlists)
  - [Likes](#likes)
  - [Subscriptions](#subscriptions)
  - [Dashboard](#dashboard)
- [Usage](#usage)
  - [Auth](#auth-usage)
  - [Videos](#videos-usage)
  - [Playlists](#playlists-usage)
  - [Likes](#likes-usage)
  - [Subscriptions](#subscriptions-usage)
  - [Dashboard](#dashboard-usage)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/hetpatel4381/mytube_backend
   cd mytube_backend
   ```
````

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up your environment variables. Create a `.env` file in the root directory and add the following variables:

   ```env
   PORT=8000
   MONGO_URI=`mongo_url`
   CORS_ORIGIN=*
   ACCESS_TOKEN_SECRET=`SECRET_KEY`
   ACCESS_TOKEN_EXPIRY=1d
   REFRESH_TOKEN_SECRET=`REFRESH_TOKEN`
   REFRESH_TOKEN_EXPIRY=10d
   CLOUDINARY_CLOUD_NAME=`CLOUD_NAME`
   CLOUDINARY_API_KEY=`API_KEY`
   CLOUDINARY_API_SECRET=`API_SECRET`
   ```

4. Start the server:
   ```bash
   npm start
   npm run dev
   ```

## Environment Variables

Make sure to set up the following environment variables in your `.env` file:

- `PORT`: Port on which the server will run (default: 8000)
- `MONGODB_URI`: URI for connecting to MongoDB
- `JWT_SECRET`: Secret key for JWT token generation and verification

## API Endpoints

### Auth

- `POST /api/auth/register`: Register a new user
- `POST /api/auth/login`: Login a user

### Videos

- `POST /api/videos`: Upload a new video
- `GET /api/videos/:videoId`: Get video details by ID
- `PATCH /api/videos/:videoId`: Update video details by ID
- `DELETE /api/videos/:videoId`: Delete video by ID

### Playlists

- `POST /api/playlists`: Create a new playlist
- `GET /api/playlists/:playlistId`: Get playlist details by ID
- `PATCH /api/playlists/:playlistId`: Update playlist details by ID
- `DELETE /api/playlists/:playlistId`: Delete playlist by ID
- `PATCH /api/playlists/add/:videoId/:playlistId`: Add a video to a playlist
- `PATCH /api/playlists/remove/:videoId/:playlistId`: Remove a video from a playlist

### Likes

- `POST /api/likes/toggle/v/:videoId`: Toggle like on a video
- `POST /api/likes/toggle/c/:commentId`: Toggle like on a comment
- `POST /api/likes/toggle/t/:tweetId`: Toggle like on a tweet
- `GET /api/likes/videos`: Get all liked videos by the user

### Subscriptions

- `POST /api/subscriptions/c/:channelId`: Toggle subscription to a channel
- `GET /api/subscriptions/u/:subscriberId`: Get channels subscribed by the user
- `GET /api/subscriptions/c/:channelId`: Get subscribers of a channel

### Dashboard

- `GET /api/dashboard/stats`: Get channel statistics
- `GET /api/dashboard/videos`: Get all videos uploaded by the channel

## Usage

### Auth Usage

#### Register

```bash
POST /api/auth/register
{
  "username": "exampleuser",
  "email": "user@example.com",
  "password": "password123"
}
```

#### Login

```bash
POST /api/auth/login
{
  "email": "user@example.com",
  "password": "password123"
}
```

### Videos Usage

#### Upload Video

```bash
POST /api/videos
{
  "title": "Video Title",
  "description": "Video Description",
  "url": "http://example.com/video.mp4"
}
```

#### Get Video

```bash
GET /api/videos/:videoId
```

#### Update Video

```bash
PATCH /api/videos/:videoId
{
  "title": "Updated Title",
  "description": "Updated Description"
}
```

#### Delete Video

```bash
DELETE /api/videos/:videoId
```

### Playlists Usage

#### Create Playlist

```bash
POST /api/playlists
{
  "name": "Playlist Name",
  "description": "Playlist Description"
}
```

#### Get Playlist

```bash
GET /api/playlists/:playlistId
```

#### Update Playlist

```bash
PATCH /api/playlists/:playlistId
{
  "name": "Updated Playlist Name",
  "description": "Updated Playlist Description"
}
```

#### Delete Playlist

```bash
DELETE /api/playlists/:playlistId
```

#### Add Video to Playlist

```bash
PATCH /api/playlists/add/:videoId/:playlistId
```

#### Remove Video from Playlist

```bash
PATCH /api/playlists/remove/:videoId/:playlistId
```

### Likes Usage

#### Toggle Video Like

```bash
POST /api/likes/toggle/v/:videoId
```

#### Toggle Comment Like

```bash
POST /api/likes/toggle/c/:commentId
```

#### Toggle Tweet Like

```bash
POST /api/likes/toggle/t/:tweetId
```

#### Get Liked Videos

```bash
GET /api/likes/videos
```

### Subscriptions Usage

#### Toggle Subscription

```bash
POST /api/subscriptions/c/:channelId
```

#### Get Subscribed Channels

```bash
GET /api/subscriptions/u/:subscriberId
```

#### Get Channel Subscribers

```bash
GET /api/subscriptions/c/:channelId
```

### Dashboard Usage

#### Get Channel Stats

```bash
GET /api/dashboard/stats
```

#### Get Channel Videos

```bash
GET /api/dashboard/videos
```

---
