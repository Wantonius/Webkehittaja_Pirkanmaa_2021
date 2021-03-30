import {useContext} from 'react';
import {observer} from 'mobx-react-lite';
import ShoppingContext from '../context/ShoppingContext';

const ShoppingList = (props) => {

	const store = useContext(ShoppingContext);
	
	let items = store.list.map((item) => {
		return (
			<tr key={item.id}>
				<td>{item.type}</td>
				<td>{item.count}</td>
				<td>{item.price}</td>
				<td><button onClick={() => store.removeFromList(item.id)}>Remove</button></td>
			</tr>
		)
	})
	
	return(
		<div>
		<h3>Total cost:{store.totalPrice}</h3>		
		<table>
			<thead>
				<tr>
					<th>Type</th>
					<th>Count</th>
					<th>Price</th>
					<th>Remove</th>
				</tr>
			</thead>
			<tbody>
			{items}
			</tbody>
		</table>
		</div>
	)
}

export default observer(ShoppingList);