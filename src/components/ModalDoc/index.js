import { Modal } from 'react-bootstrap';
import PDFComp from '../../PDF/PDFComp';
import { useRef } from 'react';
import { Form, Button } from 'react-bootstrap';

function ModalDoc(props) {
    const {showModal, setShowModal, pageNumber, setPageNumber} = props
    const textContainerRef = useRef(); // Tham chiếu container để cuộn

    // Xử lý đóng modal
    const closeModal = () => {
        setShowModal(false);
    };
    // Xử lý cuộn đến phần tương ứng
    const handleSearch = (e) => {
        e.preventDefault();
        if (pageNumber) {
            const sectionId = `section-${pageNumber}`;
            const section = textContainerRef.current?.querySelector(`#${sectionId}`);
            if (section) {
                section.scrollIntoView({ behavior: 'smooth' });
            } else {
                alert('Không tìm thấy phần này!');
            }
        }
    };
    return (
        <Modal
            show={showModal}
            onHide={closeModal}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            animation={true}
        >
            <Modal.Header closeButton>
                <Modal.Title>Tìm kiếm và Cuộn</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {/* Form nhập số trang */}
                <Form onSubmit={handleSearch}>
                    <Form.Group className="mb-3">
                        <Form.Label>Nhập số trang</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Ví dụ: 1"
                            value={pageNumber}
                            onChange={(e) => setPageNumber(e.target.value)}
                        />
                    </Form.Group>
                    <Button type="submit" variant="success">
                        Tìm kiếm
                    </Button>
                </Form>

                {/* Nội dung cuộn */}
                <div
                    ref={textContainerRef}
                    style={{
                        maxHeight: '400px',
                        overflowY: 'auto',
                        marginTop: '20px',
                        border: '1px solid #ddd',
                        padding: '10px',
                        borderRadius: '8px',
                    }}
                >
                    <PDFComp />
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={closeModal}>
                    Đóng
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ModalDoc;
