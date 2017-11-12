if (typeof POC === "undefined") {
    POC = {};
}

//initialize jquery to use POC.$ so that we know what version of jquery we are running
POC.$ = jQuery.noConflict();
if (window.parent === window) {
    console.log("HACKATHON - running poc, modify dom from here")

    var lastProcessed = "";

    setInterval(function(){

        // Track last variable and current one
        // If it's different, it implies it's a new message so send it to our node server
        // var user = POC.$('.interaction-container .active-conversation .chat-message').last().find('.user-name .truncated-name').text().trim();

        var lastMsg = POC.$('.interaction-container .active-conversation .chat-message .message-container').last().find('p').text().trim();

        if (lastProcessed != lastMsg) {
            // New message received

            lastProcessed = lastMsg; 

            var jsonObj = {
                message: lastProcessed
            };

            // var JSONStringed = JSON.stringify(jsonObj);

            // console.log("JSONStringed = " + JSONStringed);

            // // console.log("JSONStringed = " + JSONStringed['message']);

            // var JSONParsed = JSON.parse(JSONStringed);

            // console.log("JSONParsed = " + JSONParsed);

            // console.log("JSONParsed.message = " + JSONParsed.message);

            jQuery.ajax("http://localhost:3000/readMsg", {
                type: "POST",
                //url: "http://localhost:4000/test",
                data: jsonObj,
                //success: console.log("SEAN")
            }).then(() => {
                console.log('Msg sent to Node server!');
            });
        }
    }, 5000);



    const it = setInterval(function(){
        console.log("in setter interval");
        if(POC.$('.interactions .active-conversation .text-input-group').length == 1 ){
            
            POC.$('.interactions .active-conversation .text-input-group').append("<button type='button' id='translate' >Translate</button>");
            POC.$('#translate')[0].addEventListener('click', function (){ translate_messsage();});
            clearInterval(it);
            //POC.$('.interactions .active-conversation .message-input').append("<script>POC.$('.interactions .active-conversation .message-input').val('hello');</script>");
        }
    }, 1000);

    function translate_messsage () {
        var translation = null;
        var input = POC.$('.interactions .active-conversation .message-input').val();
        var jsonInput = {
            message: input
        };

        jQuery.ajax("http://localhost:3000/readMsg", {
                type: "POST",
                //url: "http://localhost:4000/test",
                data: jsonInput,
                contentType: "application/json",
                //success: console.log("SEAN")
            }).then((response) => {
                translation = response;
                // console.log("Received translation in background.js was: " + translation);
                console.log(translation);
                POC.$('.interactions .active-conversation .message-input').val(translation);
            });

        
    };

}