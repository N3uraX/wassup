# Wassup - WhatsApp Clone

Wassup is a modern WhatsApp clone built with React Native and Expo. It features chat, status, and call tabs, mimicking the core functionality and design of WhatsApp. This project is intended for learning and demonstration purposes.

## Features

- Chat interface with message bubbles
- Status updates (view and post)
- Calls tab with call history
- Custom avatars and user presence
- Modern UI using Expo and React Native components
- Navigation with Expo Router
- State management with Zustand

## Getting Started

### Prerequisites
- Node.js (v18 or newer recommended)
- npm or yarn
- Expo CLI (`npm install -g expo-cli`)

### Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/N3uraX/wassup.git
   cd wassup/project
   ```
2. Install dependencies:
   ```sh
   npm install
   # or
   yarn install
   ```

### Running the App
Start the Expo development server:
```sh
npm run dev
```

- Scan the QR code with the Expo Go app on your phone, or
- Press `w` to open in your browser, or
- Press `a`/`i` to launch an Android/iOS emulator

## Project Structure
- `app/` - Main app screens and navigation
- `components/` - Reusable UI components
- `assets/` - Images and mock data
- `store/` - Zustand state management
- `constants/` - App-wide constants
- `utils/` - Utility functions

## Customization
You can modify mock data in `assets/data/mockData.ts` to simulate different users, chats, and statuses.

## License
This project is for educational purposes only and is not affiliated with WhatsApp or Meta.
