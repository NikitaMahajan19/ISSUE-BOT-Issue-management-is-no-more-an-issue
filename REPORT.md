## The problem our bot solved
In the software development life cycle, GitHub plays a prominent role to collaborate with multiple developers. One of the major features supported by GitHub is creating and managing issues. This feature helps for tracking continuous improvement and continuous development of the software product. Issue management through GitHub in the lifecycle involves manual intervention in notifying stakeholders of their pending issues, issue assignments based on availability, tracking the issues, and report generation. Our IssueBot for GitHub reduces this manual intervention in the issue management and automates certain tasks avoiding periodic visits to the GitHub platform. This bot comes in handy for Product Owner/Business Analyst, Scrum Master/Project managers, developers, and testers in day-to-day tasks involved in issue management. It helps in tasks like issue creation, assignment, allocation, handling stale issues and generating the report.

## Features
The Issubot consist of three primary features: 

**Priority ordering of Members based on their availability.** 
For assigning an issue to the member, we check the availability of the members and assign the issue to the member.To do this the bot takes into consideration the performance of each Team member for that category of task and estimates based on their current workload and task alloted if they would be able to complete the issue before its deadline. It then allocates the issue to that member.
  
**Notify stale issues to members.** 
The bot can list all the stale issues and notify the assignee about their stale issues and remind them to work on them. The owner can reassign the issue to some other team member or close it.
	
 **Report Generation  with Github Issues.** 
The bot Helps in generating a report between the time interval given by user. It returns the following :
No. of open issue:
No. of resolved issue: 
Average number of days to resolve T-1:
Average number of days to resolve T-2: 
Average number of days to resolve T-3: 
Average number of days to resolve unlabelled issues:
## UseCases

#### Usecase1:

##### Commands and Screenshots

creating issue with different types

> create issue title: new updated issue body: testing 123 type: t-1

