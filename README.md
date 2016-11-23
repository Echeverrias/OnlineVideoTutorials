# Online Video Tutorials App
This is an app to do online video tutorials with a chat. 

You can enter in the app as a 'tutor' or as a 'student'.

![alt tag](https://github.com/Echeverrias/OnlineVideoTutorials/blob/1.0.x/src/main/resources/img/OVT%20-%20login.png)
*Figura 1*  <br /><br />



If you enter as a tutor, you'll create a room and get into it.

![alt tag](https://github.com/Echeverrias/OnlineVideoTutorials/blob/1.0.x/src/main/resources/img/OVT%20-%20room.png)
*Figura 2*  <br /><br />



If you enter as a student, you'll go to the 'waiting room' and you could enter in any tutor room you choose.

![alt tag](https://github.com/Echeverrias/OnlineVideoTutorials/blob/1.0.x/src/main/resources/img/OVT%20-%20waiting%20room.png)
*Figura 3*  <br /><br />



In the room you could chat with the rest of users.

![alt tag](https://github.com/Echeverrias/OnlineVideoTutorials/blob/1.0.x/src/main/resources/img/OVT%20-%20room%20chat.png)
*Figura 4*  <br /><br />




## Getting Started
### Prerequisites
You need to install:

- [Maven](http://maven.apache.org/install.html)
- [Bower](https://bower.io/#install-bower)
- [NPM](https://docs.npmjs.com/getting-started/installing-node)
- [TypeScript](https://www.typescriptlang.org/index.html#download-links) 


### Run the project
1. Download the [OnlineVideoTutorialsApp](https://github.com/Echeverrias/OnlineVideoTutorials/tree/1.0.x) project. You can download it as a zip or clone it.
2. Open the terminal, go to the root of the project folder and execute **`mvn spring-boot:run`** to run the app the first time, then you can run it with **`mvn exec:java`**
3. The application starts in the url [http://localhost:8080/](http://localhost:8080/)
4. The app has an embedded H2 database with some users creted by default. You have to introduce one of the following user names: *maria.gil*, *marta.gil*, *monica.gil*; if you want login as a **tutor**. And if you want login as **student** you have to introduce one of these names: *sandra.ruiz*, *raquel.ruiz*, *elena.ruiz*, *laura.ruiz*, *vanesa.ruiz*, *ines.ruiz*, *carmen.ruiz*, *amanda.ruiz*, *lorena.ruiz*. For both user types the password is *'zzz'*, without the quotes.


## Development
The app is being developed in [TypeScript](https://www.typescriptlang.org/) and [Angular 2](https://angular.io/) on the client side and [Spring](https://spring.io/) on the server side.

If you modify some TypeScript file you will have to compile them to create the JavaScript files. To do it, you'll have to open the terminal, go to the OnlineVideoTutorials/src/main/webapp folder and execute **`tsc`**

The app has an embedded H2 database by default with an ['import.sql'](https://github.com/Echeverrias/OnlineVideoTutorials/blob/1.0.x/src/main/resources/import.sql) file located into /src/main/resources/ that initializes a table with some users when the app starts, so to add your own database, whith your users, you have to modify the ['application.properties'](https://github.com/Echeverrias/OnlineVideoTutorials/blob/1.0.x/src/main/resources/application.properties) and change the configuration. You have information about that at the official Spring documentation:
- [Connection to a production database](http://docs.spring.io/spring-boot/docs/current/reference/htmlsingle/#boot-features-connect-to-production-database)
- [Creating and dropping JPA databases](http://docs.spring.io/spring-boot/docs/current/reference/htmlsingle/#boot-features-spring-data-jpa-repositories)

The users of the data base must have the following attributes, an user name, a password, a complete name and an user type ('tutor' or 'student'). By default the names of the columns would be called 'user_name', 'password', 'name' and 'user_type', without the quotes, and the table would be named 'users'. Making changes in the annotations of the [User.class](https://github.com/Echeverrias/OnlineVideoTutorials/blob/1.0.x/src/main/java/org/jaea/onlinevideotutorials/domain/User.java) attributes you could change the default columns names.  



