import React, { useState } from 'react';
import { Modal, Upload, message } from 'antd';
import { Button, List } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const UploadFile = ({ showModalUpload, setShowModalUpload }) => {
    const [fileList, setFileList] = useState([]);
    const handleUpload = ({ file, fileList: newFileList }) => {
        if (file.type !== 'application/pdf') {
            message.error(`${file.name} is not a PDF file.`);
            return;
        }

        setFileList(newFileList);
    };

    const handleRemove = (file) => {
        setFileList((prevList) => prevList.filter((item) => item.uid !== file.uid));
    };

    return (
        <Modal
            title="Tải file"
            open={showModalUpload}
            onOk={() => setShowModalUpload(false)}
            onCancel={() => setShowModalUpload(false)}
            okText="Tải lên"
            cancelText="Hủy"
        >
            <div style={{ maxWidth: 600, margin: '0 auto', padding: '20px' }}>
                <Upload
                    accept=".pdf"
                    fileList={fileList}
                    beforeUpload={() => false} // Prevent auto upload
                    onChange={handleUpload}
                    onRemove={handleRemove}
                >
                    <Button icon={<UploadOutlined />}>Upload PDF</Button>
                </Upload>

                {fileList.length > 0 && (
                    <List
                        style={{ marginTop: 20 }}
                        header={<div>Uploaded PDFs</div>}
                        bordered
                        dataSource={fileList}
                        renderItem={(file) => <List.Item>{file.name}</List.Item>}
                    />
                )}
            </div>
        </Modal>
    );
};

export default UploadFile;
