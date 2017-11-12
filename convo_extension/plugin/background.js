if (typeof POC === "undefined") {
    POC = {};
}

//initialize jquery to use POC.$ so that we know what version of jquery we are running
POC.$ = jQuery.noConflict();
if (window.parent === window) {
    console.log("HACKATHON - running poc, modify dom from here")

    setInterval(function(){

        //get interaction customer name & match it to user
        var customer = [];
        var user = "";
        POC.$.each(POC.$('.interaction-customer-name'), function(){
            customer.push(POC.$(this).text());
            //console.log("HACKATHON", customer);

        });

        
        POC.$.each(POC.$('.active-conversation'), function( index, value ) { //selecting all active convos
            console.log("Active Convo found");
            let conversation = [];
            POC.$(this).find('.chat-message').each(function(){
                let message = {};
                if(POC.$(this).find('.user-name').text().localeCompare("") != 0) {
                    user = POC.$(this).find('.user-name').text()
                }
                //if user is "" then is the same user as the previous message
                
                var match = false;

                customer.forEach(function(person) {

                    // console.log("customer loop", person);
                    if (user.includes(person)) {
                        match = true;
                    }
                });

                if(match == true){ // convo is with a customer
                    console.log("HACKATHON - FOUND CONVERSATION");

                    message.user = user;
                    message.text = [];

                    POC.$(this).find('.message-container ').each(function(){
                        message.text.push(POC.$(this).text());
                    });

                    conversation.push(message);
                }
            });

            console.log("HACKATHON", conversation);


        }); 

    }, 1000); 



    const it = setInterval(function(){
        console.log("in setter interval");
        if(POC.$('.interactions .active-conversation .text-input-group').length == 1 ){
            
            POC.$('.interactions .active-conversation .text-input-group').append("<button type='button' id='translate' >Translate</button>");
            POC.$('#translate')[0].addEventListener('click', function (){ console.log("hi");});
            clearInterval(it);
            //POC.$('.interactions .active-conversation .message-input').append("<script>POC.$('.interactions .active-conversation .message-input').val('hello');</script>");
        }
    }, 1000);
}



/(function () {

     var input = POC.$('.interactions .active-conversation .message-input').val();

     console.log(input);
    POC.$('.interactions .active-conversation .message-input').val('I translated!');
});*/
