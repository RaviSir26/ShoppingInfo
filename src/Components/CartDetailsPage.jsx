import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import Table from 'react-bootstrap/Table';
import { addToCart, oneRemoveToCart, removeToCart } from '../Redux/Slices/ProductSlice';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

function CartDetailsPage(props) {
    const { id } = useParams();

    const [showProduct, setShowProduct] = useState([]);
    console.log(showProduct);

    let dispatch = useDispatch();
    let navigate = useNavigate();


    const productData = useSelector((state) => state.productData.cartData);
    // console.log(productData);


    useEffect(() => {
        let itemData = productData.filter((item) => item.id === id);
        console.log(itemData);

        setShowProduct(itemData)

    }, [id, productData]);


    // Remove To Cart Data 
    const handleToRemoveProduct = (productId) =>{
        dispatch(removeToCart(productId));   
        navigate('/')
    }

    // Increment To Product Quantity
    const handleToIncrementQuantity = (productValue)=>{
        dispatch(addToCart(productValue))
    }
    
    // Decrement To Product Quantity
    const handleToDecrementQuantity = (productValue)=>{
        dispatch(oneRemoveToCart(productValue))
    }
    


    return (
        <div className='container mt-5' >
            <h2 className='text-center ' style={{ color: 'red' }}>Product Details</h2>
            <section className='container mt-3'>
                <div className='iteamsdetails'>
                    {
                        showProduct.map((value) => {
                            return (
                                <>
                                    <div className='items_img mt-2'>
                                        <img src={value.images[0]} alt="Product Image" height={320} />
                                    </div>
                                    <div className='details'>
                                        <Table>
                                            <tbody>
                                                <tr>
                                                    <td>
                                                        <p><strong>Product Name : </strong> {value.title}</p>
                                                        <p><strong>Brand Name : </strong> {value.brand}</p>
                                                        <p><strong>Price  : </strong> ₹ {value.price}</p>
                                                        <p><strong>Return Policy : </strong> {value.returnPolicy}</p>

                                                        <div className='quantity_button'>
                                                            <button onClick={()=> handleToIncrementQuantity(value)}> <AddIcon/> </button>
                                                            
                                                            <span style={{ fontSize: "20px" }}> {value.quantity} </span>
                                                            
                                                            {/* <button disabled={value.quantity  <= 1} onClick={()=>handleToDecrementQuantity(value)}> <RemoveIcon/> </button> */}

                                                            <button onClick={value.quantity == 1 ? ()=> handleToRemoveProduct(value.id) : ()=>handleToDecrementQuantity(value)}> <RemoveIcon/> </button>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <p><strong>Warranty:</strong> {value.warrantyInformation}</p>
                                                        <p ><strong>Rating : </strong> <span className='rating_star'> {value.rating}  <span className='rating_star1'>✰</span> </span></p>
                                                        <p><strong>Quantity : </strong> {value.quantity}</p>
                                                        <p> <strong>Remove Item : </strong>  &nbsp; &nbsp; 
                                                        <i className='fas fa-trash largetrash' onClick={()=> handleToRemoveProduct(value.id)}> </i> 
                                                        </p>
                                                        <p><strong>Total Amount  : </strong> <br/> ₹ {(value.price * value.quantity).toFixed(2)}</p>
                                                    </td>


                                                </tr>

                                            </tbody>
                                        </Table>
                                    </div>
                                </>
                            )
                        })
                    }
                </div>
            </section>
        </div>
    );
}

export default CartDetailsPage;