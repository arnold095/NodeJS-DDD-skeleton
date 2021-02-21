<h1 align="center">
    Hexagonal Architecture, DDD in NodeJS with TypeScript
</h1>

<h2>Main Packages that have been used in this project.</h2>

<ul>
  <li><a href="https://github.com/inversify/InversifyJS">InversifyJS</a></li>
  <li><a href="https://koajs.com/">Koa</a></li>
  <li><a href="https://www.npmjs.com/package/routing-controllers">routing-controllers</a></li>
  <li><a href="https://github.com/ilearnio/module-alias">module-alias</a></li>
  <li><a href="https://www.npmjs.com/package/uuid">Uuid</a></li>
</ul>

<h2>Development Environment setup</h2>
<ol>
  <li><a href="https://www.docker.com/get-started"> Install Docker</a></li>
  <li>Run "docker-compose up" (Will install a NodeJS and Redis container.)</li>
</ol>

### Execution
Send a POST request to http://localhost:3000/api/dummy/save/ with the parameters established in [DummyCreatorRequest](src/Contexts/MyApp/Dummy/Application/Create/DummyCreatorRequest.ts)

## Project explanation
This repository is based on [CodelyTV courses](https://github.com/CodelyTV/)

### Domain events
A synchronous domain event has been implemented that sends an email when a resource is created.
