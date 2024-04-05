import "./navbarTwo.css"

export default function NavbarTwo(){
    return (
        <nav className="nav2">
            <div className="nav2_inner">
            <img className="logo" src="/logo3.png"/>

            <div className="Search_container">
            <div className="login_btn_container">
            <img src="/login.png"/>
            <span>Login</span>
            </div>
            <div className="login_btn_container">
            <img src="/heart.png"/>
            <span>Wistlist</span>
            </div>
            <input placeholder="Search"/>
            </div>
            </div>
        </nav>
    )
}