# My-nestjs-boilerplate
A comprehensive, ready-to-go boilerplate for building efficient, scalable server-side applications using Nest.js, designed to fast-track your web development projects.

## Motivation
This boilerplate is crafted to serve as a robust starting point that encapsulates a powerful combination of technologies – Nest.js, TypeORM, Redis, JWT, Swagger, and Winston.
- **Nest.js** for a progressive Node.js framework that provides an out-of-the-box application architecture.
- **TypeORM** for database management, utilizing the Data Mapper pattern for TypeScript and JavaScript.
- **Redis** for high-performance data caching to enhance application responsiveness.
- **JWT** for secure and scalable user authentication.
- **Swagger** for automated, interactive API documentation that simplifies developer testing and frontend integration.
- **Winston** for comprehensive and customizable logging to aid in debugging and monitoring application health.

## Features
- **Enhanced Logging with Winston:** Extending logging capabilities using Winston, providing log level differentiation and allowing log file paths to be dynamically controlled based on the log type. 

- **Custom Interceptor for Unified Response Handling:** A custom interceptor is implemented to standardize the structure of API responses. For cases where this standardization is not desired, we've introduced the @Keep decorator, giving you the flexibility to bypass this unified formatting when necessary.

- **Role-based Authentication with AuthGuard:** an AuthGuard leverages decorators to enforce role-based access control. 

- **Session Management with Redis Caching**

- **API Documentation with Swagger**

## Quick experience
After successful startup, access through http://localhost:7001/swagger-api/.
```bash
docker composer up
```
## Local Development

- Get project code
```bash
git clone https://github.com/llii0046/my-nestjs-boilerplate.git
```

- Install dependency
```bash
npm install
```

- Running
```bash
npm start
```

## License
MIT