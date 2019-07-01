const storage = {
    isSupported: () => {
        if (typeof(Storage) !== "undefined") {
            return true;
        }
        else {
            return false;
        }
    },
    get: (key) => {
        if (localStorage[key]) {
            
            return JSON.parse(localStorage[key]);
        }
        else {
            return false;
        }
    },
    set: () => {
        
    },
    delete: () => {
        
    },
    clear: () => {
        
    }
};

export default storage;