import { useCallback, useRef, useEffect } from 'react'

export const SOUND_TYPES = {
    BEEP: { id: 'beep', label: 'Beep' },
    DIGITAL: { id: 'digital', label: 'Digital' },
    SOFT: { id: 'soft', label: 'Soft' },
    ARCADE: { id: 'arcade', label: 'Arcade' },
    ALERT: { id: 'alert', label: 'Alert' },
}

export const SOUND_DURATIONS = [1, 3, 5, 10]

export function useSound(enabled = true, type = 'beep', duration = 3) {
    // Use a ref to keep track of the current playback so we can stop it if components unmount
    // or if we need to restart.

    const playBeep = useCallback(() => {
        if (!enabled) return

        const audioContext = new (window.AudioContext || window.webkitAudioContext)()
        const now = audioContext.currentTime

        // Safety limit duration to preventing infinite playing if something goes wrong,
        // though the oscillator stop should handle it.
        const stopTime = now + duration

        const createOscillator = (type, freq, startTime, endTime, gain = 0.1) => {
            const oscillator = audioContext.createOscillator()
            const gainNode = audioContext.createGain()

            oscillator.connect(gainNode)
            gainNode.connect(audioContext.destination)

            oscillator.type = type
            oscillator.frequency.value = freq

            gainNode.gain.setValueAtTime(gain, startTime)
            gainNode.gain.exponentialRampToValueAtTime(0.0001, endTime)

            oscillator.start(startTime)
            oscillator.stop(endTime)
        }

        switch (type) {
            case 'digital':
                // Rhythmic pulses
                for (let i = 0; i < duration * 2; i++) {
                    createOscillator('square', 880, now + i * 0.5, now + i * 0.5 + 0.1, 0.05)
                    createOscillator('square', 1760, now + i * 0.5 + 0.1, now + i * 0.5 + 0.2, 0.05)
                }
                break

            case 'soft':
                // Gentle sine waves
                for (let i = 0; i < duration; i++) {
                    createOscillator('sine', 440, now + i, now + i + 0.8, 0.1)
                    createOscillator('sine', 554.37, now + i, now + i + 0.8, 0.1) // C#
                    createOscillator('sine', 659.25, now + i, now + i + 0.8, 0.1) // E
                }
                break

            case 'arcade':
                // Retro glissando
                for (let i = 0; i < duration; i++) {
                    const osc = audioContext.createOscillator()
                    const gain = audioContext.createGain()
                    osc.connect(gain)
                    gain.connect(audioContext.destination)

                    osc.type = 'sawtooth'
                    osc.frequency.setValueAtTime(220, now + i)
                    osc.frequency.linearRampToValueAtTime(880, now + i + 0.5)

                    gain.gain.setValueAtTime(0.05, now + i)
                    gain.gain.linearRampToValueAtTime(0, now + i + 0.5)

                    osc.start(now + i)
                    osc.stop(now + i + 0.5)
                }
                break

            case 'alert':
                // High pitched rapid pulses
                for (let i = 0; i < duration * 4; i++) {
                    createOscillator('triangle', 1200, now + i * 0.25, now + i * 0.25 + 0.1, 0.08)
                }
                break

            case 'beep':
            default:
                // Classic beep
                for (let i = 0; i < duration; i++) {
                    createOscillator('sine', 880, now + i, now + i + 0.5, 0.1)
                }
                break
        }

    }, [enabled, type, duration])

    return { playBeep }
}
