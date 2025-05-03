import Image from 'next/image';
import { FaTrophy, FaCalendarAlt, FaStar } from 'react-icons/fa';
import { MdClose } from 'react-icons/md';

interface ProfileModalProps {
    isOpen: boolean;
    onClose: () => void;
    hostData: {
        name: string;
        image: string;
        "activities hosted": string;
        "host rating": string;
        description?: string;
    } | null;
}

export default function ProfileModal({ isOpen, onClose, hostData }: ProfileModalProps) {
    if (!isOpen || !hostData) return null;

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white rounded-3xl w-[600px] max-h-[90vh] overflow-hidden relative">
                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 z-10"
                >
                    <MdClose size={24} />
                </button>

                {/* Cover Image Background */}
                <div className="h-40 bg-gradient-to-r from-teal-500 to-teal-700" />

                <div className="px-8 pb-8">
                    {/* Profile Image */}
                    <div className="relative -mt-20 mb-6">
                        <div className="w-40 h-40 rounded-full border-4 border-white overflow-hidden mx-auto shadow-lg">
                            <Image
                                width={160}
                                height={160}
                                src={hostData.image}
                                alt={hostData.name}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>

                    {/* Host Info */}
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold text-gray-800 mb-2">
                            {hostData.name}
                        </h2>
                        <div className="flex items-center justify-center gap-2 text-teal-600">
                            <FaStar className="text-yellow-400" />
                            <span className="font-medium">{hostData["host rating"]} Rating</span>
                        </div>
                    </div>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-2 gap-4 mb-8">
                        <div className="bg-gray-50 rounded-2xl p-4 text-center">
                            <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                <FaTrophy className="text-2xl text-teal-600" />
                            </div>
                            <p className="text-2xl font-bold text-teal-700 mb-1">
                                {hostData["activities hosted"]}
                            </p>
                            <p className="text-gray-600">Activities Hosted</p>
                        </div>
                        <div className="bg-gray-50 rounded-2xl p-4 text-center">
                            <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                <FaCalendarAlt className="text-2xl text-teal-600" />
                            </div>
                            <p className="text-2xl font-bold text-teal-700 mb-1">
                                2+ Years
                            </p>
                            <p className="text-gray-600">Hosting Experience</p>
                        </div>
                    </div>

                    {/* About Section */}
                    {hostData.description && (
                        <div className="bg-gray-50 rounded-2xl p-6 mb-8">
                            <h3 className="text-xl font-semibold text-gray-800 mb-4">About {hostData.name}</h3>
                            <p className="text-gray-600 leading-relaxed">
                                {hostData.description}
                            </p>
                        </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex gap-4">
                        <button
                            onClick={onClose}
                            className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors font-medium"
                        >
                            Close
                        </button>
                        <button
                            className="flex-1 px-6 py-3 bg-teal-600 text-white rounded-full hover:bg-teal-700 transition-colors font-medium"
                        >
                            Contact Host
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
} 