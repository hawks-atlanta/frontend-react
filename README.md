# Frontend React

## Development

### Folder structure

| Folder           | Description                                                                                                        |
| ---------------- | ------------------------------------------------------------------------------------------------------------------ |
| `src`            | Contains all the source code for the frontend.                                                                     |
| `src/components` | Contains all the React components.                                                                                 |
| `src/screens`    | Contains all the pages of the application.                                                                         |
| `src/context`    | Contains the React Context Providers unless you are using a global state management library like Redux or Zustand. |
| `src/hooks`      | Contains all the custom hooks.                                                                                     |
| `src/services`   | Contains the services that interact with the backend, E.g. Axios, Fetch.                                           |

### Setup

1. Install dependencies

```bash
npm install
```

2. Run the app

```bash
npm run dev
```

### Linter and Formatter

To check for linting errors in your code, run:

```bash
npm run lint:check
```

To automatically fix linting errors in your code (if possible), run:

```bash
npm run lint:fix
```

To check for formatting errors in your code, run:

```bash
npm run format:check
```

To automatically fix formatting errors in your code (if possible), run:

```bash
npm run format:fix
```
