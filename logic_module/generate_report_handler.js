//const nock = require("nock");
//const issue_data = require(".././mockdata/mock_issue_list.json")


const Git_handler = require('./git_handler.js');


async function list_issues_raw()
{
    //console.log("raw_issue_json")
    let obj = await Git_handler.git_list_issues();
    return obj
}


async function generate_report(msg)
{
    msg_split = msg.toLowerCase().split(" ");
    requested_date = {"from":"","to":""};
    var msg_length = msg_split.length;
    //console.log("inside generate report")
    for (var i = 0; i < msg_length; i++) {
        //console.log(msg_split[i]);
        if(msg_split[i] == 'from')
        {
            requested_date.from = msg_split[i+1].trim()
        }
        if(msg_split[i] == "to")
        {
            requested_date.to = msg_split[i+1].trim()
        }
    }
    list_requested_from_Date = requested_date.from.split("/")


    //console.log(requested_date.from)
    //console.log(requested_date.to)


    var today_date = new Date()
    //var from_date = new Date(Date.UTC(parseInt(list_requested_from_Date[2]),parseInt(list_requested_from_Date[1]),parseInt(list_requested_from_Date[0])))
    var from_date = new Date(Date.parse(requested_date.from))
    var to_date = new Date(Date.parse(requested_date.to))
    from_date.setHours(from_date.getHours() - 4)
    to_date.setHours(to_date.getHours() - 4)


    //console.log("today_date")
    //console.log(today_date)
    //console.log(from_date > today_date)
    //console.log(to_date > today_date)
    //console.log()
    //console.log(from_date)
    //console.log(to_date)


    if(from_date == "Invalid Date" || to_date == "Invalid Date"){
        //entered date is valid
        return("Date entered are invalid")
    }
    if(from_date > today_date){
        //from date is the future date 
        return("Date entered is invalid- entered from date as future date")
    }
    if(to_date > today_date){

        //to date is future date

        return("Date entered is invalid- entered to date as future date")
    }
    if(from_date > to_date){

        //interval is in reverse order or the from date is later than to date

        return("Date entered is invalid- invalid time period")
    }
    //return(requested_date.from + "and "+ requested_date.to)


    let received_json = await list_issues_raw()


    //console.log(received_json)
    /*
    //console.log("list issues_returned")
    //below function to test with mock data. Uncommented for that
    //console.log(cmp_issue_list)
    const cmp_issue_list = nock("https://github.ncsu.edu/api/v3")
        .get("/repos/rmanedi/Issuebot_test_team22/issues")
        .reply(200,JSON.stringify(issue_data))
    //console.log(typeof JSON.parse(cmp_issue_list.interceptors[0].body))
    //console.log(JSON.parse(cmp_issue_list.interceptors[0].body)[0].id)
    */


    open_issues = 0
    closed_issues_t1 = 0
    cum_sum_t1 = 0
    closed_issues_t2 = 0
    cum_sum_t2 = 0
    closed_issues_t3 = 0
    cum_sum_t3 = 0
    unllabeled_issues = 0
    cum_sum_unl = 0
    for(var index in received_json){

        //console.log(received_json[index].created_at)


        open_date = new Date(Date.parse((received_json[index].created_at).split("T")[0]))


        //console.log(open_date)
        //console.log(to_date)
        //console.log(from_date)
        //console.log(open_date >= from_date)
        //console.log(open_date <= to_date)
        //console.log(" ")
        //console.log(received_json[index].labels)


        if(open_date >= from_date && open_date <= to_date){

            //console.log("inside the function")
            //console.log(received_json[index].number)

            if(received_json[index].state == "open"){
                //console.log("number")
                //console.log(received_json[index].number)
                open_issues +=1
            }
            if(received_json[index].state == "closed"){
                //console.log("In closed state")
                //console.log("first")
                //console.log(received_json[index].number)
                if(received_json[index].labels.length != 0)
                {
                    tier_name = (received_json[index].labels[0].name)
                    //closed_date = (received_json[index].closed_at).split("T")[0]
                    //open_date = (received_json[index].created_at).split("T")[0]
                    closed_date = new Date(Date.parse(received_json[index].closed_at))
                    open_date = new Date(Date.parse(received_json[index].created_at))
                    if(tier_name == "t-1"){
                        closed_issues_t1+=1
                        cum_sum_t1 = cum_sum_t1 + Math.ceil((closed_date - open_date) / (1000 * 60 * 60 * 24))
                        if(closed_date == open_date){
                            cum_sum_t1 = cum_sum_t1+=1
                        }
                    }
                    if(tier_name == "t-2"){
                        closed_issues_t2+=1
                        cum_sum_t2 = cum_sum_t2 + Math.ceil((closed_date - open_date) / (1000 * 60 * 60 * 24));
                        if(closed_date == open_date){
                            cum_sum_t2 = cum_sum_t2+=1
                        }
                    }
                    if(tier_name == "t-3"){
                        closed_issues_t3+=1
                        cum_sum_t3 = cum_sum_t3 + Math.ceil((closed_date - open_date) / (1000 * 60 * 60 * 24));
                        if(closed_date == open_date){
                            cum_sum_t3 = cum_sum_t3+=1
                        }
                    }
                }
                else
                {
                    unllabeled_issues+=1
                    cum_sum_unl = cum_sum_unl + Math.ceil((closed_date - open_date) / (1000 * 60 * 60 * 24));
                    if(closed_date == open_date){
                        cum_sum_unl = cum_sum_unl+=1
                    }
                }

            }
        }
    }


    //console.log(open_issues+" "+closed_issues_t1+" "+closed_issues_t2+ " "+closed_issues_t3 +" "+cum_sum_t1 +" "+ cum_sum_t2 + " "+ cum_sum_t3+" "+unllabeled_issues)
    for(var index in received_json){
        open_date = new Date(Date.parse((received_json[index].created_at).split("T")[0]))
        // if(received_json[index].number == 142){
        //     console.log("open date")
        //     console.log(open_date)
        //     console.log("closed date")
        //     console.log(received_json[index].closed_at)
        //     console.log("found 142")
        // }
        if(received_json[index].state == "closed"){
            if(received_json[index].labels.length != 0 )
                {
                    tier_name = (received_json[index].labels[0].name)
                    closed_date = new Date(Date.parse((received_json[index].closed_at).split("T")[0]))
                    /* console.log("inside labels")
                    console.log(received_json[index].number)
                    console.log(open_date)
                    console.log(closed_date)
                    console.log(open_date < from_date && closed_date <= to_date)
                    //console.log(" ") */
                    if(open_date < from_date && closed_date <= to_date && closed_date > from_date)
                    {
                        closed_date = new Date(Date.parse(received_json[index].closed_at))
                        from_date = new Date(Date.parse(from_date))
                        if(tier_name == "t-1"){
                            closed_issues_t1+=1
                            cum_sum_t1 = cum_sum_t1 + Math.ceil((closed_date - from_date) / (1000 * 60 * 60 * 24))
                            if(closed_date == open_date){
                                cum_sum_t1 = cum_sum_t1+=1
                            }
                        }
                        if(tier_name == "t-2"){
                            closed_issues_t2+=1
                            cum_sum_t2 = cum_sum_t2 + Math.ceil((closed_date - from_date) / (1000 * 60 * 60 * 24));
                            if(closed_date == open_date){
                                cum_sum_t2 = cum_sum_t2+=1
                            }
                        }
                        if(tier_name == "t-3"){
                            closed_issues_t3+=1
                            cum_sum_t3 = cum_sum_t3 + Math.ceil((closed_date - from_date) / (1000 * 60 * 60 * 24));
                            if(closed_date == open_date){
                                cum_sum_t3 = cum_sum_t3+=1
                            }
                        }
                    }
                }
            else
                {
                    closed_date = new Date(Date.parse((received_json[index].closed_at).split("T")[0]))
                    if(open_date < from_date && closed_date <= to_date && closed_date > from_date)
                    {
                        unllabeled_issues+=1
                        cum_sum_unl = cum_sum_unl + Math.ceil((closed_date - from_date) / (1000 * 60 * 60 * 24));
                        if(closed_date == open_date){
                            cum_sum_unl = cum_sum_unl+=1
                        }
                    }
                }
            }
    }

    console.log(open_issues+" "+closed_issues_t1+" "+closed_issues_t2+ " "+closed_issues_t3 +" "+cum_sum_t1 +" "+ cum_sum_t2 + " "+ cum_sum_t3+" "+unllabeled_issues)
    total_Closed = closed_issues_t1 + closed_issues_t2 + closed_issues_t3 + unllabeled_issues
    if(closed_issues_t1 != 0){
        var avg_t1 = Math.floor((cum_sum_t1/(closed_issues_t1))*10000)/10000
    }
    else{
        avg_t1 = 0
    }
    if(closed_issues_t2 != 0){
        var avg_t2 = Math.floor((cum_sum_t2/(closed_issues_t2))*10000)/10000
    }
    else{
        avg_t2 = 0
    }
    if(closed_issues_t3 != 0){
        var avg_t3 = Math.floor((cum_sum_t3/(closed_issues_t3))*10000)/10000
    }
    else{
        avg_t3 = 0
    }
    if(unllabeled_issues != 0){
        var avg_unl = Math.floor((cum_sum_unl/(unllabeled_issues))*10000)/10000
    }
    else{
        avg_unl = 0
    }
    return("No. of open issue " + open_issues +"\n" + "No. of resolved issue " + total_Closed + "\n" + "Average number of days to resolve T-1:" + avg_t1 +"\n" + "Average number of days to resolve T-2:" + avg_t2 +"\n" + "Average number of days to resolve T-3:" + avg_t3 +"\n" +"Average number of days to resolve unlabelled issues:" + avg_unl)
}



exports.generate_report = generate_report; //to expose the function to other programs



/*   (async () => {
           let w = await generate_report("generate report from 01/01/2022 to 02/02/2022");
           console.log(w);
        })()  */
