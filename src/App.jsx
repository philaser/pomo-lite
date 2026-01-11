import { useState } from 'react'
import { Layout } from './components/Layout'
import { TimerDisplay } from './components/TimerDisplay'
import { Controls } from './components/Controls'
import { ModeSelector } from './components/ModeSelector'
import { SettingsModal } from './components/SettingsModal'
import { useTimer } from './hooks/useTimer'
import { useSound, SOUND_TYPES, SOUND_DURATIONS } from './hooks/useSound'
import { Settings } from 'lucide-react'

function App() {
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [soundType, setSoundType] = useState(SOUND_TYPES.BEEP.id)
  const [soundDuration, setSoundDuration] = useState(3)
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)

  const { playBeep } = useSound(soundEnabled, soundType, soundDuration)

  const {
    timeLeft,
    isRunning,
    mode,
    modes,
    switchMode,
    toggleTimer,
    resetTimer,
    updateModeDuration
  } = useTimer({ soundEnabled }, playBeep)

  return (
    <Layout>
      <div className="relative">
        <button
          onClick={() => setIsSettingsOpen(true)}
          className="absolute top-0 right-0 p-2 text-secondary hover:text-primary transition-colors"
          aria-label="Open Settings"
        >
          <Settings size={20} />
        </button>

        <div className="text-center pt-8">
          <ModeSelector currentMode={mode} onSwitch={switchMode} />
          <TimerDisplay timeLeft={timeLeft} />
          <Controls
            isRunning={isRunning}
            onToggle={toggleTimer}
            onReset={resetTimer}
          />
        </div>

        <SettingsModal
          isOpen={isSettingsOpen}
          onClose={() => setIsSettingsOpen(false)}
          modes={modes}
          onUpdateMode={updateModeDuration}
          soundEnabled={soundEnabled}
          onToggleSound={() => setSoundEnabled(prev => !prev)}
          soundType={soundType}
          onSetSoundType={setSoundType}
          soundDuration={soundDuration}
          onSetSoundDuration={setSoundDuration}
        />
      </div>
    </Layout>
  )
}

export default App
