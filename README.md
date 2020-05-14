[![Codacy Badge](https://img.shields.io/badge/Code%20Quality-D-red)](https://img.shields.io/badge/Code%20Quality-D-red)

# Good health and well-being
Good health and well-being is one of Sustainable Development Goals(SDG) challenges. The aims of this application is to provide solutions that can help avoid, alert, inform, monitor and report road injuries and deaths.


# Why
This aims to ensure health and well-being for all, at every stage of life. While there has been significant improvement in global health in the last two decades, further progress is needed. Over the last 15 years, the number of childhood deaths has been cut in half. This proves that it is possible to win the fight against almost every disease. Still, we are spending an astonishing amount of money and resources on treating illnesses that are surprisingly easy to prevent. The new goal for worldwide Good Health promotes healthy lifestyles, preventive measures and modern, efficient healthcare for everyone.

# Usage
<b> Heroku: </b> https://roadry.herokuapp.com/
<b> API documentation: </b> https://example.app/doc

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

## Authors
- [Kelechi Oliver](https://github.com/Oliver-ke)
- [Sikiru Moshood](https://github.com/sikiru-moshood)
- [Alimi Kehinde M](https://github.com/marusoft)
- [Nnaemeka Augustine Okpallannuozo](https://github.com/MekkyMayata)
- Sadranyi
- Femi Akinsiku
List the team behind this project. Their names linked to their Github, LinkedIn, or Twitter accounts should siffice. Ok to signify the role they play in the project, including the TTL and mentor

## LICENSE
MIT

