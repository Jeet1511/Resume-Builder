import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import AppRoutes from './routes/AppRoutes';
import './styles/main.css';

function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <div className="app-bg"></div>
                <Navbar />
                <AppRoutes />
                <Footer />
            </AuthProvider>
        </BrowserRouter>
    );
}

export default App;
