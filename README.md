# Online Video Tutorials App
This is an app to do online video tutorials with a chat. You can enter in the app as a 'tutor' or as a 'student'.
![alt tag](https://github.com/Echeverrias/OnlineVideoTutorials/blob/1.0.x/src/main/resources/img/OVT%20-%20login.png)

If you enter as a tutor, you'll create a room and get into it.
![alt tag](https://github.com/Echeverrias/OnlineVideoTutorials/blob/1.0.x/src/main/resources/img/OVT%20-%20room.png)

If you enter as a student, you'll go to the 'waiting room' and you could enter in the room of the tutor you choose.
![alt tag](https://github.com/Echeverrias/OnlineVideoTutorials/blob/1.0.x/src/main/resources/img/OVT%20-%20waiting%20room.png)

In the room you could chat with the rest of users.
![alt tag](https://github.com/Echeverrias/OnlineVideoTutorials/blob/1.0.x/src/main/resources/img/OVT%20-%20room%20chat.png)


## Getting Started
### Prerequisites
You need to install:

- [Maven](http://maven.apache.org/install.html)
- [NPM](https://docs.npmjs.com/getting-started/installing-node)
- [Bower](https://bower.io/#install-bower)


### Run the project
1. Download the [OnlineVideoTutorialsApp](https://github.com/Echeverrias/OnlineVideoTutorials/tree/1.0.x) project. You can download it as a zip or clone it.
2. You have to provide an implementation for the method '*getAnUser*' from the */src/main/java/org/jaea/onlinevideotutorials/services/UniversityBBDD.java* class, to get from a database the user that the client wants to validate. Maybe you will also need to add some class.
3. Open the terminal, go to the root of the project folder and execute **`mvn spring-boot:run`** to run the app the first time, then you can run it with **`mvn exec:java`**
4. The application starts in the url [http://localhost:8080/](http://localhost:8080/)


