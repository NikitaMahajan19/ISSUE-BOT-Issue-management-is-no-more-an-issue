# Problem Statement:

In the software development life cycle, GitHub plays a prominent role to collaborate with multiple developers. One of the major features supported by GitHub is creating and managing issues. This feature helps for tracking continuous improvement and continuous development of the software product. 
Issue management through GitHub in the lifecycle involves manual intervention in notifying stakeholders of their pending issues, issue assignments based on availability, tracking the issues, and report generation. Proposed IssueBot for GitHub reduces this manual intervention in the issue management and automates certain tasks avoiding periodic visits to the GitHub platform. This bot would come in handy for Product Owner/Business Analyst, Scrum Master/Project Manager, developer, and tester in day-to-day tasks involved in issue management.

# Bot Description:

The IssueBot helps in better issue management using the below-mentioned features:

## 1) List the available resources for the allocation of issues:
	
  Scrum Master/ Project manager who plays a key role in assigning issues after their creation should be able to efficiently allocate these issues to a particular resource. 
  This is crucial for resolving issues and not overloading and efficiently managing resources. Issuebot maintains a list of currently assigned issues to the resources, history of the task completion of the resources along with priority-based labels of the issues. 
  Using this information IssueBot generates a schema mentioning what issues can be completed in that given timeframe and the available resources for assigning issues. 

## 2) Stale Issues:
The user of the Issuebot can receive a list of stale issues and also push notifications to the team members and developers about the issues that have passed their deadlines or which were generated long back and not yet completed.  The notification will be generated for the older issues first or according to their priority. The issues can be either reassigned or closed.

## 3) Report generation:
The number of closed and open issues, the average time taken to resolve issues based on priority are some of the Key Performance Indicators (KPI) of the software product. This would also help to determine the performance of the team. Project Managers, Business analysts, Product Owners, and even customers could use this for better execution of the project. Issue bot helps in creating this report with mentioned indicators based on the timeframe specified by the user in input.

Along with these features the issueBot handles common tasks such as the creation of issues, assigning issues to resources, changing labels, listing issues, etc. 

This bot is a response to an event bot. It fits into the category of Chat-Dev bot we talked about in class.  This chat bot is developed for Project managers, developers and testing teams to ease the Issue mangaement tasks of github.

Tagline: Issue management is no more an issue

## Use cases

```
Use Case: Available Bandwidth and Assignment.
1 Precondition: 
   Using API tokens the bot must be connected to the proper Github repository. 
2 Main flow: 
   Request for available resources is provided as input to the bot[S1]. After the collection of issues and determining the available resources [S2]. 
   
   The output provided by the bot would be the available resources for assignment[S3]. Assignment could then performed based on the provided list[S4]
3 Subflow: 
   [S1] The user inputs with keywords as "allocate", "assign" and the issue id. For example “who could i allocate", "assign the issue #10 to @bob?”
   [S2] The bot gets the list of the issues computes the bandwidth of the resource based on the open issues that they are working.
   [S3] Available options of resources are then provided to the User after connecting it to the database.
   [S4] Assignment for corresponding issues is then performed.
   
4 Alternative flow:
   [E1] The issues are not assigned any labels and cannot be used to calculate priority.
   [E2] None of the resources are available to assign an issue based on the priority provided.
```
```
Use Case: stale Issues
1 Precondition:
   Users must have API tokens in the system and be connected to the correct repository.
2 Main Flow:
   The user will request the list of the stale issue [S1]. The bot will provide a list of those issues  [S2]. Bot notifies the user to who the issue is assigned [S3].
3 Sub flows:
   [S1] User provides input with keyword “stale”. For example " Provide all the stale issues" 
   [S2] Bot will return a list of stale issues for all the issues which have passed their deadline. 
   [S3] Bot will notify the user of these issues and also the issues which were assigned long back and not yet completed.
4 Alternative Flows:
   [E1] No stale issues are available.
```
```
Use Case: Report generation
1 Preconditions
   Users must have git hub API tokens in the system.
2 Main Flow
   User requests for metrics within a stipulated time frame[S1]. The bot collects the information of all the issues. Process the data and compute according to the user input. After computation, it provides a report to the requested user[S2].
3 Sub flows
  [S1] User provides /report command with keyword “report”, "generate" and timeframe. For example "Generate report from 1/1/2021 to 2/1/2021"
  [S2] Bot will return a report containing a number of issues that are still open, closed during the time frame, and the average time taken to close the issues in order of priority. 
4 Alternative Flow:
  [E1] User will only be able to generate a report if there are any open issues created within the mentioned timeframe.
  [E1] User would be notified in the chat to provide the right range of date and any invalid dates.
```

# Design Sketches 

![alt text](https://github.ncsu.edu/csc510-s2022/CSC510-22/blob/main/Images/IssueAllocation.JPG)

![alt text](https://github.ncsu.edu/csc510-s2022/CSC510-22/blob/main/Images/StaleIssues.JPG)

![alt text](https://github.ncsu.edu/csc510-s2022/CSC510-22/blob/main/Images/GenerateReports.JPG)

# Storyboard

![alt text](https://github.ncsu.edu/csc510-s2022/CSC510-22/blob/main/Images/assignment.PNG)

![alt text](https://github.ncsu.edu/csc510-s2022/CSC510-22/blob/main/Images/notify.PNG)

![alt text](https://github.ncsu.edu/csc510-s2022/CSC510-22/blob/main/Images/report.PNG)

# Architecture components:
![alt text](https://github.ncsu.edu/csc510-s2022/CSC510-22/blob/main/Images/components_architecture.png)
### User:
The user is going to communicate with our bot using the Mattermost. Users can request and get responses according to what keyword it passes the Mattermost.

### Mattermost:

Mattermost is an open-source, self-hostable online chat service with file sharing, search, and integrations. It is used as an internal chat for companies and organizations. It receives the commands and requests by the users and is processed by the bot.
### Github:
Github is a version control system in software development. It provides version control as well as code control functionality. Our bot communicates with Github for handling Issues on Github
### IssueBot: 
#### MatterMost Handler:
The MatterMost handler routine listens for any requests made by the MatterMost chat instance based on the specified keywords in order to call the parser logic in accordance.
#### Parser and Core: 
The parser uses the regular expression to grab the intents we need from the message entered by the user. So all the important keywords are extracted from the message entered by the user. From the keyword, the bot decides which operations need to be performed. Accordingly, the bot makes the corresponding API calls. 
#### DB Handler:
Instantiates and maintains the connections to the databases and tables, also handles the CRUD operations on the database. 
#### Github API handler:
Git API handler will connect the bot to GitHub. It will interact with GitHub, retrieve information from there to accomplish the task assigned by the user.
#### API Handlers
The core will perform all operations such as create, list, assign, allocate, report, stable, unassign, etc on the Issues by making suitable calls to the correct API handlers. The APIs communicate with each other by making the relevant function calls.
#### Database
To maintain and update the information of number of issues each resoruce is working on and for calculating the available bandwidth database is needed. This would help to provide the project managers with list of all the avialable resources. 


### The third-party services that we use include:
Github,
Mattermost
## Constraints:
1) Only one user interacts with the IssueBot at a point of time. 
2) The IssueBot deals only with the Issues on Github
3) Operations are performed only on a single Git repository
4) Any update on Github or Mattermost needs to be manually updated for the IssueBot. (for data consistency)

## Additional Design Patterns
#### Call and Return: Main and Subprogram 
![alt text](https://github.ncsu.edu/csc510-s2022/CSC510-22/blob/main/Images/SW-Design-img.PNG)
