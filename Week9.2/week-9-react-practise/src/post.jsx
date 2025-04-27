const style = { width: 200, borderRadius: 10, borderColor: "red", 
    borderWidth: 10, padding: 10, backgroundColor: "white", margin: 10
  };
  
  // define component
  export function PostComponent({name, image, subtitle, time, description}) {
    return (
      <div style={style}>
        <div style={{display: "flex"}}>
          <img src={image} 
          style={{
            height: 30,
            width: 30,
            borderRadius: 20
          }} />
          <div style={{fontSize: 10, marginLeft: 10}}>
            <b> {name} </b>
            <div>{subtitle}</div>
            {(time !== undefined) ? <div style={{display: "flex"}}>
              <div>{time}</div>
              <img src="https://static-00.iconduck.com/assets.00/clock-icon-1024x1024-bx9damsl.png" style={{height:5, width:10, marginTop: 4, marginLeft: 1}}/>
            </div> : null}
          </div>
        </div >
        <div style={{fontSize: 10}}> 
          {description} 
        </div>
      </div>
    )
  }