import StockChart from "./components/StockChart";

function App() {
  return (
    <div className="App">
      <h1>График Яндекс Акций</h1>
      {
        StockChart()
      }
    </div>
  );
}

export default App;
