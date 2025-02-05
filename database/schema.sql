CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100),
    email VARCHAR(100),
    role ENUM('employee', 'manager'),
    manager_id INT,
    FOREIGN KEY (manager_id) REFERENCES users(id)
);

CREATE TABLE performance_metrics (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    date DATE,
    hours_worked DECIMAL(5,2),
    tasks_completed INT,
    efficiency_rate DECIMAL(5,2),
    performance_score DECIMAL(5,2),
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE teams (
    id INT PRIMARY KEY AUTO_INCREMENT,
    manager_id INT,
    name VARCHAR(100),
    FOREIGN KEY (manager_id) REFERENCES users(id)
);

CREATE TABLE team_members (
    team_id INT,
    user_id INT,
    FOREIGN KEY (team_id) REFERENCES teams(id),
    FOREIGN KEY (user_id) REFERENCES users(id),
    PRIMARY KEY (team_id, user_id)
);
