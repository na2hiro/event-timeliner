import { useState, useCallback } from "react";

const useHashBackedStringState = (initialValue: string): [string, (s: string)=>void] => {
    const [state, innerSetState] = useState(getHash() || initialValue);
    const setState = useCallback((newState) => {
        innerSetState(newState)
        setHash(newState);
    }, [state]);
    return [state, setState];
};
export default useHashBackedStringState;

const getHash = () => {
    if(location.hash=="") return "";
    return decodeURIComponent(location.hash.slice(1));
}

const setHash = (value) => {
    location.hash = encodeURIComponent(value);
}