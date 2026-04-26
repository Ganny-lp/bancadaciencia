import React, { useState, useRef } from 'react';
import { getFileUrl } from '../config/subprojectsContent';

const randInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

const generateProblem = () => {
    const m1 = randInt(1, 4);
    const m2 = randInt(1, 4);
    const m3 = randInt(1, 4);
    const mSum = m1 + m2 + m3;
    const adjust = 10 - mSum;
    const extra = Math.max(0, adjust);
    const m3final = m3 + extra;
    const mp = 10;
    const totalM = m1 + m2 + m3final + mp;

    const sats = [
        { m: m1, x: randInt(1, 9), y: randInt(1, 9) },
        { m: m2, x: randInt(1, 9), y: randInt(1, 9) },
        { m: m3final, x: randInt(1, 9), y: randInt(1, 9) }
    ];

    const trueX = randInt(2, 18) / 2;
    const trueY = randInt(2, 18) / 2;

    const sumMx = sats[0].m * sats[0].x + sats[1].m * sats[1].x + sats[2].m * sats[2].x;
    const sumMy = sats[0].m * sats[0].y + sats[1].m * sats[1].y + sats[2].m * sats[2].y;

    const targetCmX = (sumMx + mp * trueX) / totalM;
    const targetCmY = (sumMy + mp * trueY) / totalM;

    return { sats, mp, totalM, trueX, trueY, sumMx, sumMy, targetCmX, targetCmY };
};

