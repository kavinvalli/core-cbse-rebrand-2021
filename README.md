# CBSE Portal
This portal was made for Core Hackathon 2021
## Features
1. Marks DB of all students (can be visited by teacher)
2. Attendance marking

## Setup Instructions
1. Clone Repository
2. Change env vars
```sh
cp .env.example .env
```
And change the env vars accordingly
3. Install dependencies
```sh
npm i
```
4. Run DB Migrations
```sh
node ace migrations:run
```
5. Seed DB
```sh
node ace db:seed
```
6. Run Application
```sh
npm run dev
```
