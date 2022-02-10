import logo from './logo.svg';
import './App.css';

import Editor from './Editor'
import EnterKey from './EnterKey'

function App() {

  if (localStorage.getItem("key") == null) {
    return <div className="App">
      <EnterKey />
    </div>
  }

  return (
    <div className="App">
      <Editor code={localStorage.getItem("code")}/>
    </div>
  );
}

export default App;
