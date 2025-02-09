# Blackjack React App

A Blackjack game built using React, JavaScript, HTML, CSS, Express, and MySQL.

## Overview

![image](https://github.com/jiali1118/blackjack/assets/107276305/f907f4f0-6c74-490d-907e-22d75a43bc44)

This is a Blackjack game written in React.js, using API calls from the Deck of Cards API to render basic cards based on game action.

## Features

- User authentication
- Single Player Blackjack Game
- Generate cards from an external API
- Functions to handle each game phase such as deal hand, hit, double, and stand
- Manipulate DOM elements to display cards and the score of each hand
- Logic functions to determine the winning hand and update the player's balance

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/jiali1118/blackjack.git

   ```

2. Navigate to project directory:
   ```bash
   cd blackjack
   ```
3. Install required libraries:
   ```bash
   npm install
   ```
4. Start Application:
   ```bash
   npm start
   ```

## Setting Up Server/Database (Not Required to Play Game)

**Install MySQL Workbench**

1. Create a schema named `blackjack`.
2. Create a table named `users` using the following command:

   ```sql
   CREATE TABLE users (
     id int NOT NULL AUTO_INCREMENT,
     email varchar(35) DEFAULT NULL,
     password varchar(100) DEFAULT NULL,
     player_balance int DEFAULT '1000',
     highest_balance int DEFAULT '0',
     PRIMARY KEY (id),
     UNIQUE KEY email (email)
   ) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

   ```

3. Cd blackjack/Backend

- Change .env file “PASSWORD” to your corresponding password on mysqlworkbench

4. Install required libraries:

   ```bash
   npm install
   ```

5. Start Backend
   ```bash
   node index.js
   ```
6. Check if localhost:8800 is connected

- Enabling register and login
- Enable storage of user data

## Collaborator:

- Jia Liang Li
- Richard Kwong
