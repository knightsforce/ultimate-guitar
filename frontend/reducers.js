import { combineReducers } from 'redux';


let red = combineReducers({
	products,
});
export default red;
alert("//////////"+red);
const flags = {
	products: {
		addProduct: "ADD_PRODUCT",
	}
} 

function products(state={a: 1}, action) {
	switch(atction) {
		case flags["addProduct"]["ADD_PRODUCT"]:
			return (Object.accign({},state));
			break;
		default:
			return state;
	}
}