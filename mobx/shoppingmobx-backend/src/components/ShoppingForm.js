import {useState,useContext} from 'react';
import ShoppingContext from '../context/ShoppingContext'
import {observer} from 'mobx-react-lite';
const ShoppingForm = (props) => {
	
	const [item,setItem] = useState({
		type:"",
		count:0,
		price:0
	})
	
	const store = useContext(ShoppingContext);
	
	const onSubmit = (event) => {
		event.preventDefault();
		store.addToList(item);
		setItem({
			type:"",
			count:0,
			price:0
		})
	}
	
	const onChange = (event) => {
		setItem({
			...item,
			[event.target.name]:event.target.value
		})
	}
	
	return(
		<form onSubmit={onSubmit}>
			<label htmlFor="type">Type:</label>
			<input type="text"
					name="type"
					onChange={onChange}
					value={item.type}/>
			<br/>
			<label htmlFor="count">Count:</label>
			<input type="number"
					name="count"
					onChange={onChange}
					value={item.count}/>
			<br/>
			<label htmlFor="price">Price:</label>
			<input type="number"
					name="price"
					step="0.01"
					onChange={onChange}
					value={item.price}/>
			<br/>
			<button type="submit">Add</button>
		</form>
	)
	
}

export default observer(ShoppingForm);

