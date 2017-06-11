#!/bin/bash
./wait-for-it.sh -t 15 mysql-container:3306 -- catalina.sh run
