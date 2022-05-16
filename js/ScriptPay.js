

paypal.Buttons({
    style: {
                    layout :'vertical',
                    size: 'medium',
                    color:  'blue',
                    shape:  'pill',
                    label:  'pay',
                    height: 40,
                    tagline: 'false'
                },
  // Sets up the transaction when a payment button is clicked
  createOrder: (data, actions) => {
    return actions.order.create({
      purchase_units: [{
        amount: {
          value: codeID // Can also reference a variable or function
        }
      }]
    });
  },
  onCancel:async function() {
    window.location='pricing.html';
    },
  // Finalize the transaction after payer approval
  onApprove:async (data, actions) => {
    return actions.order.capture().then(async function(orderData) {
      // Successful capture! For dev/demo purposes:
      console.log('Capture result', orderData, JSON.stringify(orderData, null, 2));
      const transaction = orderData.purchase_units[0].payments.captures[0];
      (transaction.status=="COMPLETED")?await SendPay({id:localStorage.getItem("idUser"),idvip:2,price:codeID}):window.location='pricing.html';
     
    });
  }
}).render('#paypal-button-container');






var URL='https://s-hd.herokuapp.com/';
async function SendPay(data) {
    const response=await fetch(`${URL}Payment`,{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(data)
    });
    return response;
}

