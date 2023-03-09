Hexagonal Architecture is a software architecture pattern
that aims to create a clear separation between the business logic
and the infrastructure.

The idea is to have the business logic at the center and the 
infrastructure on the outside. The business logic should not 
depend on the infrastructure, and the infrastructure should not
depend on the business logic.

This is a sample project that follows this architecture. 

- [Running the project](#running-the-project)
- [Running the tests](#running-the-tests)
- [Dependency injection](#dependency-injection)
- [Routes](#routes)


### Running the project

To run the project, you need node version 18 or higher and preferably have pnpm installed.

To install the dependencies, run:

```bash
 pnpm install
```

To start the server in development mode, run:

```bash
 pnpm dev
```

To start the server in production mode, run:

```bash
 pnpm start
```

### Running the tests

The tests have been divided into three categories: unit, integration and e2e.

The builder pattern has been followed to build the instances of the entities. 

The builder pattern is a creational design pattern that allows you to create complex objects step by step.
It allows you to produce different types and representations of an object using
the same construction code.
Example:
```typescript
  const user = UserBuilder.aUser().withName('John').withAge(30).build();
```

Libraries used:
For unit tests and integration tests: jest and jest-mock-extended (for mocking dependencies)

For e2e tests: cucumber, supertest and jest-mock-extended (for mocking dependencies)

#### Unit tests

In the unit tests, use cases are tested in isolation. 
The use cases use in-memory repositories and the other infrastructure 
dependencies are mocked.

```bash
 pnpm test:unit
```

#### Integration tests

In the integration tests, infrastructure services are tested in isolation.
    
```bash
pnpm test:integration
```

#### E2E tests

In the e2e tests, the whole system is tested. The tests use the real infrastructure dependencies.

```bash
pnpm test:e2e
```

### Dependency Injection
The [DIOD](https://github.com/artberri/diod) library has been used to manage dependencies.

DIOD is a library that allows defining and resolving dependencies between 
different parts of the application in a simple and maintainable way.

To use DIOD it is necessary to decorate the classes with the decorators located 
in **[Shared/Domain/Decorators](https://github.com/arnold095/NodeJS-DDD-skeleton/tree/main/src/Contexts/Shared/Domain/Decorators)**

Decorators allow DIOD to emit metadata about the dependencies of your classes, 
thus allowing you to resolve dependencies at runtime without having to explicitly
define each dependency. This library uses reflection to determine your dependencies.

#### How to use DIOD in this project
To avoid having to register the services one by one, the decorators have been used
to accumulate the dependencies in an array. In this way it is possible to go through
this array when the server is up and declare the dependencies automatically.

Example:
View the file **[UseCaseDecorator](https://github.com/arnold095/NodeJS-DDD-skeleton/tree/main/src/Contexts/Shared/Domain/Decorators/UseCaseDecorator.ts)**

```typescript
export const useCases = new Set<Class<unknown>>(); // Set of use cases
export const isUseCase = (): Class<unknown> => {
    return <TFunction extends Class<unknown>>(target: TFunction): TFunction => {
        useCases.add(target);

        return target;
    };
};

@isUseCase()
class CreateUser {
    public constructor(
        private readonly repository: UserRepository,
        private readonly eventBus: EventBus
    ) {}
}
```
Loading the dependencies in the server:
```typescript
const registerUseCases = (container: Container): void => {
  for (const useCase of useCases) {
    container.register(useCase).use(useCase as NewableClass<unknown>);
  }

  container.build()
};
```
**Important:**

To get the automatic registration of services and dependencies to work correctly,
it is necessary to load the files, as the decorators are executed when the file 
is imported.

Example view the file **[FilesLoader](https://github.com/arnold095/NodeJS-DDD-skeleton/blob/main/src/Apps/Shared/Config/Di/Loaders/FilesLoader.ts)**

```typescript
export const filesLoader = async (): Promise<void> => {
    const files = sync([
        paths.controllers,
        paths.useCases,
        paths.eventHandlers,
        paths.infrastructureServices,
    ]);

    await Promise.all(files.map(file => import(file)));
};
```

### Routes
@isController() is used to define the routes in a project. 
The arguments accepted by this decorator are **method, path, middlewares and schema.**

They are used to configure and define each route in a precise and detailed way. 
This allows the creation of robust and well-structured routes in the project.

Example:
```typescript
@isController({
    method: 'post',
    path: '/posts',
    middlewares: [bodyParser.json(), bodyParser.urlencoded({ extended: true })],
    schema: {
        body: {
            type: 'object',
            properties: {
                name: { type: 'string' },
                description: { type: 'string' },
            },
            required: ['name', 'age'],
        },
    },
})
export class CreatePostController extends BaseController {
    public constructor(private readonly useCase: CreatePost) {
        super();
    }

    public async run(req: Request, res: Response): Promise<void> {
        await this.useCase.run(req.body);

        this.sendOk();
    }
}
```
- **method:** Defines the HTTP method of the route.
- **path:** Defines the path of the route.
- **middlewares:** These are middlewares that are executed in the Fastify preHandler hook just before reaching the defined route.
- **schema:** the schema argument is used to define the HTTP 
request body and to validate the input using the validation provided by **[Fastify](https://www.fastify.io/docs/latest/Reference/Validation-and-Serialization/#adding-a-shared-schema).**
