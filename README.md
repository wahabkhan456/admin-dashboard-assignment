### Geting Started

### installation

    if you have docker setup
    then just do

    docker-compose up

    it will install all the packages and also start server and client too

    OTHERWISE

    install packages in server by doing in main directory ==> npm i

    to install packages of frontend ==> cd client and then npm i

    To start server => nodemon server.js

    to start web => npm start

    to run test ==> npm run test

### ADMIN Credentials

email :: admin@gmail.com
password :: 12345

### Execution

In browser go to localhost:3000 and login as admin by above credentails.

Now go to Create New User Tab create new user.

you can see on dashboard the newly create user has status unauthorized means when he login he can not
simply go to dashboard but he will prompted with screen where he has to enter full name and company name.

Now open another tab here you can login using newly created user credentails here you have to enter
full name and company name. once you have eneterd the information. Now request will be sent to admin and if admin
will accept it user will be on dashboard other wise back to login screen. untill than user has to wait in pending.
