const Git_handler = require('./git_handler.js');
const mongoose = require('mongoose');
const user_data = require('.././models/user_data');


var botdb_URI = 'mongodb+srv://' + process.env.DB_CRED + '@se-cluster.hnbrt.mongodb.net/gitbotdb?retryWrites=true&w=majority'


// async function for assign issue function



async function assign_issue(msg)
{
    console.log('user_handler: assign_issue: function call initiated')
    words = msg.toLowerCase().split(' ');
    var assign_to = ""
    if(words.includes('assign'))
    {
        found_issue_number = false;
        found_assignee = false
        for (var i = 0; i < words.length; i++){
            if(words[i].includes("#"))
            {
                found_issue_number = true
                var issue_num = words[i].substring(1);
                options = {};
                options.assignees = []
            }
            if (words[i].includes('@'))
            {
                if(found_assignee == true)
                {
                    return("Multiple user assignments not allowed")
                }
                var user_status = await check_user_name(words[i].substring(1))
                if(user_status)
                {
                    found_assignee = true
                    assign_to = words[i].substring(1);
                }
                else
                {
                    return("Invalid user name, please check the input")
                }
            }
        }
        try{
            var issue_detail = await Git_handler.git_get_issue_detail(issue_num);
            if( issue_detail.assignee != null)
            {
                return ("Issue already assigned to "+issue_detail.assignee.login);
            }
        }
        catch(e)
        {
            console.log(e)
            return(e)
        }
        if(found_issue_number == false){
            return("Please provide an issue number");
        }

        if(found_assignee == false){
            return('Enter a valid assignee example: @Jacob');
        }
        
        if(found_assignee == true && found_issue_number == true)
        {
            options.assignees.push(assign_to);
            update_user_db(issue_num, assign_to)
            try{
                let git_output = await Git_handler.git_assign_issue(options.assignees, issue_num);
            }
            catch(e)
            {
                return("Please give a correct issue number")
            }
            return("issue assignment successful")
        }

    }
}



async function update_user_db(issue_number, username)
{   
    console.log('user_handler: update_user_db: database call initiated')
    try{
        var issue_detail = await Git_handler.git_get_issue_detail(issue_number)
        await mongoose.connect(botdb_URI);
        console.log('user_handler: update_user_db: mongo db client connection established')
    }
    catch(e)
    {
        console.log(e)
        return("Internal error, please check the server logs")
    }

    for(i in issue_detail.labels)
    {
        if(issue_detail.labels[i].name == 't-1')
        {   
            res = await user_data.findOneAndUpdate({uname:username},{$inc:{ t1: 1, score:100}})
        }
        else if(issue_detail.labels[i].name == 't-2')
        {
            res = await user_data.findOneAndUpdate({uname:username},{$inc:{ t2: 1,score:50 }})
        }
        else if(issue_detail.labels[i].name == 't-3')
        {
            res = await user_data.findOneAndUpdate({uname:username},{$inc:{ t3: 1,score:10 }})
        }
    }
    mongoose.connection.close()
    return(true)
}



async function reduce_score_user_db(issue_number)
{
    try{
        var issue_detail = await Git_handler.git_get_issue_detail(issue_number);
    }
    catch(e)
    {
        return(e)
    }
    
    const username = issue_detail.assignee.login;

    if(!await check_user_name(username))
    {
        return("Invalid assignee in github, database entry not found")
    }

    try{
        await mongoose.connect(botdb_URI);
        console.log('user_handler: reduce_score_user_db: database connection established')
        
        for(i in issue_detail.labels)
        {
            if(issue_detail.labels[i].name == 't-1')
            {   
                await user_data.findOneAndUpdate({uname:username},{$inc:{ t1: -1, score:-100}})
                break
            }
            else if(issue_detail.labels[i].name == 't-2')
            {
                await user_data.findOneAndUpdate({uname:username},{$inc:{ t2: -1,score:-50 }})
                break
            }
            else if(issue_detail.labels[i].name == 't-3')
            {
                await user_data.findOneAndUpdate({uname:username},{$inc:{ t3: -1,score:-10 }})
                break
            }
        }
        await mongoose.connection.close()
        Git_handler.git_close_issue(issue_number)
    }
    catch(e){
        console.log(e)
        await mongoose.connection.close()
        return(e)
    }
    return("Issue " + issue_number + " closed");
}



async function list_available_users()
{
    try{
        var output_array = ["Displaying the users in based on their availablity, from highest to lowest : ", " "];
    
        var database_instance = await mongoose.connect(botdb_URI);
        console.log('user_handler: list_available_users: database connection initiated');
        var query_result = await user_data.find().sort({"score":1})
        for(i in query_result)
        {
            output_array.push(query_result[i].name)
        }
        mongoose.connection.close()
        return (output_array.join('\n'));
    }
    catch(e)
    {
        console.log(e)
        return("Internal error, please check the logs")
    }
}



async function check_user_name(username)
{
    console.log('user_handler: check_user_name: checking if username exists in db');
    try
    {
        await mongoose.connect(botdb_URI);
        console.log('user_handler: check_user_name: connecting to the db');
        var query_res = await user_data.find({uname:username});
        if(query_res == "")
        {
            console.log('user_handler: check_user_name: no username found')
            await mongoose.connection.close()
            return(false);
        }
        console.log('user_handler: check_user_name: username found')
        await mongoose.connection.close();
        console.log('user_handler: check_user_name: db connection closed');
        return true;
    }
    catch(e)
    {
        await mongoose.connection.close();
        console.log(e)
        return(false)
    }
}



exports.assign_issue = assign_issue; 
exports.reduce_score_user_db = reduce_score_user_db;
exports.update_user_db = update_user_db;
exports.list_available_users = list_available_users;




/*
(async () => {
    let w = await update_user_db("200","nmanima");
    console.log(w);
})();*/