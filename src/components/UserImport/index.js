import { Button } from 'antd';
import { useState } from 'react';
import { Offcanvas, Card, ListGroup } from 'react-bootstrap';
import { Upload, message, Checkbox } from 'antd';
import { UploadOutlined, FilePdfOutlined } from '@ant-design/icons';

const UserImport = (props) => {
    const { showHistory, setShowHistory } = props;
    const handleCloseHistory = () => setShowHistory(false);

    const [fileList, setFileList] = useState([]);
    const [selectedFiles, setSelectedFiles] = useState([]);

    const handleUpload = ({ file, fileList: newFileList }) => {
        if (file.type !== 'application/pdf') {
            message.error(`${file.name} is not a PDF file.`);
            return;
        }

        setFileList(newFileList);
    };

    const handleRemove = (file) => {
        setFileList((prevList) => prevList.filter((item) => item.uid !== file.uid));
        setSelectedFiles((prevSelected) => prevSelected.filter((uid) => uid !== file.uid));
    };

    const handleSelect = (fileUid, checked) => {
        setSelectedFiles((prevSelected) => {
            if (checked) {
                return [...prevSelected, fileUid];
            }
            return prevSelected.filter((uid) => uid !== fileUid);
        });
    };
    const handleConfirm = () => {
        console.log('check selected files: ', selectedFiles);
        console.log('check file upload', fileList);
    };
    // const handleDownload = (file) => {
    //     const url = URL.createObjectURL(file.originFileObj);
    //     const link = document.createElement('a');
    //     link.href = url;
    //     link.download = file.name;
    //     document.body.appendChild(link);
    //     link.click();
    //     document.body.removeChild(link);
    //     URL.revokeObjectURL(url);
    // };
    return (
        <div>
            <Offcanvas show={showHistory} onHide={handleCloseHistory} responsive="lg">
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Nguồn</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <Card className="shadow-sm card-wrapper">
                        <Card.Header className="fw-bold ">Nguồn</Card.Header>
                        <ListGroup variant="flush" className="p-3">
                            <div style={{ maxWidth: 250, margin: '0 auto' }}>
                                <Upload
                                    accept=".pdf"
                                    fileList={fileList}
                                    beforeUpload={() => false} // Prevent auto upload
                                    onChange={handleUpload}
                                    onRemove={handleRemove}
                                >
                                    <Button icon={<UploadOutlined />}>Tải file pdf</Button>
                                </Upload>

                                {fileList.length > 0 && (
                                    <div style={{ marginTop: 20 }}>
                                        <p>File đã tải lên</p>
                                        <div
                                            style={{
                                                display: 'grid',
                                                gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
                                                gap: '16px',
                                            }}
                                        >
                                            {fileList.map((file) => (
                                                <div
                                                    key={file.uid}
                                                    style={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: '10px',
                                                        borderBottom: '1px solid #f5f5f5',
                                                        paddingBottom: '20px',
                                                    }}
                                                >
                                                    <Checkbox
                                                        checked={selectedFiles.includes(file.uid)}
                                                        onChange={(e) => handleSelect(file.uid, e.target.checked)}
                                                    />
                                                    <FilePdfOutlined style={{ fontSize: '24px', color: '#ff4d4f' }} />
                                                    <span
                                                        style={{
                                                            wordBreak: 'break-word',
                                                            maxWidth: '200px',
                                                            overflow: 'hidden',
                                                            textOverflow: 'ellipsis',
                                                            whiteSpace: 'nowrap',
                                                        }}
                                                    >
                                                        {file.name}
                                                    </span>
                                                    {/* <Button
                                                        type="link"
                                                        icon={<DownloadOutlined />}
                                                        onClick={() => handleDownload(file)}
                                                    >
                                                        Download
                                                    </Button> */}
                                                </div>
                                            ))}
                                            <Button onClick={handleConfirm}>Xác nhận</Button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </ListGroup>
                    </Card>
                </Offcanvas.Body>
            </Offcanvas>
        </div>
    );
};
export default UserImport;
