import React, { useState } from 'react';
import { Button, Card } from 'antd';
import './Apikey.css';

function Apikey() {
  const [key, setKey] = useState("");

  const newApi = () => {
    const apiUrl = 'https://shopify-backend-12121.herokuapp.com/api/key';
    fetch(apiUrl)
      .then(res => res.json())
      .then(
        (result) => {
            setKey(result.key);
        }
    )
  }
  return (
    <div className="Apikey">
      <p className="Apikey-header">Request a New Key</p>
      <center>
          <Card style={{width: 400, height: 200}}>
            <Button type="primary" onClick={e => newApi()}>
                Request Key
            </Button>
            <br />
            <br />
            <p>{key}</p>
          </Card>
      </center>
    </div>
  );
}

export default Apikey;