import Header from './components/Header/Header';
import SearchInput from './features/search/components/SearchInput';

import './App.css';

function App() {
    return (
        <>
            <Header />

            <main className="main">
                <section className="hero">
                    <h1>
                        ВАШ ФАВОРИТ
                        <br />
                        В ВЫБОРЕ АВТОЗАПЧАСТЕЙ
                    </h1>

                    <SearchInput />
                </section>
            </main>
        </>
    );
}

export default App;