export const JediArchiveSimulator = () => {
    const [problem, setProblem] = useState(() => generateProblem());
    const [planetX, setPlanetX] = useState(5.0);
    const [planetY, setPlanetY] = useState(5.0);
    const [userAnswerX, setUserAnswerX] = useState('');
    const [userAnswerY, setUserAnswerY] = useState('');
    const [hasAdjusted, setHasAdjusted] = useState(false);
    const [showNextModal, setShowNextModal] = useState(false);
    const [showLibraryClue, setShowLibraryClue] = useState(false);
    const [nextAnswer, setNextAnswer] = useState('');
    const [nextCorrect, setNextCorrect] = useState(false);
    const [libraryAnswer, setLibraryAnswer] = useState('');
    const [libraryCorrect, setLibraryCorrect] = useState(false);

    const svgRef = useRef<SVGSVGElement>(null);

    const currentCmX = (problem.sumMx + problem.mp * planetX) / problem.totalM;
    const currentCmY = (problem.sumMy + problem.mp * planetY) / problem.totalM;

    const parsedX = parseFloat(userAnswerX);
    const parsedY = parseFloat(userAnswerY);
    const isXCorrect = !isNaN(parsedX) && Math.abs(parsedX - problem.trueX) < 0.05;
    const isYCorrect = !isNaN(parsedY) && Math.abs(parsedY - problem.trueY) < 0.05;
    const isSuccess = isXCorrect && isYCorrect;

    const handleRestart = () => {
        setProblem(generateProblem());
        setPlanetX(5.0);
        setPlanetY(5.0);
        setUserAnswerX('');
        setUserAnswerY('');
        setHasAdjusted(false);
        setShowNextModal(false);
        setShowLibraryClue(false);
        setNextAnswer('');
        setNextCorrect(false);
        setLibraryAnswer('');
        setLibraryCorrect(false);
    };

    const handleMapClick = (e: React.MouseEvent<SVGSVGElement>) => {
        if (!svgRef.current) return;
        const rect = svgRef.current.getBoundingClientRect();
        const relX = (e.clientX - rect.left) / rect.width;
        const relY = (e.clientY - rect.top) / rect.height;
        const newX = Math.min(10, Math.max(0, relX * 10));
        const newY = Math.min(10, Math.max(0, 10 - relY * 10));
        setPlanetX(Math.round(newX * 100) / 100);
        setPlanetY(Math.round(newY * 100) / 100);
        setHasAdjusted(true);
    };

    if (showNextModal) {
        return (
            <div className="h-screen bg-white flex items-start justify-center pt-6 pb-10 px-4 overflow-y-auto">
                <div className="bg-white border border-gray-300 rounded-lg p-6 max-w-6xl w-full mx-4 mt-4 mb-4 relative">
                    <button
                        onClick={() => {
                            setShowNextModal(false);
                            setShowLibraryClue(false);
                            setNextCorrect(false);
                            setLibraryCorrect(false);
                        }}
                        className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-2xl"
                    >
                        &times;
                    </button>

                    {!showLibraryClue ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="flex flex-col gap-4">
                                <div className="h-0 grow">
                                    <video controls preload="metadata" className="w-full h-full max-h-[28rem] rounded object-cover">
                                        <source src={getFileUrl('banca/caixadagua.mp4')} type="video/mp4" />
                                        Seu navegador não suporta vídeo.
                                    </video>
                                </div>
                                <div className="p-2 rounded border border-gray-300 bg-gray-50">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Resposta</label>
                                    <input
                                        type="text"
                                        value={nextAnswer}
                                        onChange={(e) => setNextAnswer(e.target.value)}
                                        placeholder="Digite sua resposta"
                                        className="w-full p-2 border border-gray-300 rounded"
                                    />
                                    <button
                                        onClick={() => {
                                            const normalized = nextAnswer.trim().toLowerCase();
                                            if (normalized === '40m' || normalized === '40') {
                                                setNextCorrect(true);
                                            }
                                        }}
                                        className="mt-3 w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                                    >
                                        Enviar
                                    </button>
                                    {nextCorrect && (
                                        <button
                                            onClick={() => setShowLibraryClue(true)}
                                            className="mt-2 w-full px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                                        >
                                            Próxima pista
                                        </button>
                                    )}
                                </div>
                            </div>
                            <div className="flex items-center justify-center">
                                <img src={getFileUrl('banca/questao.png')} alt="Questão" className="w-full max-h-[32rem] rounded border border-gray-300" />
                            </div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="flex justify-center items-start">
                                <img src={getFileUrl('banca/biblioteca.png')} alt="Biblioteca" className="w-full max-h-[32rem] rounded" />
                            </div>
                            <div className="flex flex-col justify-center">
                                <h3 className="text-lg font-bold mb-2">Senha do Fóssil</h3>
                                <p className="text-sm mb-4">Vá à biblioteca da EACH-USP e escreva o nome desse fóssil da imagem.</p>
                                <input
                                    type="text"
                                    value={libraryAnswer}
                                    onChange={(e) => setLibraryAnswer(e.target.value)}
                                    placeholder="Escreva o nome do fóssil"
                                    className="w-full p-2 border border-gray-300 rounded mb-2"
                                />
                                <button
                                    onClick={() => {
                                        const norm = libraryAnswer.trim();
                                        if (['archaeopteryx', 'archaeopteryx lithographica'].includes(norm.toLowerCase())) {
                                            setLibraryCorrect(true);
                                        }
                                    }}
                                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                                >
                                    Enviar
                                </button>
                                {libraryCorrect && (
                                    <>
                                        <div className="mt-3 p-3 rounded border border-green-500 bg-green-50 text-green-800">
                                            Parabéns! senha correta.
                                        </div>
                                        <div className="mt-4 flex justify-center">
                                            <a href="https://www.instagram.com/nnediusp/" target="_blank" rel="noopener noreferrer">
                                                <img
                                                    src={getFileUrl('banca/ultima.png')}
                                                    alt="Última"
                                                    className="w-full max-w-6xl max-h-[80vh] rounded border border-gray-300 object-contain cursor-pointer"
                                                />
                                            </a>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    }

    return (
        <div className="h-screen bg-zinc-950 text-green-500 font-mono p-4 md:p-8 overflow-auto">
            <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Painel de controle esquerdo */}
                <div className="lg:col-span-5 bg-zinc-900/70 border border-green-800 rounded-xl p-4">
                    <h2 className="text-xl text-green-300 font-bold mb-2">Planeta Oculto Detectado</h2>
                    <div className="mb-4 rounded-lg overflow-hidden border border-green-700">
                        <video controls preload="metadata" className="w-full max-h-52 bg-black" poster={getFileUrl("banca/yoda-poster.jpg")}>
                            <source src={getFileUrl("banca/yoda.mp4")} type="video/mp4" />
                            Seu navegador não suporta vídeo HTML5.
                        </video>
                    </div>
                    <p className="text-sm text-green-200 mb-2">
                        Durante uma análise no arquivo estelar Jedi, Obi-Wan Kenobi percebe uma inconsistência: o centro de massa
                        de um sistema planetário registrado não coincide com os planetas atualmente visíveis.
                    </p>
                    <p className="text-sm text-green-200 mb-3">
                        Sabe-se que um planeta foi removido dos registros. A massa do planeta oculto é <strong>mp = 10</strong>. O
                        centro de massa registrado do sistema é <strong>{problem.targetCmX.toFixed(2)}, {problem.targetCmY.toFixed(2)}</strong>,
                        mas os três satélites visíveis não justificam essa posição. Use o radar para deduzir onde o planeta ausente
                        deveria estar!
                    </p>
                    <p className="text-xs text-green-300 mb-4">
                        CM Atual do Radar: <strong>{currentCmX.toFixed(3)}, {currentCmY.toFixed(3)}</strong>
                    </p>

                    <div className="mb-3 bg-black/40 rounded-lg p-3 border border-green-900">
                        <label className="flex justify-between text-xs text-green-400">
                            X do Planeta Radar <span>{planetX.toFixed(2)}</span>
                        </label>
                        <input
                            type="range"
                            min="0"
                            max="10"
                            step="0.01"
                            value={planetX}
                            onChange={(e) => {
                                setPlanetX(parseFloat(e.target.value));
                                setHasAdjusted(true);
                            }}
                            className="w-full accent-green-500"
                        />
                        <label className="flex justify-between text-xs text-green-400 mt-2">
                            Y do Planeta Radar <span>{planetY.toFixed(2)}</span>
                        </label>
                        <input
                            type="range"
                            min="0"
                            max="10"
                            step="0.01"
                            value={planetY}
                            onChange={(e) => {
                                setPlanetY(parseFloat(e.target.value));
                                setHasAdjusted(true);
                            }}
                            className="w-full accent-green-500"
                        />
                    </div>

                    <div className="bg-black/40 p-3 rounded-lg border border-green-900 mb-3 text-xs text-green-300">
                        <p className="font-bold text-green-400">Fórmulas</p>
                        <p>X_cm = (m1·x1 + m2·x2 + m3·x3 + mp·X) / Σm</p>
                        <p>Y_cm = (m1·y1 + m2·y2 + m3·y3 + mp·Y) / Σm</p>
                    </div>

                    <div className="grid grid-cols-1 gap-2 mb-3">
                        <div className="relative">
                            <input
                                type="number"
                                step="0.1"
                                value={userAnswerX}
                                onChange={(e) => setUserAnswerX(e.target.value)}
                                placeholder="Resposta X oculto"
                                disabled={!hasAdjusted}
                                className={`w-full ${
                                    hasAdjusted ? 'bg-black/30' : 'bg-black/20'
                                } border border-green-800 rounded px-2 py-1 text-sm text-green-100 ${
                                    !hasAdjusted ? 'opacity-50 cursor-not-allowed' : ''
                                }`}
                            />
                            {isXCorrect && <span className="absolute right-2 top-1/2 -translate-y-1/2 text-green-400">✔</span>}
                        </div>
                        <div className="relative">
                            <input
                                type="number"
                                step="0.1"
                                value={userAnswerY}
                                onChange={(e) => setUserAnswerY(e.target.value)}
                                placeholder="Resposta Y oculto"
                                disabled={!hasAdjusted}
                                className={`w-full ${
                                    hasAdjusted ? 'bg-black/30' : 'bg-black/20'
                                } border border-green-800 rounded px-2 py-1 text-sm text-green-100 ${
                                    !hasAdjusted ? 'opacity-50 cursor-not-allowed' : ''
                                }`}
                            />
                            {isYCorrect && <span className="absolute right-2 top-1/2 -translate-y-1/2 text-green-400">✔</span>}
                        </div>
                    </div>

                    {!hasAdjusted ? (
                        <div className="border border-dashed border-green-700 p-2 rounded text-xs text-green-300">
                            Ajuste X e Y do Planeta Radar para liberar as respostas.
                        </div>
                    ) : !isSuccess ? (
                        <div className="border border-dashed border-green-700 p-2 rounded text-xs text-green-300">
                            Tente encontrar as coordenadas exatas (precisão 0.05) para ativar a resolução.
                        </div>
                    ) : (
                        <div className="bg-black/40 p-3 rounded border border-green-700 text-xs text-green-100">
                            <p className="font-bold text-green-300 mb-2">Parabéns! respostas corretas.</p>
                            <p>X verdadeiro: {problem.trueX.toFixed(1)}</p>
                            <p>Y verdadeiro: {problem.trueY.toFixed(1)}</p>
                            <p className="mt-2">Resolução passo a passo:</p>
                            <p>
                                X_cm = ({problem.sumMx} + {problem.mp}·X) / {problem.totalM}
                            </p>
                            <p>
                                {problem.targetCmX.toFixed(2)} = ({problem.sumMx} + {problem.mp}·X) / {problem.totalM}
                            </p>
                            <p>X = {problem.trueX.toFixed(1)}</p>
                            <p className="mt-2">
                                Y_cm = ({problem.sumMy} + {problem.mp}·Y) / {problem.totalM}
                            </p>
                            <p>
                                {problem.targetCmY.toFixed(2)} = ({problem.sumMy} + {problem.mp}·Y) / {problem.totalM}
                            </p>
                            <p>Y = {problem.trueY.toFixed(1)}</p>
                            <button
                                onClick={() => setShowNextModal(true)}
                                className="mt-3 px-3 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded text-sm"
                            >
                                Próxima pista
                            </button>
                        </div>
                    )}

                    {isSuccess && (
                        <button
                            onClick={handleRestart}
                            className="mt-3 w-full py-2 bg-green-600 hover:bg-green-500 text-black rounded font-bold"
                        >
                            Gerar Novo Problema
                        </button>
                    )}
                </div>

                {/* Radar SVG interativo */}
                <div className="lg:col-span-7 relative bg-zinc-950 border border-green-900 rounded-xl p-3">
                    <svg
                        ref={svgRef}
                        viewBox="0 0 100 100"
                        className="w-full h-[80vh] rounded-lg bg-black/40 border border-green-800 cursor-crosshair"
                        onClick={handleMapClick}
                    >
                        {/* Grid */}
                        {[...Array(21)].map((_, i) => (
                            <g key={`grid-${i}`}>
                                <line
                                    x1={`${i * 5}`}
                                    y1="0"
                                    x2={`${i * 5}`}
                                    y2="100"
                                    stroke={i % 2 === 0 ? 'rgba(34, 197, 94, 0.35)' : 'rgba(34, 197, 94, 0.15)'}
                                    strokeWidth={i % 2 === 0 ? 0.3 : 0.15}
                                />
                                <line
                                    x1="0"
                                    y1={`${i * 5}`}
                                    x2="100"
                                    y2={`${i * 5}`}
                                    stroke={i % 2 === 0 ? 'rgba(34, 197, 94, 0.35)' : 'rgba(34, 197, 94, 0.15)'}
                                    strokeWidth={i % 2 === 0 ? 0.3 : 0.15}
                                />
                                {i % 2 === 0 && i < 20 && (
                                    <text x={`${i * 5 + 1}`} y="98" fill="#22c55e" fontSize="2.5">
                                        {i / 2}
                                    </text>
                                )}
                            </g>
                        ))}

                        {/* Satélites visíveis */}
                        {problem.sats.map((sat, index) => (
                            <g key={`sat-${index}`}>
                                <circle
                                    cx={sat.x * 10}
                                    cy={100 - sat.y * 10}
                                    r={2 + sat.m * 0.5}
                                    fill={['#86efac', '#4ade80', '#22c55e'][index]}
                                    stroke="#0f766e"
                                    strokeWidth="0.2"
                                />
                                <text x={sat.x * 10 + 3} y={100 - sat.y * 10 - 2} fill="#a7f3d0" fontSize="2.5">
                                    m{index + 1}={sat.m}
                                </text>
                            </g>
                        ))}

                        {/* Centro de massa registrado (alvo) */}
                        <g>
                            <circle
                                cx={problem.targetCmX * 10}
                                cy={100 - problem.targetCmY * 10}
                                r="3.3"
                                fill="none"
                                stroke="#f59e0b"
                                strokeWidth="0.8"
                            />
                            <circle
                                cx={problem.targetCmX * 10}
                                cy={100 - problem.targetCmY * 10}
                                r="1.6"
                                fill="#f59e0b"
                                opacity="0.8"
                            />
                            <path
                                d={`M ${problem.targetCmX * 10 - 1.7} ${100 - problem.targetCmY * 10} h 3.4 M ${problem.targetCmX * 10} ${
                                    100 - problem.targetCmY * 10 - 1.7
                                } v 3.4`}
                                stroke="#fde68a"
                                strokeWidth="0.6"
                            />
                        </g>

                        {/* Planeta Radar (controlável) */}
                        <g>
                            <circle cx={planetX * 10} cy={100 - planetY * 10} r="3.6" fill="#10b981" opacity="0.95" />
                            <circle
                                cx={planetX * 10}
                                cy={100 - planetY * 10}
                                r="6"
                                fill="none"
                                stroke="#34d399"
                                strokeWidth="0.3"
                                strokeDasharray="2 2"
                            />
                            <text x={planetX * 10 + 2} y={100 - planetY * 10 - 2} fill="#6ee7b7" fontSize="2.5">
                                Radar
                            </text>
                        </g>

                        {/* Centro de massa atual do sistema */}
                        <g>
                            <circle cx={currentCmX * 10} cy={100 - currentCmY * 10} r="2.2" fill="#ef4444" />
                            <circle
                                cx={currentCmX * 10}
                                cy={100 - currentCmY * 10}
                                r="5"
                                stroke="#fca5a5"
                                strokeWidth="0.2"
                                fill="none"
                            />
                        </g>

                        {/* Linha conectando Planeta Radar ao CM atual */}
                        <line
                            x1={planetX * 10}
                            y1={100 - planetY * 10}
                            x2={currentCmX * 10}
                            y2={100 - currentCmY * 10}
                            stroke="#22c55e"
                            strokeWidth="0.4"
                            strokeDasharray="2 1"
                        />
                    </svg>

                    {/* Overlay de sucesso */}
                    {isSuccess && (
                        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center text-center p-4">
                            <div className="bg-zinc-900 border border-green-500 p-4 rounded-lg">
                                <p className="text-green-300 font-bold text-xl mb-2">Posição Encontrada!</p>
                                <p className="text-sm text-green-200 mb-3">Os seus cálculos estão corretos.</p>
                                <button onClick={handleRestart} className="px-4 py-2 bg-green-600 hover:bg-green-500 rounded text-black font-bold">
                                    Gerar Novo Problema
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};