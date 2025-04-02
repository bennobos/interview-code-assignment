# Questions

After completing the implementation tasks, please answer the following questions about the codebase:

## 1. Code Quality and Maintainability

What improvements would you suggest for the codebase regarding code quality, structure, and maintainability? List at least 3 specific suggestions.

> 1. Enable linting to enforce coding-style in the team / codebase.
> 2. Use DTO's so the services don't rely on request.body; a service should not be aware of controler-logic (eg. express)
> 3. Add a pipeline to automate linting + unit testing.

## 2. TypeScript-specific Improvements

What TypeScript-specific features or patterns could be better utilized in this codebase? Please provide code examples for your suggestions.

> 1. Use types/interfaces instead of `any` to make the code easier to read & maintain. Let the TS compiler do the work :)
> 2. Use  "Strict Type Checking" in tsconfig.json (e.g., strictNullChecks, noImplicitAny) to catch potential issues early.
> 3. Use `readonly` keyword for immutable properties (for instance id's + timestamps).
> 4. Use decorators for validation of input data from the API.

## 3. Error Handling

How would you improve the error handling in this application? Provide specific examples of where and how you would implement better error handling.

> 1. For instance the operation to replace a warehouse can have multiple causes why it fails. Instead returning a single error (for instance 'replacement warehouse is in a different location') if's more user-friendly to return all errors in the same response (eg. also capacity + stock validation issues). This makes it less of a trial-and-error for the consumer.
> 2. Differentiate between 'unexpected errors' (eg. database timeout) that a user cannot do anything to fix and 'user errors' (eg. field xyz is mandatory). The current approach relies on database logic (using Sequelize) to validate user-input (for instance if a location exists, using a FK constraint). If this is not valid, it is returned as a 500-error to the consumer who doesn't have a clue what the real issue is.

## 4. Performance Optimization

If this application needed to handle 10x more load, what performance optimizations would you suggest? Focus on both database operations and API responses.

> 1. The API is focused on data-retrieval; a good scenario to handle a lot of request is by horizontally scaling the database with multiple read-replicas.
> 2. The current API returns the entire database record to the consumer. This can be optimized to return a subset of the fields that are required by the consumer.
> 3. Operations that return 'all products' will become a bottleneck; it's better to use some form of pagination, where for instance max. 10 records are return for a single call.
> 4. If database performance becomes an issue, it's worth investigating some sort of caching strategy.

## 5. Architecture Evolution

If you were to evolve this monolithic application into a microservices architecture, how would you split the services? Explain your reasoning and what communication patterns you would use between services. 

> The project uses a Domain-Driven approach since it's grouping functionalities (store, warehouse, etc). This makes it easier to move parts to it's own (micro)service when the need arises. So, for instance the `warehouse` functionality could be migrated to a seperate microservice. Micro-services should be designed as independent services, so with it's own database. To enforce strong consistency, which is required for warehouse management, it's not possible to use a database transaction. These type of changes are low in volume, but require strong consistency. This can be achieved using two-phase commit distributed transaction across micro-services.
