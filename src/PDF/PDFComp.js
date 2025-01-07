import { useState } from 'react';
import { Document, Page } from 'react-pdf';
import result from './result.pdf';

function PDFComp() {
    const [numPages, setNumPages] = useState();
    const [pageNumber, setPageNumber] = useState(1);

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
    }

    return (
        <div className="pdf-div" style={{ padding: '50px', backgroundColor: '#dedede', marginTop: '50px' }}>
            <Document file={result} onLoadSuccess={onDocumentLoadSuccess}>
                {/* <div style={{ textAlign: 'center' }}>
                    <Page pageNumber={1} renderAnnotationLayer={false} />
                </div> */}
                {Array.apply(null, Array(numPages))
                    .map((x, i) => i + 1)
                    .map((page) => {
                        return (
                            <div style={{ textAlign: 'center' }}>
                                <p>
                                    Page {page} of {numPages}
                                </p>
                                <Page
                                    key={page}
                                    pageNumber={page}
                                    renderTextLayer={false}
                                    renderAnnotationLayer={false}
                                />
                            </div>
                        );
                    })}
            </Document>
        </div>
    );
}
export default PDFComp;
