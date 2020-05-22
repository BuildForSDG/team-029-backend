[![Codacy Badge](https://img.shields.io/badge/Code%20Quality-D-red)](https://img.shields.io/badge/Code%20Quality-D-red)

# Good health and well-being
Good health and well-being is one of Sustainable Development Goals(SDG) challenges. The aims of this application is to provide solutions that can help avoid, alert, inform, monitor and report road injuries and deaths.


# Why
This aims to ensure health and well-being for all, at every stage of life. While there has been significant improvement in global health in the last two decades, further progress is needed. Over the last 15 years, the number of childhood deaths has been cut in half. This proves that it is possible to win the fight against almost every disease. Still, we are spending an astonishing amount of money and resources on treating illnesses that are surprisingly easy to prevent. The new goal for worldwide Good Health promotes healthy lifestyles, preventive measures and modern, efficient healthcare for everyone.

# Usage
<b> Heroku: </b> https://roadry.herokuapp.com/
<br/><b> API documentation: </b> https://example.app/doc

## Technologies

Modern JavaScript technologies were adopted in this project

ES2015: Also known as ES6 or ECMASCRIPT 6, is a new and widely used version of Javascript
that makes it compete healthily with other languages. See [here](https://en.wikipedia.org/wiki/ECMAScript) for more infromation.

NodeJS: Node.js is an open-source, cross-platform JavaScript run-time environment which allows you enjoy the features of Javascript off the web browsers and implement server-side web development.
Visit [here](https://nodejs.org/en/) for more information.

ExressJS: This is the web application framework for Node.js
Visit [here](https://expressjs.com) for more information

Postgres Database: PostgreSQL is a powerful, open source object-relational database system with over 30 years of active development that has earned it a strong reputation for reliability, feature robustness, and performance.

Codes are written in accordance with Airbnb JavaScript style guide, see [here](https://github.com/airbnb/javascript) for details.

# Setup

## Prerequisites
Ensure you have the following installed on your local machine:

- [NodeJS](https://nodejs.org/en/download/)
- [PostgreSQL](https://www.postgresql.org/download/)

## Installation

1. Clone this repository into your local machine:
```
git clone https://github.com/BuildForSDG/team-029-backend.git
```
2. Navigate into the cloned repository in your machine:
```
cd team-029-backend
```
3. Install all dependencies by running.
```
npm install
```
4. Create a `database` by running
 ```bash
    createdb -h localhost -p 5432 -U postgres dev_db_name
  ```
  `Replace dev_db_name with the name of development database`

5. Create a `.env file` in the root directory and setup your database credentials and token/secret key. Check `.env.example` for instruction.

6. Start the application by running
```
npm run start
```
7. Install and use `postman` to test all endpoints

## Testing

1. Create a `database` by running

  ```bash
    createdb -h localhost -p 5432 -U postgres test_db_name
  ```
  `Replace test_db_name with the name of test database`

2. Run test using `npm run test` 

### API ENDPOINTS

#### Authentication

| URI                              | HTTP Method | Description       |
| -------------------------------- | ----------- | ----------------- |
| <code>/api/v1/auth/register</code> | `POST`    | Registers a new user |
| <code>/api/v1/auth/login</code> | `POST`       | Logs in a user |

#### API Routes

| URI                                                     | HTTP Method | Description                               |
| ------------------------------------------------------- | ----------- | ----------------------------------------- |
| <code>/api/v1/users</code>                              | `GET`       | Fetch all Users                           |


## Authors
- [Kelechi Oliver](https://github.com/Oliver-ke)
- [Sikiru Moshood](https://github.com/sikiru-moshood)
- [Alimi Kehinde M](https://github.com/marusoft)
- [Nnaemeka Augustine Okpallannuozo](https://github.com/MekkyMayata)
- [Sanya Odare]()
- [Samuel Adranyi](https://github.com/sadranyi)
- Femi Akinsiku

## LICENSE
MIT

