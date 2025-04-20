import React, { useState, useEffect } from 'react';

const ProgressoCircular = () => {
  const [tempo, setTempo] = useState(0); // Tempo restante (em segundos)
  const [tempoMaximo, setTempoMaximo] = useState(0); // Tempo total inserido
  const [ativo, setAtivo] = useState(false);
  const [entrada, setEntrada] = useState(''); // Input tipo "MM:SS"

  useEffect(() => {
    let intervalo = null;

    if (ativo && tempo > 0) {
      intervalo = setInterval(() => {
        setTempo((t) => t - 1);
      }, 1000);
    } else if (tempo === 0 && ativo) {
      setAtivo(false); // Parar ao chegar em zero
    }

    return () => clearInterval(intervalo);
  }, [ativo, tempo]);

  const formatarTempo = (segundos) => {
    const min = Math.floor(segundos / 60);
    const sec = segundos % 60;
    return `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
  };

  const progresso = tempoMaximo > 0 ? (tempo / tempoMaximo) * 100 : 0;

  const iniciar = () => {
    const partes = entrada.split(':');
    const minutos = parseInt(partes[0], 10) || 0;
    const segundos = parseInt(partes[1], 10) || 0;
    const total = minutos * 60 + segundos;
    setTempo(total);
    setTempoMaximo(total);
    setAtivo(true);
  };

  const resetar = () => {
    setAtivo(false);
    setTempo(0);
    setTempoMaximo(0);
    setEntrada('');
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <svg width="230" height="230" viewBox="0 0 130 130">
        <g transform="translate(65, 65)">
          <circle cx="0" cy="0" r="45" fill="#C52333" />

          <circle
            cx="6"
            cy="0"
            r="55"
            fill="none"
            stroke="#ECB5B9"
            strokeWidth="8"
            strokeDasharray="345.6"
            strokeDashoffset={(progresso / 100) * 345.6}
            strokeLinecap="round"
            transform="rotate(-90)"
          />

          <text
            x="0"
            y="0"
            textAnchor="middle"
            style={{
              fill: '#6E1C1C',
              stroke: '#601717',
              strokeWidth: 1.38,
              fontFamily: 'Inter, sans-serif',
              fontSize: '12px',
              fontStyle: 'normal',
              fontWeight: 700,
              lineHeight: 'normal',
              dominantBaseline: 'middle',
            }}
          >
            {formatarTempo(tempo)}
          </text>
        </g>
      </svg>

      <div style={{ marginTop: '1rem' }}>
        <input
          type="text"
          placeholder="MM:SS"
          value={entrada}
          onChange={(e) => setEntrada(e.target.value)}
          style={{
            padding: '0.5rem',
            marginRight: '0.5rem',
            borderRadius: '4px',
            border: '1px solid #ccc',
            width: '80px',
            textAlign: 'center',
          }}
        />
        <button onClick={iniciar} style={{ marginRight: '0.5rem' }}>
          Iniciar
        </button>
        <button onClick={resetar}>Resetar</button>
      </div>
    </div>
  );
};

export default ProgressoCircular;
