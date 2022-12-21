

#  FollwersReactSpringApp
FollwersReactSpringApp is Full Stack App 


App Build with Spring Framework as Back-End And React as Front-End .




1 Getting Started
```sh

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.
```


2 Prerequisites

```sh
2.1 Node.js

You can Download from this link : 
https://nodejs.org/en/download/

2.2 Java JDK
https://www.oracle.com/java/technologies/javase-downloads.html

2.3 Integrated development environment I suggest intellij or Eclipse for backend and WebStorm Or Visual Studio Code For the front-end . 

Download intellij:
https://www.jetbrains.com/idea/download/

Download Eclipse:
https://www.eclipse.org/downloads

Download Webstorm
https://www.jetbrains.com/webstorm/download/#section=windows

Download Visual studio code:
https://code.visualstudio.com/download

2.4 Database Management i suggest MySql . 

Download MySql:
https://www.mysql.com/downloads/

```


3 Installing



3.1 Install the required Prerequisites
```sh
1- Import the back-end and go to src\main\resources\application.properties
-   In application.properties you should replace 
    spring.datasource.username=YOUR USERNAME
    spring.datasource.password=YOUR PASSWORD
-After that you can run the project 

2- - Import the front-end and run :
-   npm install     [for install all the requirement library ]
-   npm start     [for strat the project ]
-   

    
```

4 notes

```sh

For Authentication we have 2 options in AAD:
1. SAML based: in this process 2 basic URLs are required from application team(Entity/identifier URL and Reply/Assertion URL).Once URLs configured in AAD, 3URLs(Identifier, Log-in and logout) will be shared that need to be configured in application. Authentication parameter passed for verification between app and AAD will be email.
2. OAuth: Application need to share reply URLs. AAD will share the information(client id, certificate, tenant id, Oauth token endpoint/metadata) required by app team that need to be configured in app.

We need to use Microsoft Azure AD libraries and they open source


There are a few backend apis, I will send you the info in a few. One api is maintained for the application data , a separate one for the authentication and a separate data api. The application maintains its own user table. Give me a few I will send you info.






https://learn.microsoft.com/en-us/azure/active-directory/hybrid/how-to-connect-pta-upgrade-preview-authentication-agents


Request Number : REQ0023975


```




