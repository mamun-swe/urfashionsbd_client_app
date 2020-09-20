import React, { useEffect, useState } from 'react';
import '../../styles/navbar.scss';
import { Link, NavLink } from 'react-router-dom';
import { Icon } from 'react-icons-kit';
import {
    user,
    earth,
    twitter,
    facebook,
    instagram
} from 'react-icons-kit/icomoon'
import {
    ic_add_shopping_cart,
    ic_search,
    ic_dehaze, ic_close
} from 'react-icons-kit/md';
import { text_left } from 'react-icons-kit/ikons';
import axios from 'axios';
import { apiURL } from '../../utils/apiURL';
import { useSelector, useDispatch } from 'react-redux';
import { productsList } from '../../Redux/Actions/cartAction';

import SearchComponent from '../Search/Index';
import Logo from '../../assets/static/logo.png';

const NavBar = () => {
    const dispatch = useDispatch()
    const [open, setOpen] = useState(false)
    const [isShow, setIsShow] = useState(false)
    const [categories, setCategories] = useState([])
    const [singleCatId, setSingleCatId] = useState()
    let { cartProducts } = useSelector((state => state.products))

    useEffect(() => {
        dispatch(productsList())
        const fetchCategories = async () => {
            try {
                const categoryResponse = await axios.get(`${apiURL}getCategory`)
                if (categoryResponse.status === 200) {
                    setCategories(categoryResponse.data.result)
                    setSingleCatId(categoryResponse.data.result[0].id)
                }
            } catch (error) {
                if (error) console.log(error)
            }
        }

        fetchCategories()
    }, [dispatch])


    return (
        <div className="custom-navbar">

            {/* Mobile Navbar */}
            <div className="mobile-nav d-lg-none">
                <div className="top-nav p-3">
                    <div className="d-flex">
                        <div>
                            <Link to="/">
                                <img src={Logo} className="img-fluid" alt="..." />
                            </Link>
                        </div>
                        <div className="flex-fill px-2">
                            <SearchComponent />
                        </div>
                        <div className="pr-2">
                            <div className="cart-box">
                                <Link to="/"
                                    type="button"
                                    className="btn rounded-circle shadow-none cart-btn">
                                    <Icon icon={ic_add_shopping_cart} size={22} />
                                </Link>
                                <small>5+</small>
                            </div>
                        </div>
                        <div>
                            <button
                                type="button"
                                className="btn rounded-circle shadow-none p-1 bar-btn"
                                onClick={() => setOpen(true)}>
                                <Icon icon={ic_dehaze} size={25} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Menu */}
                <div className={open ? "mobile-menu open-menu" : "mobile-menu"}>
                    <div className="content-header p-3 text-right">
                        <button
                            type="button"
                            className="btn rounded-circle shadow-none p-1"
                            onClick={() => setOpen(false)}>
                            <Icon icon={ic_close} size={25} />
                        </button>
                    </div>
                    <div className="content-body px-4">
                        <Link to="/">home</Link>
                        <Link to="/">shop</Link>
                        {/* <Link to="/">sales</Link> */}
                        <Link to="/">new arrival</Link>
                        <Link to="/">contact</Link>
                        <Link to="/">my account</Link>
                    </div>
                </div>
            </div>

            {/* Desktop Nav One */}
            <div className="desktop-nav-one d-none d-lg-block">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="d-flex py-4">
                                <div className="links">
                                    <ul>
                                        <li>
                                            <Link to="/">
                                                <img src={Logo} className="img-fluid" alt="..." />
                                            </Link>
                                        </li>
                                        <li><NavLink exact activeClassName="is-active" to="/">home</NavLink></li>
                                        <li><NavLink exact activeClassName="is-active" to={`/category/${singleCatId}`}>shop</NavLink></li>
                                        {/* <li><NavLink exact activeClassName="is-active" to="/sales">sales</NavLink></li> */}
                                        <li><NavLink exact activeClassName="is-active" to="/new-arrival">new arrival</NavLink></li>
                                        <li><NavLink exact activeClassName="is-active" to="/contact">contact</NavLink></li>
                                    </ul>
                                </div>
                                <div className="ml-auto account-links">
                                    <ul>
                                        <li>
                                            <Link to="/sign-in">
                                                <div className="d-flex">
                                                    <div><Icon icon={user} size={20} color="#000" className="border p-1" /></div>
                                                    <div className="pl-2">
                                                        <p className="mb-0">my account</p>
                                                        <small>sing in/join</small>
                                                    </div>
                                                </div>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="/shopping-cart">
                                                <div className="d-flex">
                                                    <div><Icon icon={ic_add_shopping_cart} size={20} color="#000" className="border p-1" /></div>
                                                    <div className="pl-2">
                                                        <p className="mb-0">my cart</p>
                                                        {
                                                            cartProducts ?
                                                                <small>{cartProducts.length} items</small>
                                                                : <small>2 items</small>
                                                        }
                                                    </div>
                                                </div>
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Desktop Nav Black */}
            <div className="desktop-nav-black d-none d-lg-block py-3">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="d-flex">
                                <div>
                                    <div className="d-flex">
                                        <div>
                                            <button
                                                type="button"
                                                className="btn shadow-none p-0"
                                                onClick={() => setIsShow(!isShow)}
                                            >
                                                <Icon icon={text_left} size={18} />
                                            </button>
                                        </div>
                                        <div className="px-2 category-hover-box">
                                            <p className="mb-0 category-title">Categories</p>
                                            {isShow ?
                                                <div className="category-dialog shadow-sm">
                                                    {categories.length > 0 && categories.map((category, i) =>
                                                        <Link to={`/category/${category.id}`} key={i}>{category.name}</Link>
                                                    )}
                                                </div>
                                                : null}
                                        </div>
                                        <div className="search-desktop">
                                            <form>
                                                <div className="form-group mb-0">
                                                    <input
                                                        type="text"
                                                        className="form-control rounded-0 shadow-none"
                                                        placeholder="Enter Your Keyword"
                                                    />
                                                    <Icon className="search-icon" icon={ic_search} size={20} style={{ color: "#fff" }} />
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                                <div className="ml-auto">
                                    <ul>
                                        <li><a href="https://www.facebook.com/"><Icon icon={user} size={15} /></a></li>
                                        <li><a href="https://www.facebook.com/"><Icon icon={earth} size={15} /></a></li>
                                        <li><a href="https://www.facebook.com/"><Icon icon={twitter} size={15} /></a></li>
                                        <li><a href="https://www.facebook.com/"><Icon icon={facebook} size={15} /></a></li>
                                        <li><a href="https://www.facebook.com/"><Icon icon={instagram} size={15} /></a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NavBar;