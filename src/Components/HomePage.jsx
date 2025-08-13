import { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useDispatch } from "react-redux";
import { addToCart } from "../Redux/Slices/ProductSlice";

function HomePage(props) {
    const [productData, setProductData] = useState([]);
    const dispatch = useDispatch();

    const fetchData = async () => {
        let response = await fetch('https://shopping-card-data.onrender.com/products')

        try {
            let data = await response.json();
            setProductData(data)
        }
        catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchData();
    }, [])

    const handleAddToData = (productValue)=>{
       dispatch(addToCart(productValue));
    }

    return (
        <div className='container con'>
            <h2 className='text-center'>Product Home Page </h2>
            <div className='row cart_row'>
                {
                    productData.map((item) => {
                        return (
                        
                                <Card style={{ width: '16rem', height: "25rem" }} className='mx-2 mt-4 card_style' key={item.id}>
                                    <Card.Img variant="top" src={item.images[0]} style={{ height: "14rem" }} className='mt-3  img1' />
                                    <Card.Body className='cart_body'>
                                        <Card.Title className='cart_title'>{item.category}</Card.Title>
                                        <Card.Text> Price : ₹ {item.price} </Card.Text>
                                        <div className='cart_btn1'>
                                            <Button variant="danger" className='btn1'
                                            onClick={() => handleAddToData(item) }
                                            > Add To Cart </Button>
                                        </div>
                                    </Card.Body>
                                </Card>
                        
                        )
                    })
                }
            </div>
        </div>
    );
}

export default HomePage;