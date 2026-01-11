import { Play, Pause, RotateCcw } from 'lucide-react'

export function Controls({ isRunning, onToggle, onReset }) {
    return (
        <div className="flex items-center justify-center gap-6">
            <button
                onClick={onToggle}
                className="p-4 rounded-full bg-primary text-surface hover:bg-accent transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg"
                aria-label={isRunning ? 'Pause' : 'Start'}
            >
                {isRunning ? <Pause size={32} /> : <Play size={32} className="ml-1" />}
            </button>

            <button
                onClick={onReset}
                className="p-4 rounded-full bg-white text-secondary hover:text-primary border border-gray-200 hover:border-gray-300 transition-all duration-300 hover:scale-105 active:scale-95"
                aria-label="Reset"
            >
                <RotateCcw size={24} />
            </button>
        </div>
    )
}
