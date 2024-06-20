import React, { useEffect, useRef } from 'react';
import { getDocument, GlobalWorkerOptions } from 'pdfjs-dist';
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.entry';

GlobalWorkerOptions.workerSrc = pdfjsWorker;

const PDFThumbnail = ({ base64String }) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const renderPDF = async () => {
            try {
                if (!base64String || typeof base64String !== 'string') {
                    throw new Error('Invalid base64 string');
                }

                const binaryString = window.atob(base64String);
                const len = binaryString.length;
                const bytes = new Uint8Array(len);
                for (let i = 0; i < len; i++) {
                    bytes[i] = binaryString.charCodeAt(i);
                }

                const pdfData = bytes.buffer;

                const loadingTask = getDocument({ data: pdfData });
                const pdf = await loadingTask.promise;

                const page = await pdf.getPage(1);
                const scale = 1;
                const viewport = page.getViewport({ scale });

                const canvas = canvasRef.current;
                const context = canvas.getContext('2d');
                canvas.height = viewport.height;
                canvas.width = viewport.width;

                const renderContext = {
                    canvasContext: context,
                    viewport: viewport,
                };
                await page.render(renderContext).promise;
            } catch (error) {
                console.error('Error rendering PDF:', error);
            }
        };

        renderPDF();
    }, [base64String]);

    return <canvas ref={canvasRef} />;
};

export default PDFThumbnail;
