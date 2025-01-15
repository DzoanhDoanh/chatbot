import { Typewriter } from 'react-simple-typewriter';
import avatar from '../../assets/images/logo-removebg-preview.png';
import Spinner from 'react-bootstrap/Spinner';
import './MessageBox.scss';

function MessageBox(props) {
    const { messages, openModal, setPageNumber, loading, messagesEndRef } = props;

    return (
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
                            <Typewriter
                                words={[message.text]}
                                loop={1} // Lặp lại 1 lần
                                typeSpeed={0}
                                deleteSpeed={0} // Không xóa chữ
                            />
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
                                        <div className="d-flex flex-wrap">
                                            {message.refer_values.map((item, index) => (
                                                <p
                                                    key={index}
                                                    className="btn-sm my-1 me-1"
                                                    style={{ cursor: 'pointer' }}
                                                    rel="noopener noreferrer"
                                                    onClick={() => {
                                                        setPageNumber(item.page_number);
                                                        openModal();
                                                    }}
                                                >
                                                    <p className="link-reference">
                                                        {item.source.split('. ')[0]} (trang: {item.page_number})
                                                    </p>
                                                </p>
                                            ))}
                                        </div>
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
    );
}

export default MessageBox;
