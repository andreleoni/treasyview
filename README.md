# treasyview

### Stack

##### Backend
* Java 8
* Maven
* Hibernate
* Jax-RS
* MySql
* Docker-compose to MySql database and PHPMyAdmin to Manage this

##### FrontEnd
* Angular 1.6
* Angular-ui-tree
* PureJavascript
* JQuery
* Notify.js
* Tooltipster

### Preview

[![Screen_Shot_2018-01-06_at_22.49.10.png](https://s18.postimg.org/3nwxe0nh5/Screen_Shot_2018-01-06_at_22.49.10.png)](https://postimg.org/image/u8zg9kpud/)

### Run the project with
1 - Create the database with the name "treasyview" in MYSQL (I created a docker-compose file in the Backend folder, case dont have mysql installed on the machine.);
  
2 - Run the SQL name "table.sql" with the columns of project;

3 - Run the .war file on a Tomcat 9 in 8080 port;

4 - Open index page on "frontend" folder;

### Pendent Tasks: 
* Adjust send POST file (Currently are sending by URL Query, and the correct is like Form of $http Angular Request)
