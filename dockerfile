# Pull base image
From java:8

MAINTAINER Juan Antonio Echeverrías Aranda, https://github.com/Echeverrias/OnlineVideoTutorials/tree/1.0.x

VOLUME /tmp

ADD /target/OnlineVideoTutorials-1.0.0-SNAPSHOT.war ovt.war

ENV SPRING_PROFILES_ACTIVE docker

EXPOSE 8080

ENTRYPOINT ["java", "-Djava.security.egd=file:/dev/./urandom","-jar","/ovt.war"]




