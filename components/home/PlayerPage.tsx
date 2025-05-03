
import { useState } from 'react';
import { BannerData, PlayerItem } from '@/types';

interface PlayerPageProps {
    currentEvent: BannerData;
}

export default function PlayerPage({ currentEvent }: PlayerPageProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedPlayer, setSelectedPlayer] = useState<PlayerItem | null>(null);
    const [message, setMessage] = useState('');

    const handleMessageClick = (player: PlayerItem) => {
        setSelectedPlayer(player);
        setIsModalOpen(true);
    };

    const handleSendMessage = () => {
        // Here you can implement the logic to send the message
        console.log('Sending message to:', selectedPlayer?.name, 'Message:', message);
        setMessage('');
        setIsModalOpen(false);
    };

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold">Players</h3>
                <span className="text-sm font-medium">5/11</span>
            </div>
            <div className="space-y-5">
                {currentEvent?.Player?.map((player) => (
                    <div key={player.id} className="bg-teal-700 rounded-lg p-4 flex justify-between items-center">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center text-white font-medium">
                                {player.name.substring(0, 2)}
                            </div>
                            <span className="text-[#FDE8CD] font-medium">
                                {player.name} {player.id === 1 && <span className="text-xs text-amber-300">(Host)</span>}
                            </span>
                        </div>
                        <button 
                            onClick={() => handleMessageClick(player)}
                            className="bg-white text-[#171717] px-[14px] py-[10px]  text-sm font-medium rounded-[12px]"
                        >
                            Message
                        </button>
                    </div>
                ))}
            </div>

            {/* Message Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/40 bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg w-96">
                        <h3 className="text-lg font-semibold mb-4">
                            Send message to {selectedPlayer?.name}
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
                                onClick={() => setIsModalOpen(false)}
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
            )}
        </div>
    );
}