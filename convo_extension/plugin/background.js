if (typeof POC === "undefined") {
    POC = {};
}

//initialize jquery to use POC.$ so that we know what version of jquery we are running
POC.$ = jQuery.noConflict();

console.log("HACKATHON - running poc, modify dom from here")

setInterval(function(){

    //get interaction customer name & match it to user
    var customer = [];
    POC.$.each(POC.$('.interaction-customer-name'), function(){
        customer.push(POC.$(this).text());
        //console.log("HACKATHON", customer);

    });

    
    POC.$.each(POC.$('.active-conversation'), function( index, value ) { //selecting all active convos
        //console.log("Active Convo found");
        let conversation = [];
        POC.$(this).find('.chat-message').each(function(){
            let message = {};
            var user = POC.$(this).find('.user-name').text()
            var match = false;

            /*for (person in customer){
                console.log("customer loop", person);
                if (user.includes(person)) {
                    match = true;
                    break;
                }
            };*/
            customer.forEach(function(person) {
                 //console.log("customer loop", person);
                if (user.includes(person)) {
                    match = true;
                }
            });

            if(match == true){ // convo is with a customer
                //console.log("HACKATHON - FOUND CONVERSATION");

                message.user = user;
                message.text = [];

                POC.$(this).find('.message-container ').each(function(){
                    message.text.push(POC.$(this).text());

                    // var a = "";
                    // a = message.text;
                    // a = a.replace(/(\r\n|\n|\r)/gm,"");

                    //var a = "";
                    a = message.text;
                    //a = a.replace(/(\r\n|\n|\r)/gm,"");

                    // console.log("Message = " + a);
                    console.log(a);

                    // var tempMessage = {
                    //     user: "Sean",
                    //     message: "Hello Vimal"
                    // }

                    // var jsonObj = {
                    //     user: tempMessage.user,
                    //     message: tempMessage.message  
                    // };

                    // jQuery.ajax("http://localhost:4000/readMsg", {
                    //     type: "POST",
                    //     //url: "http://localhost:4000/test",
                    //     data: JSON.stringify(jsonObj),
                    //     //success: console.log("SEAN")
                    // }).then(() => {
                    //     console.log('Msg sent to Node server!');
                    // })
                });

                conversation.push(message);
            }
        });
        //console.log("HACKATHON", conversation);
    });
}, 5000);