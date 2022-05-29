# ecos12-chat-backend

# TO-DO

- [ ] Return all online clients to client connection
- [ ] Generate a JWT token for each client and send it to the client
- [ ] Create groups router

# Dependencies

- Node.js
- Sqlite3
- Yarn

# How To Run

1. In the root folder, install the dependencies:

```
$ yarn
```

2. Create de database using the Sqlite3:

```
$ sqlite3 chat.db < chat.sql < seeder.sql
```

3. Compile the project:

```
$ yarn tsc
```

4. Run the project using the following command:

```
$ yarn start
```
