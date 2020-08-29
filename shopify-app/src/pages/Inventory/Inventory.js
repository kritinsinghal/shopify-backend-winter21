import React, { useState, useEffect, Fragment } from 'react';
import { useRouteMatch, Redirect } from 'react-router-dom';

import { Row, Col, Statistic, Card, Image, Input, Button } from 'antd';
import { Link, useHistory } from 'react-router-dom';
import { deleteInv, updateInv } from '../../helpers/utils';

import './Inventory.css';

function Inventory() {
    const [error, setError] = useState(null);
    const [isLoaded1, setIsLoaded1] = useState(false);
    const [isLoaded2, setIsLoaded2] = useState(false);
    const [item, setItem] = useState({});
    const [sales, setSales] = useState({});
    const [redirect, setRedirect] = useState(false);
    const [price, setPrice] = useState(null);
    const [qty, setQty] = useState(null);
    const [discount, setDiscount] = useState(null);

    const history = useHistory();
    let inventoryId = useRouteMatch();
    inventoryId = inventoryId.params.id;
    
    useEffect(() => { 
        const apiUrl1 = 'http://127.0.0.1:5000/api/inventory/' + inventoryId;
        const apiUrl2 = 'http://127.0.0.1:5000/api/sales/' + inventoryId;
        fetch(apiUrl1)
          .then(res => res.json())
          .then(
            (result) => {
                if (result.data !== null) {
                    setItem(result.data);
                    setPrice(result.data.price);
                    setQty(result.data.qty);
                    setDiscount(result.data.discount);
                }
                setIsLoaded1(true);
            },
            (error) => {
                setIsLoaded1(true);
                setError(error);
            }
          )
          fetch(apiUrl2)
          .then(res => res.json())
          .then(
            (result) => {
                if (result.data !== null) {
                    setSales(result.data);
                }
                setIsLoaded2(true);
            },
            (error) => {
                setIsLoaded2(true);
                setError(error);
            }
          )
    }, [])


    const deleteListing = () => {
        deleteInv(inventoryId);
        setRedirect(true)
    }

    const updateListing = () => {
        updateInv(inventoryId, price, qty, discount);
        window.location.reload(false);
    }
    
    if (redirect) {
        return <Redirect to='/'/>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded1 || !isLoaded2) {
        return <div>Loading...</div>;
    } else if (item === {}) {
        return <div>404 not found</div>
    }

    return (
        <div className="Inventory">
            <p className="Inventory-header">Inventory Management & Sales</p>
            <center>
            <Card className="Inventory-sales">
                <Row justify="space-around">
                    <Col span={8} className="Inventory-price">
                        <Statistic title="Current Price ($CAD)" value={sales.price} precision={2} />
                    </Col>
                    <Col span={8}>
                        <Statistic title="Qty Sold" value={sales.sold} />
                    </Col>
                    <Col span={8}>
                        <Statistic title="Total Sales ($CAD)" value={sales.value} precision={2} />
                    </Col>
                </Row>
            </Card>
            <Card className="Inventory-sales">
                <p className="Inventory-header">{item.name}</p>
                <Row>
                    <Col span={12}>
                        <Image
                            className="Inventory-image"
                            src={item.image}
                        />
                    </Col>
                    <Col span={12}>
                        <div className="Inventory-manager-content">
                            <Input 
                                addonBefore="Price ($CAD)" 
                                defaultValue={item.price} 
                                className="Inventory-input"
                                onChange={e => setPrice(e.target.value)}
                            />
                            <Input 
                                addonBefore="Quantity" 
                                defaultValue={item.qty} 
                                className="Inventory-input"
                                onChange={e => setQty(e.target.value)}
                            />
                            <Input 
                                addonBefore="Discount" 
                                addonAfter="%" 
                                defaultValue={item.discount} 
                                className="Inventory-input"
                                onChange={e => setDiscount(e.target.value)}
                            />
                        </div>
                        <Row>
                            <Col span={12}>
                                <Button type="primary" onClick={e => updateListing()}>Update</Button>
                            </Col>
                            <Col span={12}>
                                <Button type="primary" danger onClick={e => deleteListing()}>Delete Listing</Button>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Card>
            </center>
        </div>
    );
}

export default Inventory;