CREATE TABLE users_tab (
	user_id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
	first_name VARCHAR(255) NOT NULL,
	last_name VARCHAR(255) NOT NULL,
	user_name VARCHAR(255) NOT NULL UNIQUE,
	password_hash VARCHAR(255) NOT NULL,
	is_admin BOOLEAN NOT NULL
);

CREATE TABLE events_tab (
	event_id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
	title VARCHAR(255) NOT NULL,
	description TEXT NOT NULL,
	event_date DATE NOT NULL,
	location VARCHAR(255) NOT NULL,
	category VARCHAR(255) NOT NULL
);

CREATE TABLE registers_tab (
	user_id BIGINT UNSIGNED,
	event_id BIGINT UNSIGNED,
	PRIMARY KEY(user_id, event_id)
);

CREATE TABLE likes_tab (
	user_id BIGINT UNSIGNED,
	event_id BIGINT UNSIGNED,
	created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY(user_id, event_id)
);

CREATE TABLE comments_tab (
	user_id BIGINT UNSIGNED,
	event_id BIGINT UNSIGNED,
	created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	content TEXT NOT NULL,
	PRIMARY KEY(user_id, event_id, created_at)
);

CREATE TABLE photos_tab (
	event_id BIGINT UNSIGNED,
	photo_url VARCHAR(255),
	PRIMARY KEY(event_id, photo_url)
);