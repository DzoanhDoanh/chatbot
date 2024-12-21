import { Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import FAQs from '../pages/FAQs';
import Chat from '../pages/Chat';
import Issue from '../pages/Issue';

function AppRoutes() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/faqs" element={<FAQs />} />
                <Route path="/chat" element={<Chat />} />
                <Route path="/issue" element={<Issue />} />
            </Routes>
        </>
    );
}

export default AppRoutes;
