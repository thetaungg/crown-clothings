import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';

const StripeCheckoutButton = ({ price }) => {
    const priceForStripe = price * 100; //stripe wants prices in cents
    const publishableKey = 'pk_test_WphhliRtmZTviR7ZKR7wCAWH00zf0LuZZa';

    const onToken = token => {
        // console.log(token);
        // alert('Payment Successful!')
        axios({ //instead of using fetch
            url: 'payment', //we don't have to type full url because we already added root url of the server in package.json under proxy property
            method: 'post',
            data: { //this is gonna be res.body
                amount: priceForStripe,
                token
            }
        }).then(response => {
            alert('Payment successful')
        }).catch(error => {
            console.log('Payment error: ', JSON.parse(error));
            alert('There was an issue with your payment. Please make sure to use provided credit card.')
        })
    };
    return(
        <StripeCheckout
            label='Pay Now'
            name='Crown Clothing Ltd.'
            billingAddress
            shippingAddress
            image='https://svgshare.com/i/CUz.svg'
            description={`Your total is $${price}`}
            amount={priceForStripe}
            panelLabel='Pay Now'
            token={onToken}
            stripeKey={publishableKey}
        />
    )
};

export default StripeCheckoutButton;