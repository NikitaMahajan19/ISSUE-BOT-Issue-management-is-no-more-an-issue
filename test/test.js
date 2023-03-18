var chai   = require('chai');
var assert = chai.assert,
    expect = chai.expect;

process.env.NODE_ENV = 'test';


var git_instance = require('../logic_module/git_handler');
var issue_instance = require('../logic_module/issue_handler');
var data_instance = require('../logic_module/data_handler');
var user_instance = require('../logic_module/user_handler');
var index_instance = require('../index');
var report_instance= require('../logic_module/generate_report_handler');
var user_instance = require('../logic_module/user_handler');


console.log = function(){};

describe("Git handler tests", function() {

    this.timeout(5000);
    it("Ensure that the git_create_issue creates successful issues", function() {
        msg = {title:"issue1",labels:['t-1']};
        git_instance.git_create_issue(msg).then(function(response){
            expect(response.status).to.equal(201);
        });
    });

    it("Ensure that the git_list_issue lists issues successfully ", function() {
        git_instance.git_list_issues().then(function(response){
            expect(response).to.not.equal(null);
        });
    });


    it("Ensure that the git_assign_issue assigns successful issues", function() {
        msg = {assignees:["iszare"], owner:'rmanedi', repo:'Issuebot_test_team22', issue_number:159};
        git_instance.git_assign_issue(msg).then(function(response){
            expect(response.status).to.equal(201);
        });
    });

    it("Ensure that the git_create_issue_comment creates successful issue comment", function() {
        options = {"body": "Stale issue reminder. Begin work OR Reassign issue OR Close if invalid"};
        git_instance.git_create_issue_comment(159,options).then(function(response){
            expect(response.status).to.equal(201);
        });
    });

    it("Ensure that the git_get_issue_detail gets the detail of the correct issue", function(){
        issue_number = "200"
        git_instance.git_get_issue_detail(issue_number).then(function(response){
            expect(response.number).to.equal(200);
        });
    });
    
    it("Ensure the git_get_issue_detail handles invalid issue numbers properly",function(){
        issue_number = "20000"
        git_instance.git_get_issue_detail(issue_number).then(function(response){
            expect(response.number).to.equal("Invalid issue number, please check the input");
        });
    });

    it("Ensure that the git_close_issue gets the detail of the correct issue", function(){
        issue_number = "200"
        git_instance.git_close_issue(issue_number).then(function(response){
            expect(response.number).to.equal(200);
        });
    });
    
    it("Ensure the git_close_issue handles invalid issue numbers properly",function(){
        issue_number = "20000"
        git_instance.git_close_issue(issue_number).then(function(response){
            expect(response.number).to.equal("Invalid issue number, please check the input");
        });
    });
});

describe("Issue handler tests", function() {

    this.timeout(5000);
    it("Ensure that the git_create_issue creates successful issues", function() {
        msg = "create issue without title";
        issue_instance.create_issue(msg).then(function(response){
            expect(response).to.equal("Mandatory attribute title missing");
        });
    });

    it("Ensure if issue is created if type is not given", function() {
        msg = "create issue with title: abcd without type";
        issue_instance.create_issue(msg).then(function(response){
            expect(response).to.include("Created issue");
        });
    });

    it("Ensure close_issue successfully closes issues", function() {
        issue_instance.close_issue("close issue #261").then(function(response){
            expect(response).to.include("Issue 261 closed");
        });
    });

    it("Ensure close_issue successfully catches input without issue number", function() {
        issue_instance.close_issue("close issue").then(function(response){
            expect(response).to.include("Please mention the issue number as #");
        });
    });
});

describe("Data handler tests", function() {

    this.timeout(5000);
    it("Ensure that the list_issue creates successful issues", function() {
        data_instance.list_issues().then(function(response){
            expect(response).not.equal(null);
        });
    });

    it("Ensure if show_stale_issue gives all stale issues", function() {
        msg = "create issue with title: abcd without type";
        data_instance.show_stale_issues(msg).then(function(response){
            expect(response).to.include("Created issue");
        });
    });

});

describe("Main handler tests", function() {

    this.timeout(5000);
    it("Ensure that the main parser_core handles the empty string", function() {

        index_instance.parser_core(" ").then(function(response){
            expect(response).to.equal("Sorry, I didn't understand that !");
        });
    });

    it("Ensure that the main parser_core handles the non matching string", function() {

        index_instance.parser_core("The tv is not working").then(function(response){
            expect(response).to.equal("Sorry, I didn't understand that !");
        });
        
    });
});

