<h1 align="center">
    Hexagonal Architecture, DDD in NodeJS with TypeScript
</h1>

## Project explanation
This repository is based on [CodelyTV courses](https://github.com/CodelyTV/).

## Main Packages that have been used in this project.
<ul>
  <li><a href="https://koajs.com/">Koa</a></li>
  <li><a href="https://github.com/inversify/InversifyJS">InversifyJS</a></li>
  <li><a href="https://www.npmjs.com/package/routing-controllers">routing-controllers</a></li>
  <li><a href="https://www.npmjs.com/package/amqplib">amqplib</a></li>
</ul>

### Development Environment setup
<ol>
  <li><a href="https://www.docker.com/get-started"> Install Docker</a></li>
  <li>Run "docker-compose up"</li>
</ol>

###Testing<hr>
```
# Will run all unit tests (./tests/Contexts/**/Application/*.ts)
npm run test:unit

# Will run all integration tests (./tests/Contexts/**/Integration/*.ts)
npm run test:integration

# Will run all acceptance tests (./tests/Apps/**/*.feature)
npm run test:acceptance 
```


### Execution
Send a POST request to http://localhost:3000/api/dummy/save/ with the parameters established in [DummyCreatorRequest](src/Contexts/MyApp/Dummy/Application/Create/DummyCreatorRequest.ts)

### Synchronous application flow

<p align="center">
  ![Application request flow]
    (docs/RequestFlow.png?raw=true)
</p>
