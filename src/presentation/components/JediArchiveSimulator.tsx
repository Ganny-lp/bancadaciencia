import React, { useState, useEffect } from 'react';

export const JediArchiveSimulator = () => {
    const [stars, setStars] = useState<{id: number, x: number, y: number, size: number, opacity: number}[]>([]);
    const [activeTab, setActiveTab] = useState('DATABASE');

    useEffect(() => {
        const newStars = Array.from({ length: 100 }).map((_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: Math.random() * 2 + 1,
            opacity: Math.random()
        }));
        setStars(newStars);
    }, []);

    return (
        <div className="w-full h-full bg-slate-950 text-cyan-400 font-mono overflow-hidden relative border-4 border-cyan-900/30">
            {/* Background Estelar */}
            {stars.map(star => (
                <div
                    key={star.id}
                    className="absolute rounded-full bg-white animate-pulse"
                    style={{
                        left: `${star.x}%`,
                        top: `${star.y}%`,
                        width: `${star.size}px`,
                        height: `${star.size}px`,
                        opacity: star.opacity,
                    }}
                />
            ))}

            {/* Interface do Simulador */}
            <div className="relative z-10 p-8 flex flex-col h-full">
                <header className="border-b-2 border-cyan-500/50 pb-4 mb-6 flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-black tracking-tighter">JEDI ARCHIVE</h1>
                        <p className="text-xs text-cyan-600">CORUSCANT TERMINAL - SECTOR 7G</p>
                    </div>
                    <div className="text-right">
                        <p className="text-sm">ACCESS LEVEL: MASTER</p>
                        <p className="text-xs animate-pulse">CONNECTION: SECURE</p>
                    </div>
                </header>

                <div className="flex gap-4 mb-6">
                    {['DATABASE', 'RADAR', 'RECORDS'].map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-6 py-2 border ${activeTab === tab ? 'bg-cyan-500 text-slate-900' : 'border-cyan-500/50 hover:bg-cyan-500/10'}`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                <main className="flex-grow border border-cyan-500/20 bg-slate-900/50 rounded-lg p-6 backdrop-blur-sm overflow-auto">
                    {activeTab === 'DATABASE' && (
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <h2 className="text-xl border-l-4 border-cyan-500 pl-3">Recent Star Systems</h2>
                                <ul className="space-y-2 opacity-80">
                                    <li>• Tatooine - Outer Rim</li>
                                    <li>• Naboo - Mid Rim</li>
                                    <li>• Coruscant - Core</li>
                                    <li>• Kamino - Wild Space</li>
                                </ul>
                            </div>
                            <div className="bg-cyan-950/20 p-4 rounded border border-cyan-500/10">
                                <h3 className="text-cyan-500 mb-2">Holocron Status</h3>
                                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                                    <div className="bg-cyan-500 h-full w-[85%]"></div>
                                </div>
                                <p className="text-[10px] mt-2">DECRYPTING ARCHIVAL DATA... 85%</p>
                            </div>
                        </div>
                    )}
                    {activeTab === 'RADAR' && (
                        <div className="flex items-center justify-center h-full">
                            <div className="w-64 h-64 border-2 border-cyan-500/30 rounded-full relative animate-[spin_10s_linear_infinite]">
                                <div className="absolute top-0 left-1/2 w-1 h-1/2 bg-gradient-to-b from-cyan-500 to-transparent origin-bottom"></div>
                                <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-cyan-400 rounded-full shadow-[0_0_10px_cyan]"></div>
                            </div>
                            <p className="absolute text-xs mt-32">SCANNING FOR FORCE SENSITIVES...</p>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};