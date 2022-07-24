
function App(props) {
  
  return (
    <div className={`card mb-2 mb-sm-3 bg-light text-center`}>
      <div className={`card-body p-2 text-${props.alert.type ? props.alert.type : `secondary`} text-truncate`}>
        {props.alert.loading ? <i className="fa-solid fa-rotate fa-spin"></i> : null}
        {props.alert.loading ? <span>&nbsp;</span> : null}
        {props.alert.title ? props.alert.title : `Unknown Alert`}
      </div>
    </div>
  );
}

export default App;
