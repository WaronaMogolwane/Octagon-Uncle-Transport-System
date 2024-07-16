import axios from "axios"
const qs = require('qs');
const PAYSTACK_SECRET_KEY = "sk_test_15b32363d5ec93adf4cb35693b162ac7f87d4224"
export const CreateNewPlan = async (req: any, res: any, next: any) => {
    let data = qs.stringify({
        'name': 'Dailt 5000',
        'interval': 'daily',
        'amount': '500000',
        'currency': 'ZAR',
        'description': 'Daily 5000'
    });

    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://api.paystack.co/plan',
        headers: {
            'Authorization': 'Bearer ' + PAYSTACK_SECRET_KEY,
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: data
    };

    axios.request(config)
        .then((response) => {
            console.log(JSON.stringify(response.data));
        })
        .catch((error) => {
            console.log(error);
        });
}
export const CreateNewCustomer = async (req: any, res: any, next: any) => {
    const data = qs.stringify({
        "email": "customer@email2.com",
        "first_name": "Zero",
        "last_name": "Sum",
        "phone": "+2348123456789"
    })
    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://api.paystack.co/customer',
        headers: {
            'Authorization': 'Bearer ' + PAYSTACK_SECRET_KEY,
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: data
    };

    axios.request(config)
        .then((response) => {
            console.log(JSON.stringify(response.data));
        })
        .catch((error) => {
            console.log(error.data);
        });

}
export const CreateNewSubscription = async (req: any, res: any, next: any) => {
    let data = qs.stringify({
        'customer': 'CUS_jz592bca3frmv0k',
        'plan': 'PLN_eeq6r3ymkhilhep',
        'start_date': new Date() //'2017-05-16T00:30:13+01:00'
    });

    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://api.paystack.co/subscription',
        headers: {
            'Authorization': 'Bearer ' + PAYSTACK_SECRET_KEY,
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: data
    };

    axios.request(config)
        .then((response) => {
            console.log(JSON.stringify(response.data));
        })
        .catch((error) => {
            console.log(error.response.data);
        });
}
export const TokenizePaymentInstrument = async (req: any, res: any, next: any) => {
    let data: any = req.body;

    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://api.paystack.co/charge/tokenize',
        headers: {
            'Authorization': 'Bearer ' + PAYSTACK_SECRET_KEY,
            'Content-Type': 'application/json',
        },
        data: data
    };

    axios.request(config)
        .then((response) => {
            console.log(JSON.stringify(response.data));
        })
        .catch((error) => {
            console.log(error.response.data);
        });
}