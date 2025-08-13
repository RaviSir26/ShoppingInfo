import { useEffect, useState } from 'react';
import { Link, NavLink, Outlet } from "react-router";
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Badge from '@mui/material/Badge';
import Menu from '@mui/material/Menu';
import Table from 'react-bootstrap/Table';
import { useDispatch, useSelector } from 'react-redux';
import { removeToCart } from '../Redux/Slices/ProductSlice';

function HomeNav() {

    let[totalPrice, setTotalPrice] = useState(0)

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const productData = useSelector((state) => state.productData.cartData);

    // Total Price 

    useEffect(()=>{
        totalPrice = 0;
        productData.map((itemPrice) =>(
            totalPrice += itemPrice.price * itemPrice.quantity
        ))
        setTotalPrice(totalPrice.toFixed(2));

    },[totalPrice, productData])


    const dispatch = useDispatch();
    // Data Remove To Cart In Database
    const handleToRemoveProduct = (productId) =>{
        dispatch(removeToCart(productId));
        // console.log(productId);
        
    }
    return (
        <>
            <Navbar sticky="top" expand="lg" className="bg-body-tertiary">
                <Container fluid>
                    <NavLink to='/' style={{ textDecoration: "none" }}>
                        <Navbar.Brand>Shopping</Navbar.Brand>
                    </NavLink>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav
                            className="me-auto my-2 my-lg-0"
                            style={{ maxHeight: '100px' }}
                            navbarScroll
                        >
                            <NavLink to='/' style={{ textDecoration: "none" }}>
                                <Navbar.Brand>Home</Navbar.Brand>
                            </NavLink>
                            <NavLink to='/cart-details' style={{ textDecoration: "none" }}>
                                <Navbar.Brand>Product Details</Navbar.Brand>
                            </NavLink>

                        </Nav>
                        <Form className="d-flex">
                            <Form.Control
                                type="search"
                                placeholder="Search"
                                className="me-2"
                                aria-label="Search"
                            />
                            <Button variant="outline-success">Search</Button>
                        </Form>
                    </Navbar.Collapse>
                    <Badge badgeContent={productData.length} color="secondary" className="nav_cart_img"
                        id="basic-button"
                        aria-controls={open ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}
                    >
                        <i className="fa-solid fa-cart-shopping"> </i>
                    </Badge>
                </Container>
                <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    slotProps={{
                        list: {
                            'aria-labelledby': 'basic-button',
                        },
                    }}
                >

                    <div className="cart_details_menu">

                        {productData.length ?
                            <Table>
                                <thead>
                                    <tr>
                                        <th> Product Image</th>
                                        <th> Product Details</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        productData.map((items) => {
                                            return (
                                                <tr key={items.id}>
                                                    <td>
                                                        <Link to={`/cart-details/${items.id}`}>
                                                            <img src={items.images[0]} alt='ProductImage' width={150} height={150} onClick={handleClose} />
                                                        </Link>
                                                    </td>
                                                    <td>
                                                        <p><b> Name : </b> {items.category}</p>
                                                        <p><b> Price : </b> {items.quantity * items.price}</p>
                                                        <p><b> Quantity : </b> {items.quantity}</p>
                                                    </td>
                                                     <td className='mt-5' valign='middle' align='center' onClick={handleClose}>
                                                        <i className='fas fa-trash largetrash' onClick={()=> handleToRemoveProduct(items.id)}> </i>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                    
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <td colSpan={2} align='left' valign="middle">
                                            <p>Total Price : ₹ {totalPrice}</p>
                                        </td>
                                    </tr>
                                </tfoot>
                            </Table> 
                           
                            :
                            <div className="cart_details_menu">
                                <i className='fas fa-close smallclose cross_img' onClick={handleClose}></i>
                                <p className='nav_para_cart'>Your Cart Empty</p>
                                <img src='./cart.gif' alt='emptyCartImage' className='empty_cart_Img' />
                            </div>
                        }
                    </div>

                </Menu>

            </Navbar>

            <Outlet />
        </>
    )
}

export default HomeNav;