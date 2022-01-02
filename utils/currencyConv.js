export const calculateINR = (amt) => (amt * 75).toFixed(0);

export const calculateBasePrice = (amt) => (calculateINR(amt) * 4 / 3).toFixed(0);

export const calculateDiscount = (amt) => (calculateBasePrice(amt) - calculateINR(amt)).toFixed(0);