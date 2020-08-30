import React, { useState, useEffect, Fragment } from 'react';
import { Row, Col, List, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { buyInventory } from '../../helpers/utils';

import './Home.css';

function Home() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);

    useEffect(() => { 
        const apiUrl = 'https://shopify-backend-12121.herokuapp.com/api/inventory';
        fetch(apiUrl)
          .then(res => res.json())
          .then(
            (result) => {
                setItems(result.data);
                setIsLoaded(true);
            },
            (error) => {
                setIsLoaded(true);
                setError(error);
            }
          )
    }, [])

    const buyInv = (id) => {
        buyInventory(id);
        for (let i=0; i<items.length; i++) {
            if (items[i].inventory_id === id) {
                items[i].qty -= 1;
            }
        }
        setItems(items);
        window.location.reload(false);
    }

    const finPrice = (price, disc) => {
        let priceInt = parseInt(price);
        let discInt = parseInt(disc);
        let fin = priceInt*(100-discInt)/100;
        return fin.toString();
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } 
    return (
        <div className="Home">
            <Row>
                <Col span={20}>
                <p className="Home-header">Items</p>
                </Col>
                <Col spane={4}>
                    <Link to="/upload">
                        <Button type="primary" shape="circle" icon={<PlusOutlined />} />
                    </Link>
                </Col>
            </Row>
            <center>
            <List
                itemLayout="vertical"
                size="large"
                className="Home-list"
                pagination={{
                onChange: page => {
                    console.log(page);
                },
                pageSize: 3,
                }}
                dataSource={items}
                renderItem={item => (
                <List.Item
                    className="Home-list-item"
                    key={item.inventory_id}
                    extra={
                    <img
                        width={272}
                        alt={item.name}
                        src={item.image}
                    />
                    }
                >
                    <p className="Home-card-header">{item.name}</p>
                    <p className="Home-card-content">{"Qty: " + item.qty}</p>
                    <p className="Home-card-content">{"Price: $CAD " + item.price}</p>
                    {item.discount > 0 && 
                        <Fragment>
                            <p className="Home-card-content">{"Discount: " + item.discount + "\%"}</p>
                            <p className="Home-card-content">{"Final Price: " + finPrice(item.price, item.discount)}</p>
                        </Fragment>
                    }
                    <Row>
                        <Col span={8} className="Home-card-button">
                            {item.qty > 0 && 
                                <Button type="primary" onClick={e => buyInv(item.inventory_id)}>Buy</Button>
                            }
                            {item.qty === "0" && 
                                <Button type="primary" disabled>Buy</Button>
                            }
                        </Col>
                        <Col span={16} className="Home-card-button">
                            <Link to={`/inventory/${item.inventory_id}`}>
                                <Button type="primary">Manage</Button>
                            </Link>
                        </Col>
                    </Row>                    
                </List.Item>
                )}
            />
            </center>
        </div>
    );
}

export default Home;
