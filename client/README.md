# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```ts
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

---

# Hairstylist Booking Platform Frontend

This is the frontend application for the hairstylist booking platform. It is built using Vite as the build tool and React as the frontend framework.

## Technologies Used

- Vite
- React
- TypeScript
- Tailwind css
- Ant Design (UI library)
- Axios (HTTP client)

## Setup

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/BOOK_ME.git
   ```

2. Install dependencies:
   ```
   cd client
   npm install
   ```

3. Set up environment variables:
   - Create a `.env` file in the root directory.
   - Define the following variables in `.env`:
     ```
     booking/api=http://localhost:8080/api
     ```

4. Start the development server:
   ```
   npm run dev
   ```

## Features

- User authentication and authorization.
- Dashboard for admin, users and hairstylists.
- Profile management for users and hairstylists.
- Booking appointments with hairstylists.
- Notifications for admin, users and hairstylists.
- Responsive design for mobile and desktop.

## API Integration

- The frontend communicates with the backend API using Axios.
- Update the `booking/api` in the `.env` file to match your backend API URL.

## Authentication

- JWT (JSON Web Tokens) are used for authentication.
- The `authorization.tsx` in `src/services/authorization.tsx` handles login, logout, and token management.

## Styling

- Ant Design is used for UI components and styling.
- Custom styles was achieved using tailwind css.

## Deployment

This frontend application can be deployed to platforms like Vercel, Netlify, or any hosting provider that supports static site hosting.

## Contributing

Contributions are welcome! If you have suggestions or improvements, please open an issue or submit a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Feel free to modify and expand this README file based on your specific frontend application's structure, features, and requirements.