CREATE TABLE Users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  registry INTEGER NOT NULL UNIQUE,
  nickname text NOT NULL,
  password text NOT NULL,
  token text UNIQUE,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
  deleted_at DATETIME
);

CREATE TABLE BlockedUsers (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  blocked_user_id INTEGER NOT NULL,
  FOREIGN KEY (user_id) REFERENCES Users (id),
  FOREIGN KEY (blocked_user_id) REFERENCES Users (id)
);

CREATE TABLE Conversations (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  creator_id INTEGER NOT NULL,
  title text,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
  deleted_at DATETIME,
  FOREIGN KEY (creator_id) REFERENCES Users (id)
);

CREATE TABLE Messages (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  conversation_id INTEGER NOT NULL,
  sender_id INTEGER NOT NULL,
  content text NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
  deleted_at DATETIME,
  FOREIGN KEY (conversation_id) REFERENCES Conversations (id),
  FOREIGN KEY (sender_id) REFERENCES Users (id)
);

CREATE TABLE Participants (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  conversation_id INTEGER NOT NULL,
  user_id INTEGER NOT NULL,
  FOREIGN KEY (conversation_id) REFERENCES Conversations (id),
  FOREIGN KEY (user_id) REFERENCES Users (id)
);

CREATE TABLE Actions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  participant_id INTEGER NOT NULL,
  message_id INTEGER NOT NULL,
  received boolean DEFAULT FALSE,
  read boolean DEFAULT FALSE,
  liked boolean DEFAULT FALSE,
  FOREIGN KEY (participant_id) REFERENCES Participants (id),
  FOREIGN KEY (message_id) REFERENCES Messages (id)
);