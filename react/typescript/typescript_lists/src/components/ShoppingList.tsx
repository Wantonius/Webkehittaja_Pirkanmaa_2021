import React from 'react';
import ShoppingItem from '../models/ShoppingItem';

interface Props {
	list:ShoppingItem[],
	removeFromList(id:number):void
}

export default class ShoppingList extends React.Component<Props> {

	render() {
		let items = this.props.list.map((item) => {
			return <tr key={item.id}>
						<td>{item.type}</td>
						<td>{item.count}</td>
						<td>{item.price}</td>
						<td><button onClick={() => this.props.removeFromList(item.id)}>Remove</button></td>					
					</tr>
		})
		return (
			<table>
				<thead>
					<tr>
						<th>Item type</th>
						<th>Count</th>
						<th>Price</th>
						<th>Remove</th>
					</tr>
				</thead>
				<tbody>
				{items}
				</tbody>
			</table>
		)	
	}
}