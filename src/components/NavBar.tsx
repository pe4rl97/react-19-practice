import { useState, useTransition } from "react";
import Products from "./Products";
import { Spinner } from "react-bootstrap";

const NavBar = () => {
    const [tab, setTab] = useState('home');
    const [isPending, startTransition] = useTransition();
    function switchTab(tab: string) {
        // setTab(tab);
        startTransition(() => {
            setTab(tab);
        });
    }

    function setStyles(thisTab: string) {
        return {
            backgroundColor: tab === thisTab ? '#262626' : 'white',
            color: tab == thisTab ? 'white' : 'black',
        }
    }

    return (
        <nav>
            <button 
                onClick={() => switchTab('home')}
                style={setStyles('home')}
            >Home</button>
            <button 
                onClick={() => switchTab('products')}
                style={setStyles('products')}
            >Products</button>
            <button 
                onClick={() => switchTab('about')}
                style={setStyles('about')}
            >About</button>
            <div>
                {isPending && <Spinner animation="border" variant="dark" className="mt-5"/>}
                {!isPending && tab === 'home' && <h1>Home page</h1>}
                {!isPending && tab === 'products' && <Products/>}
                {!isPending && tab === 'about' && <h1>About page</h1>}
            </div>
        </nav>
    )
}

export default NavBar