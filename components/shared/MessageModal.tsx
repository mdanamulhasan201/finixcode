import { useState } from 'react';

interface MessageModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSend: (message: string) => void;
    recipientName: string;
}

export default function MessageModal({ isOpen, onClose, onSend, recipientName }: MessageModalProps) {
    const [message, setMessage] = useState('');

    const handleSendMessage = () => {
        onSend(message);
        setMessage('');
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/40 bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg w-96">
                <h3 className="text-lg font-semibold mb-4">
                    Send message to {recipientName}
                </h3>
                <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg p-2 mb-4"
                    rows={4}
                    placeholder="Type your message..."
                />
                <div className="flex justify-end gap-2">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSendMessage}
                        className="px-4 py-2 bg-teal-700 text-white rounded-lg hover:bg-teal-800"
                    >
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
} 