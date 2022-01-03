export const calculateINR = (amt) => (amt * process.env.NEXT_PUBLIC_USD_INR_CONV_RATE).toFixed(0);

export const calculateBasePrice = (amt) => (calculateINR(amt) / process.env.NEXT_PUBLIC_DISCOUNT).toFixed(0);

export const calculateDiscount = (amt) => (calculateBasePrice(amt) - calculateINR(amt)).toFixed(0);