import { Form, Button, Alert } from 'react-bootstrap';
import React, { useState } from 'react';
import './Issue.scss';
function Issue() {
    const [feedback, setFeedback] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
    const [showErrorAlert, setShowErrorAlert] = useState(false);

    const handleFeedbackSubmit = (e) => {
        e.preventDefault();
        if (feedback.trim() === '') {
            setShowErrorAlert(true);
            setErrorMessage('Vui lòng nhập nội dung góp ý trước khi gửi.');
            return;
        }

        // Gửi góp ý đến server hoặc API ở đây
        console.log('Feedback submitted:', feedback);

        setShowSuccessAlert(true);
        setFeedback('');
        setShowErrorAlert(false);
    };

    const handleErrorSubmit = (e) => {
        e.preventDefault();
        if (errorMessage.trim() === '') {
            setShowErrorAlert(true);
            setErrorMessage('Vui lòng mô tả lỗi trước khi gửi.');
            return;
        }

        // Gửi báo lỗi đến server hoặc API ở đây
        console.log('Error reported:', errorMessage);

        setShowSuccessAlert(true);
        setErrorMessage('');
        setShowErrorAlert(false);
    };
    return (
        <div className="issue-wrapper mt-102">
            <div className="container pt-5 ">
                <h2 className="mb-4 issue-title text-center">Góp ý và Báo lỗi</h2>

                {showSuccessAlert && (
                    <Alert variant="success" onClose={() => setShowSuccessAlert(false)} dismissible>
                        Cảm ơn bạn đã gửi góp ý hoặc báo lỗi!
                    </Alert>
                )}

                {showErrorAlert && (
                    <Alert variant="danger" onClose={() => setShowErrorAlert(false)} dismissible>
                        {errorMessage}
                    </Alert>
                )}

                <Form onSubmit={handleFeedbackSubmit} className="mb-4">
                    <Form.Group controlId="feedbackForm.ControlTextarea1">
                        <Form.Label className="title-color ">Góp ý</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            value={feedback}
                            onChange={(e) => setFeedback(e.target.value)}
                            placeholder="Nhập nội dung góp ý của bạn tại đây..."
                        />
                    </Form.Group>
                    <div className="d-flex justify-content-end">
                        <Button variant="primary" type="submit" className="mt-3 isseu-feedback-btn">
                            Gửi Góp ý
                        </Button>
                    </div>
                </Form>

                <Form onSubmit={handleErrorSubmit}>
                    <Form.Group controlId="errorForm.ControlTextarea2">
                        <Form.Label className="title-color ">Báo lỗi</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            value={errorMessage}
                            onChange={(e) => setErrorMessage(e.target.value)}
                            placeholder="Nhập thông tin về lỗi cần báo cáo tại đây..."
                        />
                    </Form.Group>
                    <div className="d-flex justify-content-end">
                        <Button variant="danger" type="submit" className="mt-3">
                            Báo lỗi
                        </Button>
                    </div>
                </Form>
            </div>
        </div>
    );
}

export default Issue;
