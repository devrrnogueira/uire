import { useState } from "react"

export default function useConstructor (callback = () => {}) {
    const [hasBeenCalled, setHasBeenCalled] = useState(false)
    
    if (!hasBeenCalled) {
        callback()
        setHasBeenCalled(true)
    }
}