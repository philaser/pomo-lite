import { X } from 'lucide-react'
import { SOUND_TYPES, SOUND_DURATIONS } from '../hooks/useSound'

export function SettingsModal({
    isOpen,
    onClose,
    modes,
    onUpdateMode,
    soundEnabled,
    onToggleSound,
    soundType,
    onSetSoundType,
    soundDuration,
    onSetSoundDuration
}) {
    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm p-4">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm overflow-hidden animate-in fade-in zoom-in duration-200">
                <div className="flex items-center justify-between p-4 border-b border-gray-100">
                    <h2 className="text-lg font-semibold text-primary">Settings</h2>
                    <button
                        onClick={onClose}
                        className="p-1 rounded-full hover:bg-gray-100 text-secondary hover:text-primary transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>

                <div className="p-6 space-y-6">
                    <div className="space-y-4">
                        <h3 className="text-sm font-medium text-secondary uppercase tracking-wider">Timer (Minutes)</h3>
                        {Object.values(modes).map((mode) => (
                            <div key={mode.id} className="flex items-center justify-between">
                                <label className="text-gray-700 text-sm">{mode.label}</label>
                                <input
                                    type="number"
                                    value={mode.minutes}
                                    onChange={(e) => onUpdateMode(mode.id, parseInt(e.target.value) || 1)}
                                    className="w-20 p-2 text-right text-sm bg-gray-50 rounded-lg border border-transparent focus:border-gray-200 focus:bg-white transition-all outline-none"
                                    min="1"
                                    max="60"
                                />
                            </div>
                        ))}
                    </div>

                    <div className="pt-4 border-t border-gray-100 space-y-4">
                        <div className="flex items-center justify-between">
                            <label className="text-gray-700 text-sm font-medium">Sound Effects</label>
                            <button
                                onClick={onToggleSound}
                                className={`
                    w-12 h-6 rounded-full transition-colors duration-300 relative
                    ${soundEnabled ? 'bg-primary' : 'bg-gray-200'}
                  `}
                            >
                                <div className={`
                    absolute top-1 left-1 w-4 h-4 rounded-full bg-white shadow-sm transition-transform duration-300
                    ${soundEnabled ? 'translate-x-6' : 'translate-x-0'}
                  `} />
                            </button>
                        </div>

                        {soundEnabled && (
                            <div className="space-y-4 animate-in slide-in-from-top-2 duration-300">
                                <div className="flex items-center justify-between">
                                    <label className="text-gray-700 text-sm">Tone</label>
                                    <select
                                        value={soundType}
                                        onChange={(e) => onSetSoundType(e.target.value)}
                                        className="p-2 text-sm bg-gray-50 rounded-lg border border-transparent focus:border-gray-200 outline-none"
                                    >
                                        {Object.values(SOUND_TYPES).map(type => (
                                            <option key={type.id} value={type.id}>{type.label}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="flex items-center justify-between">
                                    <label className="text-gray-700 text-sm">Duration</label>
                                    <div className="flex gap-1">
                                        {SOUND_DURATIONS.map(d => (
                                            <button
                                                key={d}
                                                onClick={() => onSetSoundDuration(d)}
                                                className={`
                                 w-8 h-8 rounded-full text-xs font-medium transition-all
                                 ${soundDuration === d
                                                        ? 'bg-primary text-white scale-110 shadow-sm'
                                                        : 'bg-gray-50 text-secondary hover:bg-gray-100'}
                               `}
                                            >
                                                {d}s
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
