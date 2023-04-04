import {useState} from 'react';


function App() {

  const [balance, setBalance] = useState(0);
  const [record, setRecord] = useState([]);
  const [data, setData] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');
  

  // here input data saved
  const saveData = async(e) => {
    await setData(parseInt(e.target.value));
    setErrorMessage('');
  }

  // add button function
  const addAmount = async(e) => {
    e.preventDefault();
    setErrorMessage('');
    const sum = balance + data;
    await setBalance(sum);
    const obj = {
      id: record.length + 1,
      amount: data,
      operation: "add",
      time: Date()
    }
    record.push(obj);
    setRecord(record);
    await setData(0);
    console.log('total amount', balance ,'data is', data , record);
  }

  // remove button function
  const removeAmount = async(e) => {
    e.preventDefault();
    if(data > balance){
      setErrorMessage('Entered Amount is greater than available Balance,Please Apply for a loan!!!');
      return;
    }
    const rest = balance - data;
    await setBalance(rest);
    const obj = {
      id: record.length + 1,
      amount: data,
      operation: "remove",
      time: Date()
    }
    record.push(obj);
    setRecord(record);
    await setData(0);
    console.log('total amount', balance ,'data is', data);
  }

  return (
    <div className="App">
      <div className='header'>
          <img src='https://cdn-icons-png.flaticon.com/128/7546/7546695.png' alt='track-icon' />
          <h1>
            Expense Tracker
          </h1>
      </div>
      <div className='form-div'>
        <h3>Balance : <span>{balance} </span>Rs.</h3>
        <div class="input-group" className='input-group'>
          <input type="Number" class="form-control" onChange={saveData} value={data} required aria-label="Recipient's username" aria-describedby="basic-addon2"/>
          <div class="input-group-append">
            <button class="btn btn-outline-secondary" type="submit" onClick={(e)=> addAmount(e)}>Add</button>
            <button class="btn btn-outline-secondary" type="button" onClick={(e)=> removeAmount(e)}>Remove</button>
          </div>
        </div>
        {errorMessage && (
          <p className="error"> {errorMessage} </p>
        )}
      </div>
      <div className='transaction-div'>
        <h4>Transactions:</h4>
        <table class="table">
          <thead class="thead-dark .thead-dark">
            <tr>
              <th scope="col">id</th>
              <th scope="col">Time</th>
              <th scope="col">Amount</th>
              <th scope="col">Operation</th>
            </tr>
          </thead>
          <tbody>
              {record.map((item)=> (
                <tr>
                  <th scope="row">{item.id}</th>
                  <td>{item.time}</td>
                  <td>Rs. {item.amount}</td>
                  <td>{item.operation}</td>
                </tr>
              ))}
          </tbody>
          {/* <tbody>
            <tr>
              <th scope="row">1</th>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
            </tr>
            <tr>
              <th scope="row">2</th>
              <td>Jacob</td>
              <td>Thornton</td>
              <td>@fat</td>
            </tr>
            <tr>
              <th scope="row">3</th>
              <td>Larry</td>
              <td>the Bird</td>
              <td>@twitter</td>
            </tr>
          </tbody> */}
        </table>

      </div>
      
    </div>
  );
}

export default App;
