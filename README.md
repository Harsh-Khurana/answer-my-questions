# Answer My Questions (Quiz Session App)

A modern, high-performance full-stack web application designed for creating, taking, and sharing interactive quiz sessions. Built with a heavy emphasis on UI/UX, performant data fetching, and bulletproof route protection.

## 🚀 Tech Stack

### Frontend

- React 19 (TypeScript)

- React Router v7 (Data Router API, Loaders, Hydration Fallbacks)

- TanStack React Query v5 (Server State, Mutations, Polling)

- Redux Toolkit (Client State Management)

- Framer Motion and DND-KIT (Complex UI Animations & dragging events)

### Backend Integration

- RESTful API architecture handling session creation, question fetching, and status polling.

## ✨ Key Features

- Bulletproof Route Protection: Unauthorized access is blocked before the component tree even mounts using React Router loader functions. This eliminates UI flashing and data waterfalls.

- Smart Data Hydration: Session data is fetched at the router level and directly dispatched to the Redux store, ensuring pages render instantly with data fully ready.

- Advanced Background Polling: Uses TanStack Query to actively poll the backend for session completion status, seamlessly transitioning users to the results page when ready.

- Stealth URL Manipulation: Utilizes the native Browser History API (window.history.replaceState) to silently append session IDs to the URL for easy sharing, entirely bypassing unnecessary React re-renders.

- Polished Animations: Features complex staggered entry/exit animations using Framer Motion, and hardware-accelerated CSS steps() timing functions for crisp typewriter-style loading dots.

- Modern Clipboard Sharing: Allows users to easily share their session links using the secure, native navigator.clipboard API with visual success feedback.

## 🏗️ Architecture Highlights

### The "Fetch, Hydrate, Protect" Pattern

Rather than relying on useEffect for data fetching (which causes layout shifts and waterfall requests), this application centralizes authorization and fetching inside React Router loaders:

1. Validates the sessionId from the URL.

2. Fetches the session data from the server.

3. Redirects invalid sessions to the home page instantly.

4. Hydrates the Redux store with valid session data.

### TanStack Query + Redux Separation

The app maintains a strict separation of concerns between server state and client state:

1. TanStack Query owns the network layer: It handles the useMutation to create a session, and the useQuery to poll for sessionCompleted status.

2. Redux Toolkit owns the interactive client state: Once TanStack Query verifies a session, Redux takes over to manage the user's active answers and UI interactions.

### Global Transition States

By leveraging React Router's useNavigation and hydrateFallbackElement, the app provides a seamless global loading experience. Network delays are masked by a centralized loading overlay, ensuring the user never feels like the app is frozen during heavy data fetches.

## 💻 Getting Started

### Prerequisites

- Node.js (v18 or higher)

- npm or yarn

### Installation

1. Clone the repository

```
git clone https://github.com/harshkhurana/answer-my-questions.git
cd answer-my-questions
```

2. Install dependencies in both client & server folder

```
cd server
npm install
```

```
cd client
npm install
```

3. Start the development servers for both client & server

```
npm run dev
```

4. Ensure your local backend server is running on port 3000 and frontend client on port 5173 (or update the URL in your API functions to match your backend port).

## 🛠️ Future Roadmap

- WebSocket Integration: Transition from TanStack Query polling to WebSockets for instant, real-time session updates.

- Dynamic Refetch Intervals: Optimize network payload by scaling the TanStack refetchInterval dynamically based on user activity.
