import './App.scss';
import AppRoutes from './routes/AppRoutes';
import Header from './components/Header';
function App() {
    return (
        <div className="app-container">
            <Header></Header>
            <AppRoutes />
        </div>
    );
}

export default App;
