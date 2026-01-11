import { MODES } from '../hooks/useTimer'

export function ModeSelector({ currentMode, onSwitch }) {
    return (
        <div className="flex gap-2 p-1 bg-gray-100/50 rounded-full mb-12 w-fit mx-auto backdrop-blur-sm">
            {Object.values(MODES).map((mode) => (
                <button
                    key={mode.id}
                    onClick={() => onSwitch(mode)}
                    className={`
            px-4 py-2 rounded-full text-sm font-medium transition-all duration-300
            ${currentMode.id === mode.id
                            ? 'bg-white text-primary shadow-sm'
                            : 'text-secondary hover:text-primary hover:bg-white/50'}
          `}
                >
                    {mode.label}
                </button>
            ))}
        </div>
    )
}
