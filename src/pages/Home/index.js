/* eslint-disable jsx-a11y/img-redundant-alt */
import { Container, Row } from 'react-bootstrap';
import LogoRemoveBg from '../../assets/images/logo-removebg-preview.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import './Home.scss';
import { Link } from 'react-router-dom';
function Home() {
    return (
        <>
            <div className="wrapper mt-102">
                <Container className=" d-flex align-items-center justify-content-around">
                    <Row className="slider-wrapper">
                        <div className="col d-flex flex-column justify-content-center align-items-center box-left flex-wrap order-lg-1 order-2">
                            <h1 className="text-center fw-bold text">Xin chào! Mình là</h1>
                            <h1 className="text-center fw-bold text">Chatbot</h1>
                            <h3 className="desc ">
                                Giúp bạn giải đáp thắc mắc, tra cứu thông tin một cách chính xác nhất
                            </h3>
                            <Link to={'/chat'}>
                                <button className="mt-3 get-start text-white mb-2">
                                    Bắt đầu ngay
                                    <FontAwesomeIcon icon={faPlay} className="btn-icon"></FontAwesomeIcon>
                                </button>
                            </Link>
                        </div>
                        <div className="col d-flex justify-content-center align-items-center order-lg-2 order-1 slider">
                            <img src={LogoRemoveBg} alt="Image" className="slider-image img-fuild effect effect-2" />
                        </div>
                    </Row>
                </Container>
            </div>
            <Container>
                <div className="container py-5">
                    <h2 className="text-center mb-5">Nâng cấp kế hoạch của bạn</h2>

                    <div className="row">
                        {/* Basic Plan */}
                        <div className="col-lg-4 col-md-6 mb-4">
                            <div className="card h-100 text-center shadow">
                                <div className="card-header bg-primary text-white">
                                    <h3>Cơ bản</h3>
                                </div>
                                <div className="card-body">
                                    <h4 className="card-title">$0.00 / month</h4>
                                    <p className="card-text">
                                        Khám phá sự hỗ trợ của AI trong các công việc hằng ngày của bạn
                                    </p>
                                    <ul className="list-group list-group-flush">
                                        <li className="list-group-item">Truy cập vào chatbot</li>
                                        <li className="list-group-item">Sử dụng các tính năng cơ bản của chatbot</li>
                                        <li className="list-group-item">Không giới hạn số lần hỏi</li>
                                    </ul>
                                </div>
                                <div className="card-footer">
                                    <button className="btn btn-primary w-100">Đăng ký</button>
                                </div>
                            </div>
                        </div>

                        {/* Standard Plan */}
                        <div className="col-lg-4 col-md-6 mb-4">
                            <div className="card h-100 text-center shadow">
                                <div className="card-header bg-success text-white">
                                    <h3>Standard</h3>
                                </div>
                                <div className="card-body">
                                    <h4 className="card-title">$0.00 / month</h4>
                                    <p className="card-text">
                                        Nâng cao năng suất và tính sáng tạo với quyền truy cập mở rộng
                                    </p>
                                    <ul className="list-group list-group-flush">
                                        <li className="list-group-item">Truy cập vào chatbot</li>
                                        <li className="list-group-item">Sử dụng các tính năng cơ bản của chatbot</li>
                                        <li className="list-group-item">Không giới hạn số lần hỏi</li>
                                    </ul>
                                </div>
                                <div className="card-footer">
                                    <button className="btn btn-success w-100">Đăng ký</button>
                                </div>
                            </div>
                        </div>

                        {/* Premium Plan */}
                        <div className="col-lg-4 col-md-6 mb-4">
                            <div className="card h-100 text-center shadow">
                                <div className="card-header bg-danger text-white">
                                    <h3>Premium</h3>
                                </div>
                                <div className="card-body">
                                    <h4 className="card-title">$0.00 / month</h4>
                                    <p className="card-text">Khai thác tối đa Chatbot với cấp độ truy cập cao nhất</p>
                                    <ul className="list-group list-group-flush">
                                        <li className="list-group-item">Truy cập vào chatbot</li>
                                        <li className="list-group-item">Sử dụng các tính năng cơ bản của chatbot</li>
                                        <li className="list-group-item">Không giới hạn số lần hỏi</li>
                                    </ul>
                                </div>
                                <div className="card-footer">
                                    <button className="btn btn-danger w-100">Đăng ký</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </>
    );
}

export default Home;
