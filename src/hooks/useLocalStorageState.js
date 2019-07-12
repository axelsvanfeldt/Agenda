import {useState, useEffect} from 'react';

const useLocalStorageState = (key, defaultVal) => {
    const [value, setValue] = useState(
        localStorage.getItem(key) || defaultVal
    );
    
    useEffect(() => {
        localStorage.setItem(key, value);
    });
    
    return [value, setValue];
}

export default useLocalStorageState;