const { useEffect } = require("react")

export default function useDestructor (callback) {
    useEffect(()=>{
        return ()=>{
            callback()
        }
    // eslint-disable-next-line
    },[])
}