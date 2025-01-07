import './App.scss';
import AppRoutes from './routes/AppRoutes';
import Header from './components/Header';
import ChatHistory from './components/ChatHistory';
function App() {
    return (
        <div className="app-container">
            <Header></Header>
            <AppRoutes />
        </div>
    );
}

export default App;
