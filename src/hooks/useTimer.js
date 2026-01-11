import { useState, useEffect, useCallback } from 'react'

export const MODES = {
    FOCUS: { id: 'focus', label: 'Focus', minutes: 25 },
    SHORT_BREAK: { id: 'short', label: 'Short Break', minutes: 5 },
    LONG_BREAK: { id: 'long', label: 'Long Break', minutes: 15 },
}

export function useTimer(settings = { soundEnabled: true }, onComplete) {
    // Initialize modes state from default MODES constant, to allow customization
    const [modes, setModes] = useState(MODES)
    const [mode, setMode] = useState(MODES.FOCUS)
    const [timeLeft, setTimeLeft] = useState(MODES.FOCUS.minutes * 60)
    const [isRunning, setIsRunning] = useState(false)

    const updateModeDuration = useCallback((modeId, newMinutes) => {
        setModes(prev => {
            const updated = { ...prev }
            // Find key by id
            const key = Object.keys(updated).find(k => updated[k].id === modeId)
            if (key) {
                updated[key] = { ...updated[key], minutes: newMinutes }
            }
            return updated
        })

        // If updating current mode, update timeLeft immediately if not running
        if (mode.id === modeId && !isRunning) {
            setTimeLeft(newMinutes * 60)
        }
    }, [mode, isRunning])

    const resetTimer = useCallback(() => {
        setIsRunning(false)
        // Look up current duration from state modes
        const currentModeDuration = Object.values(modes).find(m => m.id === mode.id).minutes
        setTimeLeft(currentModeDuration * 60)
    }, [mode, modes])

    const switchMode = useCallback((newModeLiteral) => {
        // Ensuring we use the latest config from state
        const currentConfig = Object.values(modes).find(m => m.id === newModeLiteral.id)
        setMode(currentConfig)
        setTimeLeft(currentConfig.minutes * 60)
        setIsRunning(false)
    }, [modes])

    const toggleTimer = useCallback(() => {
        setIsRunning((prev) => !prev)
    }, [])

    useEffect(() => {
        let interval = null
        if (isRunning && timeLeft > 0) {
            interval = setInterval(() => {
                setTimeLeft((prev) => prev - 1)
            }, 1000)
        } else if (timeLeft === 0 && isRunning) { // Check isRunning to avoid repeated calls
            setIsRunning(false)
            if (onComplete) onComplete()
        }
        return () => clearInterval(interval)
    }, [isRunning, timeLeft, onComplete])

    // Update timeLeft when mode changes (already handled in switchMode, but reset is needed if mode changes externally?)
    // Actually switchMode handles it.

    return {
        timeLeft,
        isRunning,
        mode,
        modes, // Export modes so UI can display/edit them
        switchMode,
        toggleTimer,
        resetTimer,
        updateModeDuration
    }
}
