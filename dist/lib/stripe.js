// this is for checout session
var _a;
import Stripe from 'stripe';
export var stripe = new Stripe((_a = process.env.STRIPE_SECRET_KEY) !== null && _a !== void 0 ? _a : '', {
    apiVersion: '2024-06-20',
    typescript: true,
});
