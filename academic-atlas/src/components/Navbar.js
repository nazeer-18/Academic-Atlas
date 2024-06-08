import '../styles/Navbar.css';
import logoImage from '../assets/logo.jpg';

export default function Navbar() {
    return (
        <div className="navbar-header">
            <img src={logoImage} alt="logo" />
            Academic Atlas
        </div>
    );
}