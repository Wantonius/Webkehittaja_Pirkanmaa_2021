import ShoppingContext from './ShoppingContext';
import ShoppingStore from './ShoppingStore';

const store = new ShoppingStore();

const ShoppingProvider = (props) => {
	
	return (
		<ShoppingContext.Provider value={store}>
			{props.children}
		</ShoppingContext.Provider>
	)
}

export default ShoppingProvider;