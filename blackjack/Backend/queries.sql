CREATE TABLE blackjack.users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(35),
    password VARCHAR(100),
    UNIQUE(email)
);
