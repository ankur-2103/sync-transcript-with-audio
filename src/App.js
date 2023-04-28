import Transcript from "./Components/Transcript";

function App() {

  const style = {
    background: "linear-gradient(90deg, rgba(66,37,148,1) 0%, rgba(59,59,246,1) 48%, rgba(220,0,193,1) 100%)",
    padding: "20px"
  }

  return (
    <div className="App" style={style}>
      <Transcript/>
    </div>
  );
}

export default App;
