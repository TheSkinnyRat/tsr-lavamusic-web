
function App(props) {
  
  return (
    <div className={`alert alert-${props.alert.type ? props.alert.type : `secondary`} p-2 px-3`} role="alert">
      {props.alert.loading ? <i className="fa-solid fa-rotate fa-spin"></i> : null}&nbsp;
      {props.alert.title ? props.alert.title : `Unknown Alert`}
    </div>
  );
}

export default App;
