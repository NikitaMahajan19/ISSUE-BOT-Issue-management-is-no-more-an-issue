//define variables here
const Client = require('mattermost-client');
const Issue_handler = require('./logic_module/issue_handler.js');
const generate_report = require('./logic_module/generate_report_handler.js');
const Data_handler = require('./logic_module/data_handler.js');
const User_handler = require('./logic_module/user_handler.js')


let host = process.env.MM_HOST
let group = process.env.MM_GROUP
let bot_name = process.env.MM_BOT_NAME
let client = new Client(host, group, {});
let channel_id = ""
let actual_message = ""

async function main()
{
    //this function acts as a mattermost handler
    let request = await client.tokenLogin(process.env.BOTTOKEN);
    client.on('message', function(msg)
    {
        if(msg.data.sender_name == "@issue__bot"){
            return
        }
        if (msg.broadcast.channel_id == "9pzcihbz77go9xjt569y57spgy"){
            return
        }
        console.log("recevied message" + msg.data)
        if(msg.broadcast.channel_id)
        {
        channel_id = msg.broadcast.channel_id
        }else{
            console.log("message received with no channel_id_invalid")
        }
        if(msg.data.post )
        {
            let post = JSON.parse(msg.data.post);
            actual_message = post.message
        }else{
            client.postMessage("message with no information- please send valid message",channel_id)
            console.log("message received with no information")
        }

        parser_core(actual_message).then(
            function(response) {
                if(response)
                {
                    console.log("Main: recieved response data : " + response);
                    client.postMessage(response, channel_id);
                }   
            }); 
    });
}



async function parser_core(actual_message)
{
    //write parsers according to use cases to pass the information to the corresponding API calls
    if(actual_message.includes("create") && actual_message.includes("issue"))
    {   
        console.log("Parser: create function executed");
        return (Issue_handler.create_issue(actual_message)); 
    }
    else if(actual_message.includes("list") && actual_message.includes("issue") && !actual_message.includes("open") )
    {
        console.log("Parser: list function executed");
        return (Data_handler.list_issues(actual_message));
    }
    else if(actual_message.includes("list") && actual_message.includes("open") && actual_message.includes("issue") )
    {
        console.log("Parser: list open issues function executed");
        return (Data_handler.list_open_issues(actual_message));
    }
    else if(actual_message.includes("stale") && actual_message.includes("issue") && actual_message.includes("show"))
    {
        console.log("Parser: stale function executed");
        return (Data_handler.show_stale_issues(actual_message));
    }
    else if(actual_message.includes("notify") && actual_message.includes("stale") && actual_message.includes("issue") )
    {
        console.log("Parser: notify stale function executed");
        return (Data_handler.notify_stale_issues(actual_message));
    }
    else if(actual_message.includes("report") && actual_message.includes("from") && actual_message.includes("to"))
    {   
        console.log("Parser: report generation function executed");
        return (generate_report.generate_report(actual_message));            
    }
    else if(actual_message.includes("assign") && actual_message.includes("issue"))
    {   
        console.log("Parser: assign function executed");
        return (User_handler.assign_issue(actual_message));            
    }
    else if(actual_message.includes("list") && actual_message.includes("available") && actual_message.includes("user"))
    {
        console.log("Parser: available user function executed");
        return (User_handler.list_available_users(actual_message));
    }
    else if((actual_message.includes("delete") || actual_message.includes("close")) && actual_message.includes("issue"))
    {
        console.log("Parser: close issue function executed");
        return (Issue_handler.close_issue(actual_message));
    }
    else
    {
        return("Sorry I cannot understand this, refer to user manual in \"https://github.ncsu.edu/csc510-s2022/CSC510-22/blob/main/DEPLOY.md\"")
    }


    // else if(actual_message.includes("Sorry"))
    // {
    //      return false
    //  }
    // else{
    // return("Sorry, I didn't understand that !");
    //}
    return false
}



module.exports.parser_core = parser_core;




(async () => 
{
    if (process.env.NODE_ENV != 'test') {
        await main();
    }
})()
