# PROCESS MILESTONE

For this milestone, we are implementing use cases refined from previous milestones and documented in https://github.ncsu.edu/csc510-s2022/CSC510-22/blob/main/DESIGN.md by applying the best possible software engineering practices. User Stories were created to focus on implementing bot interaction with mattermost and GitHub through API handlers along with edge cases. The practices, process and iteration worksheets are mentioned below.

## Process

#### Stories created from Usecases, points assigned and whom they had been assigned for each iteration

##### Iteration 1
| Userstory                              | Story Points | Assigned to       |
| -------------------------------------- | ------------ | ----------------- |
| Create Database                        | 3            | nmanima           |
| Integrate code to Database             | 5            | Namanima, nmahaja |
| Connecting database to github          | 3            | namahaja          |
| Bugfix Repetitive list of stale issues | 3            | Iszare, nmahaja   |
| Fix Readme.md                          | 1            | iszare            |
| Stale Issue Logic                      | 5            | iszare            |
| Token Fixing                           | 1            | rmanedi           |
| Change json format                     | 1            | rmanedi           |
| List issue module integration          | 5            | rmanedi           |
| BugFix: Async Function                 | 1            | ramnedi           |
| Report generation undefined labels     | 1            | rmanedi           |

##### Iteration 2
| Userstory                                          | Story Points | Assigned To |
| -------------------------------------------------- | ------------ | ----------- |
| Github list issue hander logic                     | 1            | iszare      |
| Notification of stale issues                       | 5            | iszare      |
| Delete issue logic                                 | 3            | nmanima     |
| Remove manually added delay                        | 5            | nmanima     |
| Connecting to github                               | 3            | nmahaja     |
| UC3 division roundoff                              | 1            | rmanedi     |
| Timezone difference                                | 1            | rmanedi     |
| Calculation of issue opened and closed on same day | 1            | rmanedi     |
| UC3 error case                                     | 1            | rmanedi     |

### Minutes of Meetings

Hurdles, blockages, progress are discussed and documented in the below file.

https://github.ncsu.edu/csc510-s2022/CSC510-22/blob/main/mom_file


### Iteration worksheet

### Week 1

| Deliverable      | Item/Status | Issues/Tasks |
| ----------- | ----------- | ----------- |
| Bot tasks      | Token Fixing, Updating README.md       | [#29](https://github.ncsu.edu/csc510-s2022/CSC510-22/issues/29), [#37](https://github.ncsu.edu/csc510-s2022/CSC510-22/issues/37)        |
| Use case   | 1        | [#45](https://github.ncsu.edu/csc510-s2022/CSC510-22/issues/45), [#30](https://github.ncsu.edu/csc510-s2022/CSC510-22/issues/30)        |
| Use case   | 2        | [#36](https://github.ncsu.edu/csc510-s2022/CSC510-22/issues/36)        |
| Use case   | 3        | [#32](https://github.ncsu.edu/csc510-s2022/CSC510-22/issues/32)         |
| Unit Tests   | In accordance with development       |         |


### Week 2

| Deliverable      | Item/Status | Issues/Tasks |
| ----------- | ----------- | ----------- |
| Documentation      |       |    |
| Use case   | 1        | [#68](https://github.ncsu.edu/csc510-s2022/CSC510-22/issues/68), [#61](https://github.ncsu.edu/csc510-s2022/CSC510-22/issues/61), [#43](https://github.ncsu.edu/csc510-s2022/CSC510-22/issues/43))        |
| Use case   | 2        | [#36](https://github.ncsu.edu/csc510-s2022/CSC510-22/issues/36), [#39](https://github.ncsu.edu/csc510-s2022/CSC510-22/issues/39),[#52](https://github.ncsu.edu/csc510-s2022/CSC510-22/issues/52,#39](https://github.ncsu.edu/csc510-s2022/CSC510-22/issues/39))       |
| Use case   | 3        |[#34](https://github.ncsu.edu/csc510-s2022/CSC510-22/issues/34),[#57](https://github.ncsu.edu/csc510-s2022/CSC510-22/issues/57),[#69](https://github.ncsu.edu/csc510-s2022/CSC510-22/issues/69),[#71](https://github.ncsu.edu/csc510-s2022/CSC510-22/issues/71),[#73](https://github.ncsu.edu/csc510-s2022/CSC510-22/issues/73), [#76](https://github.ncsu.edu/csc510-s2022/CSC510-22/issues/76),      |
| Unit Tests   | In accordance with development       |         |

## Practices

Below are some of the thumb rules we have tried to adopt during the process of developing code for the project starting from this milestone.

1. Every issue opened should have a Story points that indicate the tentative time required for completion
2. Pull request generated for merging with dev_branch from the branches generated for issues.
3. Review is always performed by other than the developer who generated pull requests.
4. Assign and map pull requests with issues for documentation.

We are using the "scrumbun" process for implementing the bot.
Below are some of the core practices and corollary practices followed along with the thumb roles mentioned above.


#### Core Practices
So while thinking of our core practices we decided on the following:

Pair Programming:

The first use case involves the creation of a database, handlers for the database along with GitHub and mattermost handlers logic. It had been continuously worked along with the two interactions by Nimalan and Nikita. In this two people work on the same project by switching roles of navigator and driver.
The navigator looks at the driver's implementation and looks for possible errors and the driver has control of implementation.

Test-driven development:

Every PR was raised after thorough testing.
The PR is only merged after approval of review with dev_branch which acts as the development branch.


#### Corollary Practices:

Work Progress: 

We created a project kanban board to track the work progress of all the team members. Kanban board is categorized through 4 sections To do, Review in progress, and Completed. Story points SP-1,SP-3,SP-5, and SP-8 helped us to track the progress of that particular issue in daily scrum call while tracking status and progress.

Kanban board current.
![image](https://media.github.ncsu.edu/user/22661/files/1a62956a-a5c2-4e73-97b1-d79e1e36e509)

highlights in red indicate the above point.

Shared Code: 

Anyone in our team can issues, perform improvements or suggest improvements for any part of the project. 
Some of the modules like report_generation_logic and list_issues have dependencies during our development. An issue is noticed while testing the report generation logic that only the last 30 open issues are taken into consideration. Team member was able to raise the issue request https://github.ncsu.edu/csc510-s2022/CSC510-22/issues/52 and work together to improve both the stale issues logic and report generation logic.

https://github.ncsu.edu/csc510-s2022/CSC510-22/issues/52 - issue and the situation that states one team member suggesting the imporovement/issues and other team memeber fixing the module which is used commonly shared for usecases they are assosciated with.

Single Codebase: 

We integrated all the development into a single repository with multiple working branches.

Meeting notes on https://github.ncsu.edu/csc510-s2022/CSC510-22/blob/main/mom_file  would indicate practices followed.

To demonstrate the transitions in the kanban board and also the thumb rules have been followed. Below are two images taken from a sample of the user, stories would give an insight into transitions and some of the software practices mentioned above.

![image](https://media.github.ncsu.edu/user/22661/files/315bbae0-3aff-46a1-84e5-addec8a04348)

![image](https://media.github.ncsu.edu/user/22661/files/bd4d60ac-2b38-4c44-bb64-3fe18ce7445a)


## Consistency

We have tried to equalize the contribution and keep a check in our recursive meetings which helped us not to overload any of the team members during this milestone.

