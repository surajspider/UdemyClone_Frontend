// import logo from './logo.svg';
import './App.css';
import './Stylesheet/Style.css';
import RouteCompo from './RouterCompo/RouteCompo';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';

function App() {
  const initialOptions = {
    clientId: "Ac5ve0-bGb14hMh5AbWFnOiEwBgkMgsl0wzD09hwTt9E1hCb1yuL_SzmqEhO9t-JERF__iC7t9g_fT3v",
    currency: "USD",
    intent: "capture",
  };
  return (
    <PayPalScriptProvider options={initialOptions}>
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
        <RouteCompo />
      </div>
    </PayPalScriptProvider>
  );
}

export default App;
