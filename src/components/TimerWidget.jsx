import React, { useState, useEffect, useRef } from "react";
import { ChevronUp, ChevronDown, Play, Pause, RotateCcw } from "lucide-react";

const TimerWidget = () => {
  // Input settings (only editable when not running)
  const [inputHrs, setInputHrs] = useState(0);
  const [inputMins, setInputMins] = useState(0);
  const [inputSecs, setInputSecs] = useState(0);

  // Countdown state
  const [totalSeconds, setTotalSeconds] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  
  const timerRef = useRef(null);

  // Handle increments/decrements
  const adjustHrs = (val) => {
    if (isRunning) return;
    setInputHrs((prev) => Math.max(0, Math.min(23, prev + val)));
  };

  const adjustMins = (val) => {
    if (isRunning) return;
    setInputMins((prev) => {
      let newMins = prev + val;
      if (newMins > 59) return 0;
      if (newMins < 0) return 59;
      return newMins;
    });
  };

  const adjustSecs = (val) => {
    if (isRunning) return;
    setInputSecs((prev) => {
      let newSecs = prev + val;
      if (newSecs > 59) return 0;
      if (newSecs < 0) return 59;
      return newSecs;
    });
  };

  // Start the timer
  const handleStart = () => {
    const total = inputHrs * 3600 + inputMins * 60 + inputSecs;
    if (total === 0) return;

    setTotalSeconds(total);
    setSecondsLeft(total);
    setIsRunning(true);
    setIsPaused(false);
  };

  // Pause/Resume the timer
  const handlePauseToggle = () => {
    setIsPaused((prev) => !prev);
  };

  // Reset the timer
  const handleReset = () => {
    setIsRunning(false);
    setIsPaused(false);
    setSecondsLeft(0);
    setTotalSeconds(0);
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  };

  // Play alarm sound using Web Audio API
  const playAlarm = () => {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();
      
      // Play 3 short high beeps
      const playBeep = (delay) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(880, ctx.currentTime + delay); // A5 note
        gain.gain.setValueAtTime(0.3, ctx.currentTime + delay);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + delay + 0.3);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + delay);
        osc.stop(ctx.currentTime + delay + 0.4);
      };

      playBeep(0);
      playBeep(0.5);
      playBeep(1.0);
    } catch (e) {
      console.error("Web Audio API not supported or blocked by user gesture:", e);
    }
  };

  // Countdown timer loop
  useEffect(() => {
    if (isRunning && !isPaused) {
      timerRef.current = setInterval(() => {
        setSecondsLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            setIsRunning(false);
            playAlarm();
            alert("Time is up!");
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isRunning, isPaused]);

  // Format time values for display
  const formatTimeToken = (num) => String(num).padStart(2, "0");

  const displayHrs = isRunning ? Math.floor(secondsLeft / 3600) : inputHrs;
  const displayMins = isRunning ? Math.floor((secondsLeft % 3600) / 60) : inputMins;
  const displaySecs = isRunning ? secondsLeft % 60 : inputSecs;

  // Calculate circular progress parameters
  const radius = 64;
  const circumference = 2 * Math.PI * radius; // ~402.12
  const progressPercent = totalSeconds > 0 ? (secondsLeft / totalSeconds) : 1;
  const strokeDashoffset = circumference * (1 - progressPercent);

  return (
    <div className="timer-widget">
      {/* Left side: Circular visual countdown */}
      <div className="timer-left-circle">
        <svg className="timer-svg" width="160" height="160" viewBox="0 0 160 160">
          {/* Background circle track */}
          <circle
            className="timer-circle-track"
            cx="80"
            cy="80"
            r={radius}
            strokeWidth="8"
            fill="none"
          />
          {/* Foreground animated progress circle */}
          <circle
            className="timer-circle-progress"
            cx="80"
            cy="80"
            r={radius}
            strokeWidth="8"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            transform="rotate(-90 80 80)"
          />
        </svg>
        {/* Absolute centered numerical display */}
        <div className="timer-numeric-overlay">
          <span className="timer-numeric-text">
            {formatTimeToken(displayHrs)}:{formatTimeToken(displayMins)}:{formatTimeToken(displaySecs)}
          </span>
          {isPaused && <span className="timer-paused-label">PAUSED</span>}
        </div>
      </div>

      {/* Right side: Input selectors and control triggers */}
      <div className="timer-right-controls">
        <div className="timer-selectors">
          {/* Hours block */}
          <div className="timer-selector-block">
            <span className="selector-label">Hours</span>
            <button
              type="button"
              className="selector-arrow-btn"
              onClick={() => adjustHrs(1)}
              disabled={isRunning}
            >
              <ChevronUp size={24} />
            </button>
            <span className="selector-number">{formatTimeToken(inputHrs)}</span>
            <button
              type="button"
              className="selector-arrow-btn"
              onClick={() => adjustHrs(-1)}
              disabled={isRunning}
            >
              <ChevronDown size={24} />
            </button>
          </div>

          <span className="selector-colon">:</span>

          {/* Minutes block */}
          <div className="timer-selector-block">
            <span className="selector-label">Minutes</span>
            <button
              type="button"
              className="selector-arrow-btn"
              onClick={() => adjustMins(1)}
              disabled={isRunning}
            >
              <ChevronUp size={24} />
            </button>
            <span className="selector-number">{formatTimeToken(inputMins)}</span>
            <button
              type="button"
              className="selector-arrow-btn"
              onClick={() => adjustMins(-1)}
              disabled={isRunning}
            >
              <ChevronDown size={24} />
            </button>
          </div>

          <span className="selector-colon">:</span>

          {/* Seconds block */}
          <div className="timer-selector-block">
            <span className="selector-label">Seconds</span>
            <button
              type="button"
              className="selector-arrow-btn"
              onClick={() => adjustSecs(1)}
              disabled={isRunning}
            >
              <ChevronUp size={24} />
            </button>
            <span className="selector-number">{formatTimeToken(inputSecs)}</span>
            <button
              type="button"
              className="selector-arrow-btn"
              onClick={() => adjustSecs(-1)}
              disabled={isRunning}
            >
              <ChevronDown size={24} />
            </button>
          </div>
        </div>

        {/* Action Trigger Buttons */}
        <div className="timer-action-buttons">
          {!isRunning ? (
            <button
              type="button"
              className="btn-timer-action btn-start"
              onClick={handleStart}
              disabled={inputHrs === 0 && inputMins === 0 && inputSecs === 0}
            >
              <Play size={18} fill="currentColor" /> Start
            </button>
          ) : (
            <>
              <button
                type="button"
                className={`btn-timer-action ${isPaused ? "btn-start" : "btn-pause"}`}
                onClick={handlePauseToggle}
              >
                {isPaused ? (
                  <>
                    <Play size={18} fill="currentColor" /> Resume
                  </>
                ) : (
                  <>
                    <Pause size={18} fill="currentColor" /> Pause
                  </>
                )}
              </button>
              <button
                type="button"
                className="btn-timer-action btn-reset"
                onClick={handleReset}
              >
                <RotateCcw size={18} /> Reset
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default TimerWidget;
