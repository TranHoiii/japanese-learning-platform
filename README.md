# Japanese Learning Platform

Website học tiếng Nhật cho người Việt.

## Stack

### Backend
- Java 21 LTS
- Spring Boot 3.5.16
- Spring Web
- Spring Data JPA / Hibernate
- Spring Security
- JWT / OAuth2 Resource Server
- Jakarta Bean Validation
- Flyway
- MySQL 8
- MapStruct
- Lombok
- OpenAPI / Swagger UI

### Frontend
- React
- TypeScript
- Vite
- Tailwind CSS 4
- React Router
- Axios
- TanStack Query

### Infrastructure
- Docker / Docker Compose
- Nginx
- Git / GitHub

## Architecture

Modular Monolith + package-by-feature + layered architecture.

## Requirements

- JDK 21
- Maven 3.9+
- Node.js 22+
- npm
- Docker Desktop
- MySQL 8 (only needed if not using Docker)

## Run backend locally

```bash
cd backend
mvn spring-boot:run
```

Backend:
- API: http://localhost:8080
- Health: http://localhost:8080/api/v1/health
- Swagger UI: http://localhost:8080/swagger-ui.html

## Run frontend locally

```bash
cd frontend
npm install
npm run dev
```

Frontend:
- http://localhost:5173

## Run MySQL with Docker

From project root:

```bash
docker compose up -d mysql
```

Default development database:
- Host: localhost
- Port: 3306
- Database: japanese_learning
- User: japanese
- Password: japanese_dev

## Run full stack with Docker

```bash
docker compose up --build
```

Open:
- http://localhost
- API: http://localhost/api/v1/health

## Important

Flyway owns database schema changes.

Hibernate is configured with:

```yaml
spring.jpa.hibernate.ddl-auto: validate
```

Do not change it to `update` for this project.

The project is intentionally a clean scaffold. Domain modules can now be implemented one vertical slice at a time.
