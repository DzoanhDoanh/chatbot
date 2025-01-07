import { Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import FAQs from '../pages/FAQs';
import Chat from '../pages/Chat';
import Issue from '../pages/Issue';
import DocumentViewer from '../components/Document';

function AppRoutes() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/faqs" element={<FAQs />} />
                <Route path="/chat" element={<Chat />} />
                <Route path="/issue" element={<Issue />} />
                <Route path="/doc" element={<DocumentViewer />} />
            </Routes>
        </>
    );
}

export default AppRoutes;
