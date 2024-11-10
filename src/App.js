import './App.css';
import FilterView from './FilterView';
import portfolio from './portfolio';

function App() {
  return (
    <div className="App">
      <FilterView props={portfolio}/>
    </div>
  );
}

export default App;
