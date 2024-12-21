import { Accordion } from 'react-bootstrap';
import './Faqs.scss';
function FAQs() {
    return (
        <div className="faqs-wrapper mt-102">
            <div className="container py-5">
                <h2 className="text-center mb-5 faqs-title">Câu hỏi thường gặp</h2>

                <Accordion defaultActiveKey="0">
                    {/* Câu hỏi 1 */}
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>Chatbot là gì?</Accordion.Header>
                        <Accordion.Body>
                            Chatbot là một phần mềm AI giả lập các cuộc hội thoại giống người với người dùng thông qua
                            giao diện chat. Nó giúp các doanh nghiệp cải thiện dịch vụ khách hàng và tự động hóa các tác
                            vụ lặp lại.
                        </Accordion.Body>
                    </Accordion.Item>

                    {/* Câu hỏi 2 */}
                    <Accordion.Item eventKey="1">
                        <Accordion.Header>Lợi ích của việc sử dụng chatbot là gì?</Accordion.Header>
                        <Accordion.Body>
                            Chatbot mang lại nhiều lợi ích như khả năng hoạt động 24/7, tiết kiệm chi phí, tự động hóa
                            các tác vụ lặp lại, tăng sự hài lòng của khách hàng và có thể xử lý nhiều người dùng cùng
                            lúc.
                        </Accordion.Body>
                    </Accordion.Item>

                    {/* Câu hỏi 3 */}
                    <Accordion.Item eventKey="2">
                        <Accordion.Header>Chatbot có thể hiểu được nhiều ngôn ngữ không?</Accordion.Header>
                        <Accordion.Body>Không, hiện tại chatbot chỉ có thể hiểu ngôn ngữ tiếng Việt</Accordion.Body>
                    </Accordion.Item>

                    {/* Câu hỏi 4 */}
                    <Accordion.Item eventKey="3">
                        <Accordion.Header>Thông tin từ chatbot có đáng tin cậy hay không?</Accordion.Header>
                        <Accordion.Body>
                            Vì là một mô hình xác xuất nên thông tin chatbot đưa ra có thể không chính xác ở một số
                            trường hợp, bạn nên kiểm chứng thông tin hoặc liên hệ hỗ trợ nếu cần thiết nhé
                        </Accordion.Body>
                    </Accordion.Item>

                    {/* Câu hỏi 5 */}
                    <Accordion.Item eventKey="4">
                        <Accordion.Header>Có thể tùy chỉnh giao diện của chatbot không?</Accordion.Header>
                        <Accordion.Body>
                            Hiện tại thì không tùy chỉnh được giao diện của chatbot, nhưng tương lai chúng tôi sẽ cố
                            gắng cải thiện các chức năng để trải nghiệm người dùng được tốt nhất
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            </div>
        </div>
    );
}

export default FAQs;
