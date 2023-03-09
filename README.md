# Hexagonal Architecture

## Introduction

Hexagonal Architecture is a software architecture pattern that aims to create a clear separation between the business logic and the infrastructure. It is also known as Ports and Adapters or Ports and Adapters Architecture.

The idea is to have the business logic at the center and the infrastructure on the outside. The business logic should not depend on the infrastructure, and the infrastructure should not depend on the business logic.

This is a sample project that follows this architecture.

## Project Structure

### Application

The application layer is the entry point of the system. It is the only layer that can be accessed from the outside. It is responsible for receiving requests from the outside and transforming them into a format that the domain layer can understand. It is also responsible for transforming the responses from the domain layer into a format that the outside world can understand.

### Domain

The domain layer is the core of the system. It is responsible for implementing the business logic. It is the only layer that should know about the business rules.

The domain layer should not depend on any other layer. It should also not depend on any external library.

### Infrastructure

The infrastructure layer is responsible for implementing the adapters that allow the system to communicate with the outside world.

## Running the project

To run the project, you need node version 18 or higher and preferably have pnpm installed.

To install the dependencies, run:

```bash
 pnpm install
```

To run the project, run:

```bash
 pnpm dev
```

## Running the tests

The tests have been divided into three categories: unit, integration and e2e.

The builder pattern has been followed to build the instances of the entities. 

The builder pattern is a creational design pattern that allows you to create complex objects step by step. It allows you to produce different types and representations of an object using the same construction code.
Example:
```typescript
  const user = UserBuilder.aUser().withName('John').withAge(30).build();
```

Libraries used:
For unit tests and integration tests: jest and jest-mock-extended (for mocking dependencies)

For e2e tests: cucumber, supertest and jest-mock-extended (for mocking dependencies)

### Unit tests

In the unit tests, use cases are tested in isolation. The use cases use in-memory repositories and the other infrastructure dependencies are mocked.

```bash
 pnpm test:unit
```

### Integration tests

In the integration tests, infrastructure services are tested in isolation.
    
```bash
pnpm test:integration
```

### E2E tests

In the e2e tests, the whole system is tested. The tests use the real infrastructure dependencies.

```bash
pnpm test:e2e
```
