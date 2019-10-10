# CV-Application-2109

## Requirements
 * Node v8.16.1(lts/carbon) - *will not work for later versions*.
 * MongoDB (3.6.3+ Community Edition)

## Getting Started
- Install gulp and bower globaly.
```
npm install -g bower
npm install -g gulp
```

- Installing dependacies in client.
```
cd client
npm install
bower install
``` 

- Installing dependacies in server.
```
cd ../server
npm install
bower install
```

- Configure the server. 
  - Create configuration file `\server\app\config\conf.js`.
  - add parameters to `conf.js` file.
    ```
    module.exports = {
        secret:"your--secret",
        database:"mongodb://username:password@URL:PORT/database"
    };
    ```

- start the server (in the `\server` directory).
```
gulp server:start
```
Site will be served at `http://localhost:3000/`. check the app using a browser of your choice.

## Restore Sample Database
 - sample database is in `\database-sample\dump.zip`.
 - unzip the `dump.zip` to `\database-sample\dump`.
 - restore monogDB database (while in the `\database-sample\dump` directory).

```
mongorestore -d ucsc-cvapp-2017 ucsc-cvapp-2017 
```
 - Use `mongodb://localhost:27017/ucsc-cvapp-2017` for `database` in `\server\app\config\conf.js` file.
 - User logins are given in `\database-sample\user-logins.csv`
 file.
## User Manual
- [User Manual [Draft]](https://docs.google.com/document/d/10dQ9MYcb_vasZhgwbW_00qagwAVry0pioGxKDAn_vA8/edit?usp=sharing)