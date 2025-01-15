import { Offcanvas, Card, ListGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClockRotateLeft } from '@fortawesome/free-solid-svg-icons';
function ChatHistory(props) {
    const { showHistory, setShowHistory, loading } = props;
    const handleCloseHistory = () => setShowHistory(false);

    return (
        <>
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
        </>
    );
}

export default ChatHistory;
