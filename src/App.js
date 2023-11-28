// import logo from './logo.svg';
import './App.css';
import './Stylesheet/Style.css';
import Home from './Compo/Home';
import NavbarCompo from './Navbar/NavbarCompo';

function App() {
  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
      <NavbarCompo />
      <Home />
    </div>
  );
}

export default App;
