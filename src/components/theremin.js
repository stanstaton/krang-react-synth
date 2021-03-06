import React, { useState } from 'react';
import Tone from 'tone';

const Theremin = props => {
    const MAX_FREQ = 1000;
    const MIN_FREQ = 100;

    const [waveform, setWave] = useState('sine');
    const [volFreq, setVolFreq] = useState({
        'volume': 0,
        'frequency': 400
    });
    const [oscillator] = useState(new Tone.Oscillator(440,'sine'));
    const [oscStarted, setOscStarted] = useState(false);
    const [channel] = useState(new Tone.Channel({
        'volume': -5,
        'pan': 0
    }));

    function setVF(e) {
        let bRect = e.target.getBoundingClientRect();
        let x = e.pageX - bRect.left;
        let freq = ((MAX_FREQ - MIN_FREQ) / bRect.width)*x + MIN_FREQ;
        setVolFreq({
            'volume': Math.floor(bRect.bottom - e.pageY),
            'frequency': Math.floor(freq)
        });
        oscillator.mute = false;
        oscillator.volume.value = -5 - ((200 - volFreq.volume) / 3);
        oscillator.frequency.value = freq;
    }

    function mute() {
        oscillator.mute = true;
    }

    function setWaveform(w) {
        oscillator.type = w;
        setWave(w);
    }

    function initTheremin(e) {
        e.stopPropagation();
        let thereminCompress = new Tone.Compressor({
            'threshold': -20,
            'ratio': 6,
            'attack': 0.3,
            'release': 0.1
          });
        let thereminDelay = new Tone.PingPongDelay({
            'delayTime': .25,
            'feedback': .7
        })
        let thereminReverb = new Tone.Reverb({
            'decay': 1.5,
            'preDelay': 0.01
        });
        thereminReverb.generate();
        oscillator.chain(thereminCompress, channel, thereminDelay, thereminReverb, Tone.Master);
        
        if (oscillator.state == 'stopped') {
            oscillator.start();
            setOscStarted(true);
        }
    }

    return (
        <div className="theremin-container">
            <button className="theremin-waveform-button" name="sine" id="theremin-sine-button" onClick={() => setWaveform('sine')}>SINE</button><br />
            <button className="theremin-waveform-button" name="tri" id="theremin-triangle-button" onClick={() => setWaveform('triangle')}>TRI</button><br />
            <button className="theremin-waveform-button" name="saw" id="theremin-sawtooth-button" onClick={() => setWaveform('sawtooth')}>SAW</button><br />
            <button className="theremin-waveform-button" name="squ" id="theremin-square-button" onClick={() => setWaveform('square')}>SQU</button>
            <input type="range" id="theremin-delay-time-range" name="theremin-delay-time-range" min="0" max="5" step="0.1" />
            <input type="range" id="theremin-delay-regen-range" name="theremin-delay-regen-range" min="0" max="1" step="0.01" />
            <div className="theremin-surface" onPointerMove={setVF} onMouseOut={mute} onLoad={initTheremin} onClick={initTheremin}>
                <p>{waveform}</p>
                <p>{volFreq.volume}</p>
                <p>{volFreq.frequency}</p>
            </div>
        </div>
    )
}

export default Theremin;