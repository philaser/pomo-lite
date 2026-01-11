import { formatTime } from '../utils/time'

export function TimerDisplay({ timeLeft }) {
    return (
        <div className="text-9xl font-light tracking-tighter text-primary mb-12 select-none tabular-nums">
            {formatTime(timeLeft)}
        </div>
    )
}
