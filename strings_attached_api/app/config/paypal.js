var paypal = require('paypal-rest-sdk');

paypal.configure({
    'mode': 'sandbox', //sandbox or live
    'client_id': 'AX9emxS59Xyg9WAbpqBx6tGEejN3Ko2LT3viBuS1eHttuFHx_KVUgoinUh6evqKeyhB6EexKET6E5meX',
    'client_secret': 'EOB1zlyHD0Xodx8_-DL5NcxtkVDx1xhZHKCrsGM-8suqYnLvH9oYwB99Uga7cLLO1L2_I39aTcLh65N0',
    'headers' : {
		  'custom': 'header'
    }
});
