import React from 'react';
import { Document, Page } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import { pdfjs } from 'react-pdf';
import PDFComp from '../../PDF/PDFComp';

pdfjs.GlobalWorkerOptions.workerSrc = new URL('pdfjs-dist/build/pdf.worker.min.mjs', import.meta.url).toString();

function DocumentViewer() {
    return (
        <div
            style={{
                marginTop: '80px',
                display: 'flex',
                justifyContent: 'center',
                background: 'linear-gradient(145deg, #ff5f6d, #ffc371)',
            }}
        >
            <PDFComp />
        </div>
    );
}

export default DocumentViewer;
