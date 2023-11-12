import React, { useState, useEffect } from 'react'
import { commerce } from './lib/commerce'
import { Products, Navbar, Cart, Checkout } from './components'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

//const commerce = "pk_3096955556172215d67c81bbaeecd3a9dcc823f482ece";
const App = () => {
    const [products, setProducts] = useState([])
    const [cart, setCart] = useState({})

    const fetchProducts = async () => {
        const { data } = await commerce.products.list()

        setProducts(data)
    }

    const handleAddToCart = async (productId, quantity) => {
        const item = await commerce.cart.add(productId, quantity)

        setCart(item.cart)
    }

    const handleUpdateToCart = async (productId, quantity) => {
        const { cart } = await commerce.cart.update(productId, { quantity })

        setCart(cart)
    }

    const handleRemoveFromCart = async (productId) => {
        const { cart } = await commerce.cart.remove(productId)

        setCart(cart)
    }

    const handleEmptyCart = async () => {
        const { cart } = await commerce.cart.empty()

        setCart(cart)
    }

    const fetchCart = async () => {
        setCart(await commerce.cart.retrieve())
    }

    useEffect(() => {
        fetchProducts()
        fetchCart()
    }, [])

    return (
        <Router>
            <div>
                <Navbar totalItems={cart.total_items} />
                <Switch>
                    <Route exact path="/">
                        <Products products={products} onAddToCart={handleAddToCart} />
                    </Route>
                    <Route exact path="/cart">
                        <Cart 
                        cart={cart}
                        handleUpdateToCart={handleUpdateToCart}
                        handleRemoveFromCart={handleRemoveFromCart}
                        handleEmptyCart={handleEmptyCart}
                        />
                    </Route>
                    <Route exact path="/checkout">
                        <Checkout/>
                    </Route>
                </Switch>
            </div>
        </Router>
    )
}

export default App
