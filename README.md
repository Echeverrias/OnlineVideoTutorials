# Online Video Tutorials App
This is an app to do online video tutorials. It allows you register in it, chat with the others participants, shares files and view pdf files. 

You can register in the app as a 'tutor' or as a 'student'.

![alt tag](https://github.com/Echeverrias/OnlineVideoTutorials/blob/2.0.0/src/main/resources/img/OVT%20-%20sign%20up.png)
       *Figure 1*  <br /><br />

![alt tag](https://github.com/Echeverrias/OnlineVideoTutorials/blob/2.0.0/src/main/resources/img/OVT%20-%20sign%20up2.png)
       *Figure 2*  <br /><br />


You can enter in the app and modify your profile.

![alt tag](https://github.com/Echeverrias/OnlineVideoTutorials/blob/2.0.0/src/main/resources/img/OVT%20-%20sign%20in.png)
       *Figure 3*  <br /><br />

![alt tag](https://github.com/Echeverrias/OnlineVideoTutorials/blob/2.0.0/src/main/resources/img/OVT%20-%20edit%20your%20profile.png)
       *Figure 4*  <br /><br />


If you are registered as a tutor, you can create a room and get into it.

![alt tag](https://github.com/Echeverrias/OnlineVideoTutorials/blob/2.0.0/src/main/resources/img/OVT%20-%20tutor%20waiting%20room.png)
       *Figure 5*  <br /><br />



If you are registered as a student, you'll go to the 'waiting room' and you could enter in any tutor room you choose.

![alt tag](https://github.com/Echeverrias/OnlineVideoTutorials/blob/2.0.0/src/main/resources/img/OVT%20-%20waiting%20room2.png)
       *Figure 6*  <br /><br />



In the room you could chat with the rest of users.

![alt tag](https://github.com/Echeverrias/OnlineVideoTutorials/blob/2.0.0/src/main/resources/img/OVT%20-%20room%20chat.png)
       *Figure 7*  <br /><br />



You could share files with the other participants.

![alt tag](https://github.com/Echeverrias/OnlineVideoTutorials/blob/2.0.0/src/main/resources/img/OVT%20-%20sharing%20files.png)
       *Figure 8*  <br /><br />



You could visualize pdf files.

![alt tag](https://github.com/Echeverrias/OnlineVideoTutorials/blob/2.0.0/src/main/resources/img/OVT%20-%20visualizing%20pdfs.png)
       *Figure 9*  <br /><br />       




## Getting Started
### Prerequisites
You need to install:

- [Kurento](http://doc-kurento.readthedocs.io/en/stable/installation_guide.html)
- [Maven](http://maven.apache.org/install.html)
- [Bower](https://bower.io/#install-bower)
- [NPM](https://docs.npmjs.com/getting-started/installing-node)
- [TypeScript](https://www.typescriptlang.org/index.html#download-links) 


### Run the project
1. Download the [OnlineVideoTutorialsApp](https://github.com/Echeverrias/OnlineVideoTutorials/tree/1.0.x) project. You can download it as a zip or clone it.
2. Open the terminal and start kurento media server: **`sudo service kurento-media-server-6.0 start`** 
3. Go to the root of the project folder and execute **`mvn spring-boot:run`** to run the app.
4. The application starts in the url [http://localhost:8080/](http://localhost:8080/)
5. The app has an embedded H2 database. If you want to use a mysql database you will have to modify the application-mysql.properties file located into /src/main/resources/. By default you use a database called 'OVT' in port 3306, with 'root' as username and password. Yo have to execute **`mvn spring-boot:run -Dspring.profiles.active=mysql`** to use the mysql database.

#### Run the app on docker
You'll need to install [docker](https://docs.docker.com/engine/installation/) and [docker-compose](https://docs.docker.com/compose/install/). Then download the [docker-compose.yml](https://github.com/Echeverrias/OnlineVideoTutorials/blob/2.0.0/docker-compose.yml) file and finally open the terminal, go to the folder in which the file is and execute the command: **`docker-compose up -d`**, the application starts in the url http://localhost:8080/ovt. You'll need to execute **`docker-compose stop`** to stop the app.


## Development
The app is being developed in [TypeScript](https://www.typescriptlang.org/) and [Angular 2](https://angular.io/) on the client side and [Spring](https://spring.io/) on the server side.

If you modify some TypeScript files you will have to compile them to create the JavaScript files. To do it, you'll have to open the terminal, go to the OnlineVideoTutorials/src/main/webapp folder and execute **`tsc`**

The app has an embedded H2 database by default, so to add your own database, whith your users, you have to modify the application.properties file which is located into /src/main/resources/ and change the configuration. You have information about that at the official Spring documentation:
- [Connection to a production database](http://docs.spring.io/spring-boot/docs/current/reference/htmlsingle/#boot-features-connect-to-production-database)
- [Creating and dropping JPA databases](http://docs.spring.io/spring-boot/docs/current/reference/htmlsingle/#boot-features-spring-data-jpa-repositories)

The users of the data base must have the following attributes: an user name, a password, a complete name and an user type ('tutor' or 'student'). By default the names of the columns would be called 'user_name', 'password', 'name' and 'user_type', without the quotes, and the table would be named 'users'. Making changes in the annotations of the [User.class](https://github.com/Echeverrias/OnlineVideoTutorials/blob/2.0.0/src/main/java/org/jaea/onlinevideotutorials/domain/User.java) attributes you could change the default columns names.  
