const CartContext = createContext();

const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const [total, setTotal] = useState(0);
    
    const addToCart = (product) => {
        setCart([...cart, product]);
    };
    
    const removeFromCart = (productToRemove) => {
        setCart(cart.filter((product) => product !== productToRemove));
    };

    
    
    useEffect(() => {
        setTotal(cart.reduce((acc, curr) => acc + curr.price, 0));
    }, [cart]);
    
    return (
        <CartContext.Provider value={{ cart, total, addToCart, removeFromCart }}>
        {children}
        </CartContext.Provider>
    );
}