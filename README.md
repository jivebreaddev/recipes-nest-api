# recipes-nest-api [Nest.js 로 만들어보는 REST API]

## Architecture
![3  Architecture Diagram drawio](https://user-images.githubusercontent.com/89639413/186843762-9af69032-eba4-4721-9ebd-d2a92509877e.png)

## REST API Design
![1  REST API Architecture](https://user-images.githubusercontent.com/89639413/186843582-7f3978a4-2240-44bf-bb14-85c077cbdeb8.png)

## CI 구성
![2  CI구성](https://user-images.githubusercontent.com/89639413/186843615-392362ce-05c0-4aa9-8dc6-c140206ec636.png)

## 구현된 기능들과 배웠던 부분들
 **1. REST API**
  - TypeORM Module 사용하기
  - ormconfig.json, ormconfig.js로 설정하기
  - ManytoOne Entity 적용
  - DTO 적용하기
  - DI container 적용하기
  - .env file 적용하는것
  
 **2. Github Action으로 CI [이미지 빌딩, ECR로 푸시]**
  - Github Actions 사용법
  
 **3. Jest Unit Test**
 - Mock
 - auto Mocking
 
 **4. GraphQL**
  - GraphQL에 대한 Concept[Resolver, graphql schema]
  
 **5. Docker Compose**
  - .env settings
   
 **6. Auth with Jwt Token && Cookie**
  - Passport.js 라이브러리 사용법
  - Useguards
  - Nest Req 핸들링 파이프라인 
  
 **7. Swagger [OpenAPI]**
 
## 사용하시기전
1. env.dev이 필요합니다. 해당 커맨드를 Root Directory에서 실행해주시고 docker-compose up 해주시면 됩니다.
```
$ touch ../recipe-api/env.dev
$ echo "NODE_ENV=dev
DB_USER=user
DB_PASSWORD=secret
POSTGRES_DB_PREFIX=db
DB_SCHEMA=dev.sqlite
DB_HOST=postgres
DB_PORT=5432
JWT_SECRET=1asadf324" >> ../recipe-api/env.dev
