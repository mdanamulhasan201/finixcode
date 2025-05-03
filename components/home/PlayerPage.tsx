import { useState } from 'react';
import { BannerData, PlayerItem } from '../../types';
import { FaUsers } from 'react-icons/fa';
import MessageModal from '../shared/MessageModal';

interface PlayerPageProps {
    currentEvent: BannerData;
}

export default function PlayerPage({ currentEvent }: PlayerPageProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedPlayer, setSelectedPlayer] = useState<PlayerItem | null>(null);

    const handleMessageClick = (player: PlayerItem) => {
        setSelectedPlayer(player);
        setIsModalOpen(true);
    };

    const handleSendMessage = (message: string) => {
        console.log('Sending message to:', selectedPlayer?.name, 'Message:', message);
        setIsModalOpen(false);
    };

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold">Players</h3>
                <div className='flex items-center gap-2'>
                    <FaUsers />
                    <span className="text-sm font-medium">5/11</span>
                </div>
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

            <MessageModal 
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSend={handleSendMessage}
                recipientName={selectedPlayer?.name || ''}
            />
        </div>
    );
}