# Architecture

```text
japanese-learning-platform/
├── backend/
│   └── Spring Boot Modular Monolith
├── frontend/
│   └── React + TypeScript + Vite
├── docker/
│   └── nginx/
└── docker-compose.yml
```

Backend package-by-feature:

```text
com.japanese.learning
├── common
├── auth
├── user
├── level
├── lesson
├── vocabulary
├── grammar
├── kanji
├── listening
├── reading
├── kaiwa
├── exercise
├── test
├── progress
├── review
├── favorite
├── search
└── admin
```

Database schema is managed exclusively by Flyway.
Hibernate validates the schema with `ddl-auto=validate`.

No microservices, Redis, Kafka, Elasticsearch, Kubernetes or AI are included in V1.
