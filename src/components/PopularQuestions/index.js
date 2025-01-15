import { Offcanvas, Card, ListGroup } from 'react-bootstrap';
import { HumanMessage } from '@langchain/core/messages';
import './PopularQuestion.scss';
import avatar from '../../assets/images/logo-removebg-preview.png';

const questions = [
    'Bao nhiêu điểm được sinh viên giỏi, khá, xuất sắc, trung bình',
    'Mấy điểm qua môn',
    'Tôi được nghỉ bao nhiêu buổi',
];

function PopularQuestions(props) {
    const {
        showQuestions,
        setShowQuestions,
        loading,
        fetchMessage,
        setMessages,
        messages,
        setInputMessage,
        setLoading,
    } = props;

    const handleCloseQuestions = () => setShowQuestions(false);
    const handleQuestions = (index) => {
        setShowQuestions(false);
        const newMessage = {
            id: Date.now(),
            text: questions[index],
            sender: 'user', // Gửi tin nhắn từ người dùng
            avatar: avatar,
        };

        setMessages([...messages, newMessage]);
        setInputMessage('');
        setLoading(true);
        const message = new HumanMessage(questions[index]);
        // phản hồi của chatbot
        fetchMessage(message);
    };

    return (
        <Offcanvas show={showQuestions} onHide={handleCloseQuestions} responsive="lg" placement="end" name="end">
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Những câu hỏi phổ biến</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <Card className="shadow-sm card-wrapper">
                    <Card.Header className="fw-bold text-color">Những câu hỏi phổ biến</Card.Header>
                    <ListGroup variant="flush" className="p-3">
                        {questions.map((questions, index) => (
                            <ListGroup.Item
                                disabled={loading}
                                onClick={() => handleQuestions(index)}
                                key={index}
                                className="question-item mb-2 chat-card-item"
                            >
                                <span className="me-2">💬</span> {questions}
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </Card>
            </Offcanvas.Body>
        </Offcanvas>
    );
}

export default PopularQuestions;
