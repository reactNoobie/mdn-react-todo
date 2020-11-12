function App(props) {
  console.log(props);
  return (
    <div className="App">
      <header className="App-header">
        <p>Hello {props.subject}!</p>
      </header>
    </div>
  );
}

export default App;
