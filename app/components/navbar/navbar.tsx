import "./navbar.css"

export default function Navbar() {
    return (
        <nav className="nav">
                <img className='logo' src="./logo2.png"/>
            <div>
                <a href="#">Logo</a>
                <a href="#">Products</a>
                <a href="#">About</a>
                <a href="#">Support</a>
            </div>

        </nav>
    )
}