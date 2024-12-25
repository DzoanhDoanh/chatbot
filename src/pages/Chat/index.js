import React, { useState, useEffect, useRef } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Typewriter } from 'react-simple-typewriter';
import './Chat.scss';
import avatar from '../../assets/images/logo-removebg-preview.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faAngleDoubleLeft,
    faAngleDoubleRight,
    faMicrophone,
    faPaperPlane,
} from '@fortawesome/free-solid-svg-icons';
import Spinner from 'react-bootstrap/Spinner';
import { Container, ListGroup, Card, Offcanvas } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { faClockRotateLeft } from '@fortawesome/free-solid-svg-icons/faClockRotateLeft';
import { ChatXAI } from '@langchain/xai';
import { HumanMessage } from '@langchain/core/messages';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

function Chat() {
    const model = new ChatXAI({
        apiKey: process.env.REACT_APP_API_KEY, // Default value.
    });

    const [messages, setMessages] = useState([
        {
            id: Date.now(),
            text: 'Xin chào, tôi có thể giúp gì được cho bạn?',
            sender: 'bot',
            avatar: avatar,
        },
    ]);
    const [inputMessage, setInputMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef(null);
    const [showHistory, setShowHistory] = useState(false);
    const [showQuestions, setShowQuestions] = useState(false);

    const questions = [
        'Em đăng ký rồi bây giờ em muốn bổ sung thêm phương thức và thêm nguyện vọng được không?',
        'Em có thể đăng ký nhiều phương thức xét tuyển cùng lúc không?',
        'Bao giờ có kết quả xét tuyển sớm ạ?',
        'Em có chứng chỉ Tiếng Anh (IELTS 6.5) có thể quy đổi thành điểm Tiếng Anh để đăng ký xét tuyển không ạ?',
    ];

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const res = async (message) => {
        const res1 = await model.invoke([message]);
        console.log(res1);
        const botMessage = {
            id: Date.now() + 1,
            text: res1.content,
            sender: 'bot',
            avatar: avatar,
        };
        console.log(res1);
        setMessages((prevMessages) => [...prevMessages, botMessage]);
        setLoading(false);
    };

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (inputMessage.trim() === '') return;

        const newMessage = {
            id: Date.now(),
            text: inputMessage,
            sender: 'user', // Gửi tin nhắn từ người dùng
            avatar: avatar,
        };

        setMessages([...messages, newMessage]);
        setInputMessage('');
        setLoading(true);
        const message = new HumanMessage(inputMessage);

        // Giả lập phản hồi từ chatbot
        res(message);
    };
    const handleCloseHistory = () => setShowHistory(false);
    const handleCloseQuestions = () => setShowQuestions(false);
    const handleShowHistory = () => setShowHistory(true);
    const handleShowQuestions = () => setShowQuestions(true);
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

        const answers = [
            'Thí sinh nên đọc kỹ hướng dẫn và chuẩn bị dữ liệu cũng như các nguyện vọng cần đăng ký, phần mềm xét tuyển được thiết kế khi thí sinh đăng ký xong nguyện vọng hệ thống sẽ tự động khóa nên thí sinh không tự sửa được dữ liệu. Trong trường hợp thí sinh muốn thay đổi dữ liệu đăng ký cần liên lạc với Nhà trường theo số điện thoại 0834560255 hoặc trên messenger của panpage https://facebook.com/tuyensinh.haui',
            'Nếu em có đủ điều kiện xét tuyển nhiều phương thức, em có thể dùng nhiều phương thức để xét tuyển cho các ngành/chương trình đào tạo em thích. Thứ tự NV cao nhất là NV1',
            'Thời gian công bố kết quả xét tuyển: Trước 17h00 ngày 23/6/2024.',
            'Không quy đổi điểm chứng chỉ Tiếng Anh để tính cho các môn Tiếng Anh trong học bạ THPT và kết quả thi Tiếng Anh của kỳ thi tốt nghiệp THPT em nhé. Nếu em có điểm IELTS 6.5 em có thể đăng ký xét tuyển sớm theo phương thức 2',
        ];
        // Giả lập phản hồi từ chatbot
        setTimeout(() => {
            const botMessage = {
                id: Date.now() + 1,
                text: answers[index],
                sender: 'bot',
                avatar: avatar,
                isRefer: true,
                refer_values: [
                    {
                        title: 'Haui',
                        url: 'https://tuyensinh.haui.edu.vn/hoi-dap/giai-dap-mot-so-cac-thac-mac-khi-dang-ky-xet-tuyen-som-dai-hoc-chinh-quy-nam-2024/6633b776fbe6074bc08757eb',
                    },
                ],
            };

            setMessages((prevMessages) => [...prevMessages, botMessage]);
            setLoading(false);
        }, 2000);
    };

    const { transcript, listening, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition();

    if (!browserSupportsSpeechRecognition) {
        return <p>Trình duyệt của bạn không hỗ trợ nhận diện giọng nói.</p>;
    }

    const handleStartListening = () => {
        resetTranscript();
        SpeechRecognition.startListening({ continuous: true, language: 'vi-VN' });
    };

    const handleStopListening = () => {
        SpeechRecognition.stopListening();
        setInputMessage(transcript);
    };
    return (
        <div className="chat-wrapper d-flex justify-content-between mt-102">
            <Container className="d-flex">
                <div className="my-5">
                    <Offcanvas show={showHistory} onHide={handleCloseHistory} responsive="lg">
                        <Offcanvas.Header closeButton>
                            <Offcanvas.Title>Lịch sử chat</Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body>
                            <Card className="shadow-sm card-wrapper">
                                <Card.Header className="fw-bold ">Lịch sử chat</Card.Header>
                                <ListGroup variant="flush" className="p-3">
                                    <ListGroup.Item
                                        disabled={loading}
                                        className="question-item mb-2 chat-card-item"
                                        style={{ borderRadius: '20px' }}
                                    >
                                        <span className="me-2">
                                            <FontAwesomeIcon icon={faClockRotateLeft} /> Điều kiện nhận học bổng?
                                        </span>
                                    </ListGroup.Item>
                                </ListGroup>
                            </Card>
                        </Offcanvas.Body>
                    </Offcanvas>
                </div>
                <div className="pt-5 mx-3" style={{ width: '100%' }}>
                    <div className="d-flex justify-content-between">
                        <Button variant="text" className="d-lg-none text-white" onClick={handleShowHistory}>
                            <FontAwesomeIcon icon={faAngleDoubleLeft}></FontAwesomeIcon>
                            Mở lịch sử chat
                        </Button>
                        <Button variant="text" className="d-lg-none text-white" onClick={handleShowQuestions}>
                            Mở câu hỏi mẫu
                            <FontAwesomeIcon icon={faAngleDoubleRight}></FontAwesomeIcon>
                        </Button>
                    </div>
                    <div
                        className="chat-box border chat-container p-3 mb-3"
                        style={{ height: '400px', overflowY: 'auto', backgroundColor: '#fff', maxWidth: '100%' }}
                    >
                        {messages.map((message) => (
                            <div
                                key={message.id}
                                className={`d-flex mb-3 ${
                                    message.sender === 'user' ? 'justify-content-end' : 'justify-content-start'
                                }`}
                            >
                                {message.sender === 'bot' && (
                                    <img
                                        src={message.avatar}
                                        alt="Bot Avatar"
                                        style={{
                                            width: '40px',
                                            height: '40px',
                                            borderRadius: '50%',
                                            marginRight: '10px',
                                        }}
                                    />
                                )}
                                <div
                                    className={`message p-2 rounded ${
                                        message.sender === 'user' ? 'bg-color text-white' : 'bg-color text-white'
                                    }`}
                                    style={{ maxWidth: '70%' }}
                                >
                                    {message.sender === 'user' ? (
                                        message.text
                                    ) : (
                                        <div>
                                            <Typewriter
                                                words={[message.text]}
                                                loop={1} // Lặp lại 1 lần
                                                typeSpeed={10}
                                                deleteSpeed={0} // Không xóa chữ
                                            />{' '}
                                            <span className="customize-line mb-2"></span>
                                            {message.isRefer ? (
                                                <>
                                                    <span>Tham khảo: </span>
                                                    {message.refer_values.map((item, index) => (
                                                        <a
                                                            key={index}
                                                            href={item.url}
                                                            className="btn-sm link-reference me-1"
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                        >
                                                            {item.title}
                                                        </a>
                                                    ))}
                                                </>
                                            ) : (
                                                ''
                                            )}
                                        </div>
                                    )}
                                </div>
                                {message.sender === 'user' && (
                                    <img
                                        src={message.avatar}
                                        alt="User Avatar"
                                        style={{
                                            width: '40px',
                                            height: '40px',
                                            borderRadius: '50%',
                                            marginLeft: '10px',
                                        }}
                                    />
                                )}
                            </div>
                        ))}
                        {loading && (
                            <div className="d-flex justify-content-start mb-3">
                                <img
                                    src={avatar}
                                    alt="Bot Avatar"
                                    style={{ width: '40px', height: '40px', borderRadius: '50%', marginRight: '10px' }}
                                />
                                <div className="message p-2 rounded bg-color text-white" style={{ maxWidth: '70%' }}>
                                    <Spinner animation="grow" size="sm" />
                                    <Spinner animation="grow" size="sm" className="mx-2" />
                                    <Spinner animation="grow" size="sm" />
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    <Form onSubmit={handleSendMessage}>
                        <Form.Group controlId="chatInput" className="d-flex chatbox-wrapper">
                            <Form.Control
                                type="text"
                                placeholder={listening ? 'Đang lắng nghe...' : 'Nhập tin nhắn...'}
                                value={inputMessage}
                                className="chatbox-input py-2"
                                onChange={(e) => setInputMessage(e.target.value)}
                            />
                            <Button
                                disabled={loading}
                                onMouseDown={handleStartListening}
                                onMouseUp={handleStopListening}
                                onTouchStart={handleStartListening} // Hỗ trợ cảm ứng
                                onTouchEnd={handleStopListening} // Hỗ trợ cảm ứng
                                className="record-btn"
                            >
                                <FontAwesomeIcon icon={faMicrophone} />
                            </Button>
                            <Button disabled={loading} variant="primary" type="submit" className="chatbox-btn-submit">
                                <FontAwesomeIcon icon={faPaperPlane} />
                            </Button>
                        </Form.Group>
                    </Form>
                </div>
                <div className="my-5">
                    <Offcanvas
                        show={showQuestions}
                        onHide={handleCloseQuestions}
                        responsive="lg"
                        placement="end"
                        name="end"
                    >
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
                </div>
            </Container>
        </div>
    );
}

export default Chat;
