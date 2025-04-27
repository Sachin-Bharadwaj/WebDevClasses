export const users_table = `
CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT null,
    email VARCHAR(255) UNIQUE NOT null,
    password VARCHAR(255) NOT null,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);`

export const addresses_table = `
CREATE TABLE addresses(
id SERIAL PRIMARY KEY,
user_id INTEGER NOT NULL,
city VARCHAR(50) NOT NULL,
country VARCHAR(50) NOT NULL,
street VARCHAR(50) NOT NULL,
pincode VARCHAR(50),
created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE
);`
