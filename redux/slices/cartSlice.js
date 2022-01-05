import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	cart: []
};

const cartSlice = createSlice({
	name: "cart",
	initialState,
	reducers: {
		initializeCart: (state, action) => {
			state.cart = action.payload;
		},
		addToCart: (state, action) => {
			let found = false;
			for(var i=0; i<state.cart.length; i++){
				if(state.cart[i].id === action.payload.product.id){
					found = true;
					state.cart[i].count += 1;
					break;
				}
			}
			if(!found) state.cart.push({...action.payload.product, count: 1});
			fetch("/api/cart/updateCart", {
				method: "POST",
				body: JSON.stringify({ user: action.payload.user, cart: state.cart }),
			}).catch((err) => console.log(err));
		},
		removeFromCart: (state, action) => {
			const findIndex = state.cart.findIndex(c => c.id === action.payload.product.id);
			if(findIndex >= 0){
				if(state.cart[findIndex]?.count > 1) state.cart[findIndex]?.count -= 1;
				else state.cart = state.cart.filter((item) => item.id !== action.payload.product.id);
				
			}
			fetch("/api/cart/updateCart", {
				method: "POST",
				body: JSON.stringify({ user: action.payload.user, cart: state.cart }),
			}).catch((err) => console.log(err));
		},
	},
});

export const { initializeCart, addToCart, removeFromCart } = cartSlice.actions;
export const selectCart = (state) => state.cart.cart;
export const selectCartSize = (state) => {
	let count = 0;
	state.cart.cart.forEach((c) => count+=Number(c.count))
	return count;
}
export const selectCartAmount = (state) => {
	let amt = 0;
	state.cart.cart.forEach((c) => amt += Number(c.price)*Number(c.count));
	return amt;
}
export default cartSlice.reducer;
