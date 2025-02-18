import { Stripe, loadStripe } from '@stripe/stripe-js';

let stripePromise: Stripe | null;

const initializeStripe = async () => {
    if (!stripePromise) {
        stripePromise = await loadStripe(
            "pk_live_51LmPo5Gqbih0hMSxmsBcNsoq8tOicmTX5z0sPlsmPaJpUERiR0gdUzSkMJl6j2wjcR5HsQrDgFKd1oKee4IOi1Z4000RYRhMvR"
        );
    }

    return stripePromise;
};

export default initializeStripe;