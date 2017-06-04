var express = require('express');
var router = express.Router();
var cors = require('cors')

/* GET users listing. */
router.get('/', cors(), function(req, res, next) {
  var watson = require('watson-developer-cloud');

  // Set up Conversation service wrapper.
  var conversation = new watson.ConversationV1({
    username: 'dbb16f8d-8a5f-4224-be5b-79f0bf6024f8', // replace with username from service key
    password: 'EC1qDPatr5QX', // replace with password from service key
    path: { workspace_id: '407b4745-dc20-4999-af91-93b9d7739cb1' }, // replace with workspace ID
    version_date: '2016-07-11'
  });


  var message = {
    input: {
      text: req.query.message
    }
  };

  if(typeof req.query.context != 'undefined') {
    message['context'] = JSON.parse(decodeURI(req.query.context));
  }

  // Start conversation with empty message.
  conversation.message(message, processResponse);

  // Process the conversation response.
  function processResponse(err, response) {
    if (err) {
      console.error(err); // something went wrong
      return;
    }
    
    // Display the output from dialog, if any.
    if (response.output.text.length != 0) {
        res.setHeader('content-type', 'application/json');
        res.send(response);
    } else {
      res.send(response.output);
    }
  }
  
});

module.exports = router;