import logo from './logo.svg';
import './App.css';
import ShoppingForm from './components/ShoppingForm';
import ShoppingList from './components/ShoppingList';

function App() {
  return (
    <div className="App">
		<ShoppingForm/>
		<hr/>
		<ShoppingList/>
    </div>
  );
}

export default App;
