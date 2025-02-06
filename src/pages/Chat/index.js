import React, { useState, useEffect, useRef } from 'react';
import { Form, Button } from 'react-bootstrap';
import './Chat.scss';
import avatar from '../../assets/images/logo-removebg-preview.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDoubleLeft, faAngleDoubleRight, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { HumanMessage } from '@langchain/core/messages';
import { useSpeechRecognition } from 'react-speech-recognition';
import { fetchMessage } from '../../services/chatService';
import PopularQuestions from '../../components/PopularQuestions';
import RecordBtn from '../../components/RecordBtn';
import ModalDoc from '../../components/ModalDoc';
import MessageBox from '../../components/MessageBox';
import UserImport from '../../components/UserImport';

function Chat() {
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
    const [showModal, setShowModal] = useState(false); // Quản lý trạng thái hiển thị modal
    const [pageNumber, setPageNumber] = useState(''); // Quản lý số trang nhập

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const res = async (message) => {
        const res1 = await fetchMessage(message.content, '123456');
        if (res1.response) {
            const botMessage = {
                id: Date.now() + 1,
                text: res1.response,
                sender: 'bot',
                avatar: avatar,
                isRefer: !!res1.metadata,
                refer_values: res1.metadata,
            };
            setMessages((prevMessages) => [...prevMessages, botMessage]);
            setLoading(false);
        } else {
            const botMessage = {
                id: Date.now() + 1,
                text: 'Hệ thống đang xảy ra vấn đề',
                sender: 'bot',
                avatar: avatar,
                isRefer: true,
                refer_values: [
                    {
                        source: 'Điều 10',
                        page_number: 10,
                    },
                ],
            };
            setMessages((prevMessages) => [...prevMessages, botMessage]);
            setLoading(false);
        }
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
        // phản hồi của chatbot
        res(message);
    };
    const handleShowHistory = () => setShowHistory(true);
    const handleShowQuestions = () => setShowQuestions(true);

    const { listening } = useSpeechRecognition();

    // Xử lý mở modal
    const openModal = () => {
        setShowModal(true);
    };

    //this is checkpoint
    return (
        <div className="chat-wrapper d-flex justify-content-between mt-102">
            <Container className="d-flex">
                <div className="my-5">
                    {/* <ChatHistory showHistory={showHistory} setShowHistory={setShowHistory} loading={loading} /> */}
                    <UserImport showHistory={showHistory} setShowHistory={setShowHistory} loading={loading} />
                    {/* <FileImportComponent /> */}
                </div>
                <div className="pt-5 mx-3" style={{ width: '100%' }}>
                    <div className="d-flex justify-content-between">
                        <Button variant="text" className="d-lg-none text-white" onClick={handleShowHistory}>
                            <FontAwesomeIcon icon={faAngleDoubleLeft}></FontAwesomeIcon>
                            Mở file đã thêm
                        </Button>
                        <Button variant="text" className="d-lg-none text-white" onClick={handleShowQuestions}>
                            Mở câu hỏi mẫu
                            <FontAwesomeIcon icon={faAngleDoubleRight}></FontAwesomeIcon>
                        </Button>
                    </div>
                    <MessageBox
                        messages={messages}
                        openModal={openModal}
                        setPageNumber={setPageNumber}
                        loading={loading}
                        messagesEndRef={messagesEndRef}
                    />

                    <Form onSubmit={handleSendMessage}>
                        <Form.Group controlId="chatInput" className="chatbox-wrapper d-flex">
                            <Form.Control
                                as={'textarea'}
                                type="text"
                                placeholder={listening ? 'Đang lắng nghe...' : 'Nhập tin nhắn...'}
                                value={inputMessage}
                                className="chatbox-input py-2"
                                onChange={(e) => setInputMessage(e.target.value)}
                            />
                            <div className="d-flex " style={{ maxHeight: '45px' }}>
                                <RecordBtn setInputMessage={setInputMessage} loading={loading} />
                                <Button
                                    disabled={loading}
                                    variant="primary"
                                    type="submit"
                                    className="chatbox-btn-submit"
                                >
                                    <FontAwesomeIcon icon={faPaperPlane} />
                                </Button>
                            </div>
                        </Form.Group>
                    </Form>
                </div>
                <div className="my-5">
                    <PopularQuestions
                        showQuestions={showQuestions}
                        setShowQuestions={setShowQuestions}
                        loading={loading}
                        fetchMessage={res}
                        messages={messages}
                        setMessages={setMessages}
                        setInputMessage={setInputMessage}
                        setLoading={setLoading}
                    />
                </div>
            </Container>
            <div style={{ padding: '20px' }}>
                {/* Modal */}
                <ModalDoc
                    showModal={showModal}
                    setShowModal={setShowModal}
                    pageNumber={pageNumber}
                    setPageNumber={setPageNumber}
                />
            </div>
        </div>
    );
}

export default Chat;
