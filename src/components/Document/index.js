import React, { useState, useEffect } from 'react';

const DocumentViewer = () => {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const controller = new AbortController();

        const fetchStreamData = async () => {
            setLoading(true);

            try {
                const response = await fetch('https://2596-14-0-17-119.ngrok-free.app/query', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ query: 'Hello', session_id: '123456' }),
                    signal: controller.signal, // Gắn signal để hủy request
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const reader = response.body.getReader();
                const decoder = new TextDecoder('utf-8');
                let done = false;

                while (!done) {
                    const { value, done: streamDone } = await reader.read();
                    done = streamDone;

                    if (value) {
                        const chunk = decoder.decode(value, { stream: true });
                        console.log(chunk);
                        setMessages((prev) => [...prev, chunk]);
                    }
                }
            } catch (error) {
                if (error.name === 'AbortError') {
                    console.log('Fetch aborted');
                } else {
                    console.error('Error fetching stream data:', error);
                }
            } finally {
                setLoading(false);
            }
        };
        fetchStreamData();

        return () => {
            controller.abort(); // Hủy request khi component unmount
        };
    }, []);

    return (
        <div>
            <h1>Streaming Data</h1>
            <div style={{ maxHeight: '300px', overflowY: 'auto', border: '1px solid #ccc', padding: '10px' }}>
                {messages.map((msg, index) => (
                    <p key={index}>{msg}</p>
                ))}
            </div>
            {loading && <p>Loading...</p>}
        </div>
    );
};

export default DocumentViewer;
