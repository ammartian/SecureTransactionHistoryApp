# Secure Transaction History Module 🚀

## Description


This repository contains my implementation of the Secure Transaction History Module as part of the take-home assignment for the Frontend Engineer role.

 **Note:** I was unable to test the biometric authentication on my personal device since I am developing on Windows and do not have access to an Android device. 😟

## Technologies Used

- **React Native** (with Expo)
- **TypeScript**
- **Expo Router** for file-based routing
- **Tailwind CSS** (via `twrnc`) for styling

## Features

1. **User Authentication**
   - Biometric authentication (FaceID/Fingerprint) to ensure secure access.
   
2. **Transaction History**
   - Displays a list of recent transactions sorted by the latest date.
   - Sensitive data like transaction amounts is masked by default and able to be toggled via button.
   - Pull-to-refresh functionality to simulate reload transaction data.

3. **Transaction Details**
   - Navigate to transaction detail screen by tapping a transaction.
   - View additional information like Activity and transaction ID.

4. **Error Handling**
   - Handles, UI errors, authentication errors, data fetch errors, and other edge cases.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/ammartian/SecureTransactionHistoryApp.git
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Expo server:
   ```bash
   npx expo start
   ```

## Usage

1. Launch the app on your device or an emulator using Expo Go.
2. On the **Transaction History** screen:
   - View the list of transactions.
   - Toggle sensitive information visibility with biometric authentication.
   - Pull down to simulate refresh the list.
3. Tap on any transaction to navigate to the **Transaction Details** screen.

## Code Structure

```
app/
  components/          # Reusable UI components
  contexts/            # Contexts for managing state
  data/                # Mock transaction data
  models/              # Type definitions
  services/            # Biometric authentication service
  utils/               # Utility functions
  _layout.tsx          # Root layout for navigation
  index.tsx            # Transaction History screen
  TransactionDetailScreen.tsx # Transaction Detail screen
```

## Challenges and Learnings 💪✨🧠

1. **First Time Using React Native**: This was my first experience with React Native and mobile development.
2. **Debugging**: I learned how to debug applications using React Native.
3. **Biometric Authentication**: Implemented biometric authentication for the first time.
4. **Mobile UI Development**: Learned how to develop with React Native's UI components such as `View`, `TouchableOpacity`, and `FlatList`, which differ from web development.
5. **Responsive UI Design**: Gained experience in creating responsive UIs for mobile applications.

## Acknowledgments 🙌🤝👏🎉

This project was developed as part of a take-home assessment for the Frontend Engineer position, and it was a very fun experience. I learned a lot from it. Special thanks to the team for the opportunity! 🙏🎉
