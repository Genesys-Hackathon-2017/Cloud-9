if (typeof POC === "undefined") {
    POC = {};
}

//initialize jquery to use POC.$ so that we know what version of jquery we are running
POC.$ = jQuery.noConflict();

console.log("HACKATHON - running poc, modify dom from here");

var lastProcessed = "";

setInterval(function(){

    // Track last variable and current one
    // If it's different, it implies it's a new message so send it to our node server
    var user = POC.$('.interaction-header .participant-details').last().find('participant-name').text().trim();

    var lastMsg = POC.$('.interaction-container .active-conversation .chat-message .message-container').last().find('p').text().trim();

    if (lastProcessed != lastMsg) {
        // New message received

        lastProcessed = lastMsg; 

        var jsonObj = {
            user: user,
            message: lastProcessed
        };

        jQuery.ajax("http://localhost:4000/readMsg", {
            type: "POST",
            //url: "http://localhost:4000/test",
            data: JSON.stringify(jsonObj),
            //success: console.log("SEAN")
        }).then(() => {
            console.log('Msg sent to Node server!');
        })
    }
}, 5000);
    // }


    // //get interaction customer name & match it to user
    // var customer = [];
    // POC.$.each(POC.$('.interaction-customer-name'), function(){
    //     customer.push(POC.$(this).text());
    //     //console.log("HACKATHON", customer);
    // });



    
    // POC.$.each(POC.$('.interaction-container .active-conversation'), function( index, value ) { //selecting all active convos
    //     //console.log("Active Convo found");
    //     let conversation = [];
    //     POC.$(this).find('.chat-message').each(function(){
    //         let message = {};
    //         var user = POC.$(this).find('.user-name').text();
    //         var match = false;

    //         /*for (person in customer){
    //             console.log("customer loop", person);
    //             if (user.includes(person)) {
    //                 match = true;
    //                 break;
    //             }
    //         };*/
    //         customer.forEach(function(person) {
    //              //console.log("customer loop", person);
    //             if (user.includes(person)) {
    //                 match = true;
    //             }
    //         });

    //         if(match == true){ // convo is with a customer
    //             //console.log("HACKATHON - FOUND CONVERSATION");

    //             message.user = user;
    //             message.text = [];

    //             POC.$(this).find('.message-container ').each(function(){
    //                 message.text.push(POC.$(this).text());

    //                 temp = message.text;

    //                 // Compare deltas

    //                 // var a = "";
    //                 // a = message.text;
    //                 // a = a.replace(/(\r\n|\n|\r)/gm,"");

    //                 var a = "";
    //                 a = message.text.trim;
    //                 // a = a.replace(/(\r\n|\n|\r)/gm,""); //trim

    //                 // console.log("Message = " + a);
    //                 console.log(a);

    //                 // var tempMessage = {
    //                 //     user: "Sean",
    //                 //     message: "Hello Vimal"
    //                 // }

    //                 // var jsonObj = {
    //                 //     user: tempMessage.user,
    //                 //     message: tempMessage.message  
    //                 // };

    //                 // jQuery.ajax("http://localhost:4000/readMsg", {
    //                 //     type: "POST",
    //                 //     //url: "http://localhost:4000/test",
    //                 //     data: JSON.stringify(jsonObj),
    //                 //     //success: console.log("SEAN")
    //                 // }).then(() => {
    //                 //     console.log('Msg sent to Node server!');
    //                 // })
    //             });

    //             conversation.push(message);
    //         }
    //     });
    //     console.log("HACKATHON", conversation);
    // });
