import navStyles from '../styles/Nav.module.css'
import Link from 'next/link'
import AboutModal from '../components/AboutModal';



const Nav = () => {
    return (
        <nav className={navStyles.nav}>
            <ul>
                <li>
                    <Link href = '/stats'>Stats</Link>
                </li>
            </ul>
            <ul>
                <li>
                    <Link href = '/'>Home</Link>
                </li>
            </ul>
            <ul>
                <li>
                <Link href = '/about'>About</Link>
                </li>
            </ul>

        </nav>
    )
}

export default Nav