describe("Generate Report handler tests", function() {

    this.timeout(5000);
    it("Ensure that from date entered is valid", function() {
        msg="generate report from 13/12/2021 to 10/12/2021";
        report_instance.generate_report(msg).then(function(response){
            expect(response).to.equal("Date entered are invalid");
        });
    });

    it("Ensure that to date entered is valid", function() {
        msg="generate report from 04/12/2021 to 14/12/2021";
        report_instance.generate_report(msg).then(function(response){
            expect(response).to.equal("Date entered are invalid");
        });
    });


    it("Ensure that from date is less than today's date", function() {
        msg="generate report from 04/12/2022 to 10/12/2021";
        report_instance.generate_report(msg).then(function(response){
            expect(response).to.equal("Date entered is invalid- entered from date as future date");
        });
    });

    it("Ensure that to date  is less than today's date", function() {
        msg="generate report from 04/12/2022 to 10/12/2024";
        report_instance.generate_report(msg).then(function(response){
            expect(response).to.equal("Date entered is invalid- entered to date as future date");
        });
        
    });


    it("Ensure that the from date is lesser than to date", function() {
        msg="generate report from 03/30/2022 to 03/12/2022";
        report_instance.generate_report(msg).then(function(response){
            expect(response).to.equal("Date entered is invalid- entered to date as future date");
        });
        
    });


    it("Ensure that the from date is lesser than to date", function() {
        msg="generate report from 03/30/2022 to 03/12/2022";
        report_instance.generate_report(msg).then(function(response){
            expect(response).to.equal("Date entered is invalid- entered to date as future date");
        });
    });


    it("Ensure that the to average delays for t-1,t-3 are calculated", function() {
        msg="generate report from 03/01/2021 to 03/31/2022";
        report_instance.generate_report(msg).then(function(response){
            expect(response).to.equal("No. of open issue 41\n No. of closed issue 63\nAverage no of days to resolve T-1:1\nAverage no of days to resolve T-2:0\nAverage number of days to resolve T-3:1\nAverage number of days to resolve unlabelled issues:1");
        });
    });


    it("Ensure that the to calculations are done if the to date is within range and from_date is before the range", function() {
        msg="generate report from 03/29/2021 to 03/31/2022";
        report_instance.generate_report(msg).then(function(response){
            //expect(response).to.equal("No. of open issue 94\n No. of closed issue 68\nAverage no of days to resolve T-1:1\nAverage no of days to resolve T-2:5\nAverage number of days to resolve T-3:3.6153\nAverage number of days to resolve unlabelled issues:12.5");
            expect(response).contains("No. of closed issue ")
        });
    });
});



describe("User handler test", function() {

    this.timeout(5000);

    it("Ensure that the message contains # or issue number", function() {
        msg="assign issue to @iszare"
        user_instance.assign_issue(msg).then(function(response){
            expect(response).to.equal("Please provide an issue number");
        });
    });

    it("Ensure that the  message contains @ or assignee", function() {
        msg="assign issue #3 to "
        user_instance.assign_issue(msg).then(function(response){
            expect(response).to.equal("Enter a valid assignee example: @Jacob");
        });
    });

    it("Ensure that the update_user_db increments the value of user successfully", function() {
        user_instance.update_user_db("200","nmanima").then(function(response){
            expect(response).to.equal(true);
        });
    });

    it("Ensure that the update_user_db catches incorrect username", function() {
        user_instance.update_user_db("200","raja").then(function(response){
            expect(response).to.equal("Invalid assignee in github, database entry not found");
        });
    });

    it("Ensure that the update_user_db catches incorrect issue number", function() {
        user_instance.update_user_db("20000","nmanima").then(function(response){
            expect(response).to.equal("Invalid issue number, please check the input");
        });
    });

    it("Ensure that the list_available_users returns successfully", function() {
        user_instance.list_available_users().then(function(response){
            expect(response).has("Displaying the users in based on their availablity");
        });
    });

    it("Ensure that the update_user_db increments the value of user successfully", function() {
        user_instance.reduce_score_user_db("200","nmanima").then(function(response){
            expect(response).to.equal("Issue 200 closed");
        });
    });

    it("Ensure that the reduce_score_user_db catchs incorrect issue number", function() {
        user_instance.reduce_score_user_db("20000","nmanima").then(function(response){
            expect(response).to.equal("Invalid issue number, please check the input");
        });
    });

    it("Ensure that the message contains # or issue number and @ or assignee ", function() {
        msg="assign issue to "
        user_instance.assign_issue(msg).then(function(response){
            expect(response).to.equal("Please provide an issue number and assignee");
        });
    });
});

