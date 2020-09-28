import React, { useEffect, useState } from 'react';
import '../../styles/search-result.scss';
import queryString from 'query-string';
import { apiURL } from '../../utils/apiURL';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Icon } from 'react-icons-kit';
import { shoppingBag } from 'react-icons-kit/feather';
import { heartO } from 'react-icons-kit/fa';
import { useDispatch } from 'react-redux';
import { addProduct } from '../../Redux/Actions/cartAction';

import NavBarComponent from '../../Components/NavBar/NavBar';
import FooterComponent from '../../Components/Footer/Index';
import ProductModalComponent from '../../Components/Modal/ProductModal';
import LoadingComponent from '../../Components/Loader';

import NotFoundImg from '../../assets/static/empty_shopping_cart.png';

const Index = (props) => {
    const [isLoading, setLoading] = useState(true)
    const [products, setProducts] = useState([])
    const [modalShow, setModalShow] = useState(false)
    const [modalData, setModalData] = useState({})
    const value = queryString.parse(props.location.search).query
    const dispatch = useDispatch()

    useEffect(() => {
        const filterProducts = async () => {
            try {
                setLoading(true)
                const response = await axios.get(`${apiURL}searchProducts/${value}`)
                setProducts(response.data.result)
                setLoading(false)
            } catch (error) {
                if (error) console.log(error.response)
            }
        }

        filterProducts()
    }, [value])

    const handleModal = data => {
        setModalShow(true)
        setModalData(data)
    }

    // Add to cart
    const addToCart = data => {
        const newData = {
            id: data.id,
            name: data.name,
            price: data.selling_price,
            stock: data.stock,
            image: data.image,
            quantity: 1
        }
        dispatch(addProduct(newData))
    }

    return (
        <div className="search-result">
            {isLoading ? <LoadingComponent /> :
                <div>
                    <NavBarComponent />


                    <div className="container py-4">
                        <div className="row">
                            <div className="col-12 text-center">
                                <h5>You search for: {value}</h5>
                            </div>

                            {products.length > 0 ?
                                <div className="col-12">
                                    {products.map((product, i) =>
                                        <div className="card rounded-0 product-card" key={i}>
                                            <div className="card-body">
                                                <div className="img-box">
                                                    <img src={product.image} className="img-fluid" alt="..." />
                                                    <div className="action-buttons text-right">
                                                        <button
                                                            type="button"
                                                            className="btn rounded-circle shadow-none shopping-bag-btn"
                                                            onClick={() => addToCart(product)}
                                                        >
                                                            <Icon icon={shoppingBag} size={16} />
                                                        </button>
                                                        <button
                                                            type="button"
                                                            className="btn rounded-circle shadow-none wish-list-btn"
                                                        >
                                                            <Icon icon={heartO} size={18} />
                                                        </button>
                                                    </div>
                                                    <div className="overlay">
                                                        <div className="flex-center flex-column quick-view">
                                                            <button
                                                                type="button"
                                                                className="btn shadow-none"
                                                                onClick={() => handleModal(product)}
                                                            >Quick View</button>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="product-card-footer border">
                                                    <Link to={`/product/${product.id}/${product.name}`}>
                                                        <div className="d-sm-flex">
                                                            <div>
                                                                <p className="name">{product.name.slice(0, 15)}</p>
                                                            </div>
                                                            <div className="ml-auto">
                                                                <p className="price">${product.selling_price}</p>
                                                            </div>
                                                        </div>
                                                    </Link>
                                                </div>

                                            </div>
                                        </div>
                                    )}
                                </div>
                                :
                                <div className="col-12 text-center four-o-four mt-3">
                                    <img src={NotFoundImg} className="img-fluid" alt="..." />
                                    <h5 className="mt-3">0 Results</h5>
                                    <Link to="/" type="button" className="btn shadow-none">Back To Shopping</Link>
                                </div>
                            }
                        </div>
                    </div>

                    {/* Product Modal */}
                    <ProductModalComponent
                        productinfo={modalData}
                        show={modalShow}
                        onHide={() => setModalShow(false)}
                    />


                    <FooterComponent />
                </div>
            }
        </div>
    );
};

export default Index;