import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophone } from '@fortawesome/free-solid-svg-icons';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

function RecordBtn(props) {
    const { setInputMessage, loading } = props;
    const { transcript, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition();

    if (!browserSupportsSpeechRecognition) {
        return <p>Trình duyệt của bạn không hỗ trợ nhận diện giọng nói.</p>;
    }

    const handleStartListening = () => {
        resetTranscript();
        SpeechRecognition.startListening({ continuous: true, language: 'vi-VN' });
    };

    const handleStopListening = () => {
        SpeechRecognition.stopListening();
        setInputMessage(transcript);
    };

    return (
        <>
            <Button
                disabled={loading}
                onMouseDown={handleStartListening}
                onMouseUp={handleStopListening}
                onTouchStart={handleStartListening} // Hỗ trợ cảm ứng
                onTouchEnd={handleStopListening} // Hỗ trợ cảm ứng
                className="record-btn"
            >
                <FontAwesomeIcon icon={faMicrophone} />
            </Button>
        </>
    );
}

export default RecordBtn;
