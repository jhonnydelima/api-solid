## GymPass style API

### Description
An API SOLID designed to facilitate the management of gym memberships, users, and related activities. The application leverages modern technologies such as Fastify, Prisma, and TypeScript to deliver a robust and scalable backend.

### Features
- User authentication and session management with @fastify/jwt and @fastify/cookie.
- Secure password handling using bcryptjs.
- Database ORM with Prisma.
- Validation powered by zod.
- Test coverage with Vitest.
- Dockerized development environment.

### Installation
Clone the repository:
```
git clone <repository-url>
cd api-solid
```

Install dependencies:
```
npm install
```

Configure environment variables:
- Create a .env file in the project root.
- Add necessary environment variables (e.g., database connection string, JWT secret).

### Scripts
**Development**
- Start development server:
```
npm run start:dev
```

- Start services (Docker Compose):
```
npm run services:up
```

- Stop services:
```
npm run services:stop
```

- Remove services:
```
npm run services:down
```

**Build**
- Compile TypeScript files:
```
npm run build
```

**Testing**
- Run unit tests:
```
npm run test
```

- Run unit tests in watch mode:
```
npm run test:watch
```

- Run E2E tests:
```
npm run test:e2e
```

- Run E2E tests in watch mode:
```
npm run test:e2e:watch
```

- Run tests with coverage:
```
npm run test:coverage
```

- Test UI:
```
npm run test:ui
```

<hr style="width: 100%; border: none; border-top: 1px solid #000;">

### Functional Requirements:
- [X] It must be possible to register;
- [X] It must be possible to authenticate;
- [X] It must be possible to retrieve the profile of a logged-in user;
- [X] It must be possible for the user to check in at a gym;
- [X] It must be possible to validate a user's check-in;
- [X] It must be possible to get the number of check-ins performed by the logged-in user;
- [X] It must be possible for the user to retrieve their check-in history;
- [X] It must be possible for the user to search for nearby gyms (within 10 km);
- [X] It must be possible for the user to search for gyms by name;
- [X] It must be possible to register a gym.

### Business Rules:
- [X] Users must not be able to register with a duplicate email;
- [X] Users cannot perform more than one check-in on the same day;
- [X] Users cannot check in unless they are near the gym (within 100 meters);
- [X] A check-in can only be validated up to 20 minutes after it is created;
- [X] A check-in can only be validated by administrators;
- [X] A gym can only be registered by administrators.

### Non-Functional Requirements:
- [X] The user's password must be encrypted;
- [X] The application's data must be stored in a PostgreSQL database;
- [X] All data lists must be paginated with 20 items per page;
- [X] The user must be identified by a JWT (JSON Web Token).