![image](https://media.github.ncsu.edu/user/23503/files/fec939e4-bcd4-4911-a14f-1fcf33e80dd6)

> create issue title: new updated issue body: testing 123 type: t-2

![image](https://media.github.ncsu.edu/user/23503/files/70a9613b-19a2-4698-a0e1-37fe57596f9c)

check the available bandwidth resources:
> list available users

![image](https://media.github.ncsu.edu/user/23503/files/ecc58232-5555-4bf4-95f1-ab9bca607c49)

Assign the issue to a user
assign issue #<issue_number> @<valid user(iszare/nmanima/rmanedi/nmahaja)
> assign issue #27 @iszare 

![image](https://media.github.ncsu.edu/user/23503/files/6bada50b-8a13-41bb-8f5d-34c718aeb6e2)

-> after assignment execute "list avaiable users" to see the change in bandwidth availability

![image](https://media.github.ncsu.edu/user/23503/files/404fc708-0bf9-4c57-a09a-cb0a5a16f686)

close the issue 
close issue #<issue_number>
> close issue #27

![image](https://media.github.ncsu.edu/user/23503/files/db84a010-2ff0-4349-a6a1-f7f0f0d14b13)

-> After closing execute "list available users" to see the change in bandwidth availability

![image](https://media.github.ncsu.edu/user/23503/files/b9509deb-5f64-4ab9-bd84-6ad50a538318)


#### Usecase2:
Commands and screenshots


List all issues
> list issues

![image](https://media.github.ncsu.edu/user/23503/files/1714acd1-b73b-4706-be0d-d8f6e364da21)

show stale issue → Lists all the stale issues which are open for last 10 hours
> show stale issues

![image](https://media.github.ncsu.edu/user/23503/files/465950a2-aa2a-4c63-b0a7-b5d2f79c3cf3)

notify stale issue -> email will be sent for all the stale issue assignees
> notify stale issues

![image](https://media.github.ncsu.edu/user/23503/files/82fc6bd5-ff3f-4a9a-adf2-dae1e9238d33)

![image](https://media.github.ncsu.edu/user/23503/files/cb39a144-d8f9-40ce-a51a-8b6c6433b30a)

#### Usecase3:
Commands and screenshots

generate report from <from_date> to <to_date> 

generate report from 03/10/2022 to 04/16/2022

![image](https://media.github.ncsu.edu/user/23503/files/dc4d7fbe-801a-471f-ab39-c39dfeb567c9)



## BOT development Process  

### Design Milestone 

For Design Milestone we have given our problem statement and our general bot description. The description consisted of our main three features including our usecases. We explained where the bot can be used with that particular use case in detail. We have also proposed our architecture diagram which was difficult to finalize but we did it after a lot of considerations and team meetings. This milestone also consists of Design sketches like wireframes and Storyboard. It was a great experience for us designing these two sections and we learned a new way of explaining our idea. We also explained the components of the architecture diagram, the constraints involved and an additional design pattern which explains the main and subprograms.

### Bot Milestone 

In this milestone, we refine our usecase name as suggested by the professor and included keywords according to their usecase ([#2](https://github.ncsu.edu/csc510-s2022/CSC510-22/issues/2)). We came up with an implementation for all three usecase using a mock MongoDB database which was not integrated with GitHub. Mocking the data had been an interesting task as we discussed what and how much data needs to be required for our implementation ([#24](https://github.ncsu.edu/csc510-s2022/CSC510-22/issues/24)). We redefined our usecases and then run the implementation code on this mock database. We also did the testing by writing test scripts for all usecases. In this milestone a major chunck of coding implementation was done intensively by us. This milestone involved creating the base code for the entire project ([#3](https://github.ncsu.edu/csc510-s2022/CSC510-22/issues/3)) and implementing the logic for all the use cases ([#7](https://github.ncsu.edu/csc510-s2022/CSC510-22/issues/7) ,[#21](https://github.ncsu.edu/csc510-s2022/CSC510-22/issues/21) ,[#23](https://github.ncsu.edu/csc510-s2022/CSC510-22/issues/23))

### Process Milestone

For this Milestone, we considered two sprits. In each sprint equal amount of work was divided among the team members. We make a kanban board to keep a record of all the tasks as and when it got completed. We also included minutes of the meeting every time meeting was held. The bot was integrated to the MongoDB database and the Github. Since this has been our first time implementing the MongoDB, the research and implementation part has been a good learning curve for us. We also tried different core and corollary practices like pair programming, Test-driven development, Work Progress and Shared Code. We found these practices quite effective and helped to complete this milestone efficiently. It helped in eliminating bugs if it was neglected by some other member and also improve the quality of code. 

### Deploy Milestone

For this task, we focussed on deploying our project on ansible. Initially we spent a large chunk of time on identifying all edge cases to implement and also fix all the bugs for creating a final working version of the project ([#89](https://github.ncsu.edu/csc510-s2022/CSC510-22/issues/89), [#90](https://github.ncsu.edu/csc510-s2022/CSC510-22/issues/90), [#91](https://github.ncsu.edu/csc510-s2022/CSC510-22/issues/91), [#92](https://github.ncsu.edu/csc510-s2022/CSC510-22/issues/92), [#93](https://github.ncsu.edu/csc510-s2022/CSC510-22/issues/93), [#94](https://github.ncsu.edu/csc510-s2022/CSC510-22/issues/94)) . We have written the ansible script to automate our bot on a Virtual Machine running on Ubuntu using a local machine and cloud MongoDB database. A shared VCL was created as instructed by the professor. ([#84](https://github.ncsu.edu/csc510-s2022/CSC510-22/issues/84)). However, instead of directly deploying on the final VCL, we created multiple different instances of individual VMs and deployed on these VMs. After testing multiple time we were successful in deploying without any issues. Once we had a final tested deployment procedure and script, we finally deployed on the alloted VCL. We also added the worksheet and limitations of the project. 

## Screencast

[This link has our BOT demo](https://drive.google.com/drive/folders/1zHiSnS3gK_xUAUpQI53wX6X50mGcMLbQ)

## Limitations and Future Work
**The following are the Limitations and Considerations:**

1. Multiple tasks couldn't be performed at the same time i.e creation and assignment which are separate tasks that cannot be done with a single command from the mattermost. The process would be the creation of an issue, checking for availability and then assigning the issue.
2. For the use case of generation of report UC3, granuality in calculating the time a issue had been worked on for minimum would be one day. 
5. Assuming an issue would only be assigned to only one primary assignee.
6. Input with format month/day/year with generate keyword
7. The current implementation is restricted a specific GIT repository where all the issue related operations are performed
6. One priority label per issue or no priority label. Multiple priority labels for the same issue cannot be assigned.


**Future Work:**
The following are the enhancements that can be done in future:
1. Our current bot works using third party software such as Mattermost and GitHub. We don't have a generic interface which can interact with any third party applications except these. We need to make it interactive with all kinds of software to increase its usage. Then this bot can be used by different firms and companies.
2. Granuality for UC3 could be further decreased to minutes on amount of time spent on an issue.
3. Assignment of a particular issue to multiple assignees and also recalculating the available bandwidth for multiple assignees.
4. Additional new features for automating issue management can be included as and when Github inroduces new features related to Github issues. 
5. Deployment and testing of bot, when the application runs on a Linux/Ubuntu container.
