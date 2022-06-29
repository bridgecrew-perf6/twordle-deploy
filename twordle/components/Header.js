import headerStyles from '../styles/Layout.module.css'
import Link from 'next/link'


const Header = () => {
    return (
        <div>
            <h1 className={headerStyles.title}>
                <span>Twordle</span>
            </h1>
            <p className={headerStyles.description}>Telugu Wordle</p>

        </div>
    )
}

export default Header