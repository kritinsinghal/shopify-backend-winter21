import React, { useState, useEffect, Fragment } from 'react';
import { Button, Input, Card, Divider } from 'antd';
import { Link, useHistory } from 'react-router-dom';
import { newInv } from '../../helpers/utils';

import './UploadInv.css';

function UploadInv() {
  const [price, setPrice] = useState(null);
  const [qty, setQty] = useState(null);
  const [discount, setDiscount] = useState(null);
  const [name, setName] = useState(null);
  const [image, setImage] = useState(null);
  const [flag, setFlag] = useState(false);
  const history = useHistory();

  const newListing = () => {
    if ((price === null || price.length === 0) || (name === null || name.length === 0) || 
      (qty === null || qty.length === 0) || (discount === null || discount.length === 0) ||
      (image === null || image.length === 0)) {
      setFlag(true);
    } else if (isNaN(price) || isNaN(qty) || isNaN(discount)) {
      setFlag(true);
    } else {
      setFlag(false);
      newInv(name, image, price, qty, discount);
      history.push('/');
    }
  }

  return (
    <div className="Upload">
      <p className="Upload-header">New Inventory</p>
      <center>
      <Card className="Upload-manager-content">
          <Input 
              addonBefore="Name" 
              defaultValue='' 
              className="Upload-input"
              onChange={e => setName(e.target.value)}
          />
          <Divider />
          <Input 
              addonBefore="Image URL" 
              defaultValue='' 
              className="Upload-input"
              onChange={e => setImage(e.target.value)}
          />
          <Divider />
          <Input 
              addonBefore="Price ($CAD)" 
              defaultValue='' 
              className="Upload-input"
              onChange={e => setPrice(e.target.value)}
          />
          <Divider />
          <Input 
              addonBefore="Quantity" 
              defaultValue=''
              className="Upload-input"
              onChange={e => setQty(e.target.value)}
          />
          <Divider />
          <Input 
              addonBefore="Discount" 
              addonAfter="%" 
              defaultValue=''
              className="Upload-input"
              onChange={e => setDiscount(e.target.value)}
          />
          <Divider />
          <Button type="primary" onClick={e => newListing()}>Create</Button>
          <br />
          {flag === true &&
            <p className="invalid">Invalid Format</p>
          }
      </Card>
      </center>
    </div>
  );
}

export default UploadInv;