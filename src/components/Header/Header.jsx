
import './Header.css';

function Header() {
    return (
        <header className="header">
            <div className="header-top">
                <div className="header-container">
                    <div className="header-phone">
                        8 800 777 8548
                    </div>

                    <div className="header-actions">
                        <a href="#">Стать поставщиком</a>
                        <a href="#">Стать клиентом</a>
                    </div>
                </div>
            </div>

            <div className="header-container header-main">
                <div className="logo">
                    FAVORIT
                    <span>PARTS</span>
                </div>

                <nav className="navigation">
                    <a href="#">Компания</a>
                    <a href="#">Сервис</a>
                    <a href="#">Ассортимент</a>
                    <a href="#">Акции</a>
                    <a href="#">Новости</a>
                    <a href="#">Регистрация</a>
                </nav>

                <div className="header-city">
                    Миасс
                </div>
            </div>
        </header>
    );
}

export default Header;
