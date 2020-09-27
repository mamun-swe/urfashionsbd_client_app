import {
    CART_PRODUCT_REQUEST,
    CART_PRODUCT_SUCCESS,
    CART_PRODUCT_FAILED,
    PRODUCT_ADD_CART_REQUEST,
    PRODUCT_REMOVE_FROM_CART,
    INCREMENT_PRODUCT_QUANTITY,
    DECREMENT_PRODUCT_QUANTITY
} from '../types';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure({ autoClose: 2000 })

const initialState = {
    loading: false,
    cartProducts: [],
    error: "",
    add_success: "",
}

export default function (state = initialState, action) {
    switch (action.type) {

        // All Cart Products
        case CART_PRODUCT_REQUEST:
            return {
                ...state,
                loading: true
            }
        case CART_PRODUCT_SUCCESS:
            return {
                ...state,
                loading: false,
                cartProducts: action.payload
            }
        case CART_PRODUCT_FAILED:
            return {
                ...state,
                loading: false,
                cartProducts: [],
                error: action.payload
            }


        // Product Add To Cart
        case PRODUCT_ADD_CART_REQUEST:
            let productAlreadyExists = state.cartProducts.find(x => x.id === action.payload.id);
            if (productAlreadyExists) {
                toast.warn('Already added into cart')
                return {
                    ...state,
                    add_success: false,
                }
            } else {
                let products = []

                if (localStorage.getItem('products')) {
                    products = JSON.parse(localStorage.getItem('products'))
                }

                products.push(action.payload)
                localStorage.setItem('products', JSON.stringify(products))
                toast.success('One product added into cart')

                return {
                    ...state,
                    cartProducts: [...state.cartProducts, action.payload],
                    add_success: true
                }
            }


        // Product remove
        case PRODUCT_REMOVE_FROM_CART:
            const items = JSON.parse(localStorage.getItem('products'))
            const filtered = items.filter(item => item.id !== action.payload.id)
            localStorage.setItem('products', JSON.stringify(filtered))

            return {
                ...state,
                cartProducts: state.cartProducts.filter((product) => product.id !== action.payload.id),
                add_success: true
            }

        // Increment Quantity
        case INCREMENT_PRODUCT_QUANTITY:
            return {
                ...state,
                cartProducts: state.cartProducts.map((product) => {
                    if (product.id === action.payload) {
                        product.quantity += 1
                        localStorage.setItem('products', JSON.stringify(state.cartProducts))
                    }
                    return product
                }),
                
                add_success: true
            }

        // Decrement Quantity
        case DECREMENT_PRODUCT_QUANTITY:
            return {
                ...state,
                cartProducts: state.cartProducts.map((product) => {
                    if (product.id === action.payload) {
                        product.quantity -= 1
                        localStorage.setItem('products', JSON.stringify(state.cartProducts))
                    }
                    return product
                }),
                add_success: true
            }


        default:
            return state

    }
}