import Image from 'next/image';
import { BannerData } from '@/types';

interface InfoPageProps {
    currentEvent: BannerData;
}

export default function InfoPage({ currentEvent }: InfoPageProps) {
    return (
        <div className="space-y-6">
            {currentEvent?.Info && currentEvent.Info.map((info) => (
                <div key={info.id} className="space-y-6">
                    {/* Sports, Gender, Age */}
                    <div className="flex flex-wrap gap-2">
                        {info.title.split(',').map((sport, idx) => (
                            <span key={idx} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                                {sport.trim()}
                            </span>
                        ))}
                        <span className="bg-pink-100 text-pink-800 px-3 py-1 rounded-full text-sm">
                            {info.gender}
                        </span>
                        <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">
                            Age: {info.age}
                        </span>
                        <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                            {info.type}
                        </span>
                    </div>

                    {/* About this event */}
                    <div>
                        <h3 className="text-xl font-semibold mb-2">About this event</h3>
                        <p className="text-gray-700">{info.about}</p>
                        <button className="text-blue-500 mt-2">Read more</button>
                    </div>

                    {/* Location */}
                    <div>
                        <h3 className="text-xl font-semibold mb-2">Location</h3>
                        <p className="font-medium">NDE Field</p>
                        <p className="text-gray-700">{info.location}</p>
                        <button className="mt-2 px-4 py-1 border border-gray-300 rounded-full text-sm">
                            Open maps
                        </button>
                    </div>

                    {/* Good to know */}
                    <div>
                        <h3 className="text-xl font-semibold mb-4">Good to know</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Highlights */}
                            <div className="bg-red-50 p-4 rounded-lg">
                                <h4 className="font-semibold mb-2">Highlights</h4>
                                <ul className="space-y-2">
                                    {info.Highlights.map((highlight) => (
                                        <li key={highlight.id} className="flex items-start">
                                            <div className="space-y-1">
                                                <p>{highlight.date}</p>
                                                <p>{highlight.time}</p>
                                                <p>{highlight.Arrive}</p>
                                                <p>{highlight.Venue}</p>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Refund & cancellation policy */}
                            <div className="bg-green-50 p-4 rounded-lg">
                                <h4 className="font-semibold mb-2">Refund & cancellation policy</h4>
                                <ul className="space-y-2">
                                    {info.Refund.map((refund) => (
                                        <li key={refund.id} className="flex items-start">
                                            <span className="mr-2">•</span>
                                            <span>{refund.title}</span>
                                        </li>
                                    ))}
                                </ul>
                                <button className="text-blue-500 mt-2">Learn more</button>
                            </div>
                        </div>
                    </div>

                    {/* Hosted by */}
                    <div>
                        <h3 className="text-xl font-semibold mb-4">Hosted by</h3>
                        {info["Hosted by"].map((host) => (
                            <div key={host.id} className="flex items-center space-x-4 bg-gray-50 p-4 rounded-lg">
                                <Image
                                    width={48}
                                    height={48}
                                    src={host.image} 
                                    alt={host.name} 
                                    className="w-12 h-12 rounded-full object-cover"
                                />
                                <div>
                                    <p className="font-medium">{host.name}</p>
                                    <p className="text-sm text-gray-600">{host["activities hosted"]} activities hosted</p>
                                    <p className="text-sm text-gray-600">{host["host rating"]} host rating</p>
                                </div>
                                <div className="ml-auto space-x-2">
                                    <button className="px-4 py-1 border border-gray-300 rounded-full text-sm">
                                        Message
                                    </button>
                                    <button className="px-4 py-1 border border-gray-300 rounded-full text-sm">
                                        View profile
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
} 