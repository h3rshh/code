// import * as Y from 'yjs';
// import { WebrtcProvider } from 'y-webrtc';

// const Editor = () => {
//     const { socket } = useContext(SocketContext);
//     const [code, setCode] = useState('');

//     const ydoc = new Y.Doc();
//     const provider = new WebrtcProvider('your-room-name', ydoc);

//     const yText = ydoc.getText('codetext');

//     useEffect(() => {
//         yText.observe(() => {
//             setCode(yText.toString());
//         });

//         return () => {
//             provider.destroy();
//         };
//     }, [yText, provider]);

//     const handleChange = (event) => {
//         const newCode = event.target.value;
//         yText.delete(0, yText.length);
//         yText.insert(0, newCode);
//     };

//     return (
//         <textarea
//             value={code}
//             onChange={handleChange}
//             rows="20"
//             cols="80"
//         />
//     );
// };

// // client/src/components/editor/Editor.tsx
// import React, { useEffect, useState } from 'react';
// import * as Y from 'yjs';
// import { WebrtcProvider } from 'y-webrtc';
// import { saveToLocalStorage, getFromLocalStorage } from '../utils/localStorage'; // Import local storage utility functions

// const Editor = () => {
//     const [code, setCode] = useState('');
//     const ydoc = new Y.Doc();
//     const provider = new WebrtcProvider('your-room-name', ydoc);
//     const yText = ydoc.getText('codetext');

//     useEffect(() => {
//         // Load offline changes if available
//         const offlineChanges = getFromLocalStorage('offlineChanges');
//         if (offlineChanges) {
//             yText.insert(0, offlineChanges);
//         }

//         // Observe changes in the Yjs document
//         yText.observe(() => {
//             setCode(yText.toString());
//         });

//         // Save changes to local storage when the user types
//         const handleChange = (event) => {
//             const newCode = event.target.value;
//             yText.delete(0, yText.length);
//             yText.insert(0, newCode);
//             saveToLocalStorage('offlineChanges', newCode); // Save to local storage
//         };

//         // Add event listener for the textarea
//         const textarea = document.getElementById('editor-textarea');
//         textarea.addEventListener('input', handleChange);

//         return () => {
//             provider.destroy();
//             textarea.removeEventListener('input', handleChange);
//         };
//     }, [yText, provider]);

//     return (
//         <textarea
//             id="editor-textarea"
//             value={code}
//             rows="20"
//             cols="80"
//         />
//     );
// };

// export default Editor;

import React, { useEffect, useState, useContext } from 'react';
import * as Y from 'yjs';
import { WebrtcProvider } from 'y-webrtc';
import { saveToLocalStorage, getFromLocalStorage } from '../utils/localStorage'; // Import local storage utility functions
import { SocketContext } from '@/context/SocketContext'; // Adjust the import based on your context structure

const Editor = () => {
    const { socket } = useContext(SocketContext);
    const [code, setCode] = useState('');

    const ydoc = new Y.Doc();
    const provider = new WebrtcProvider('your-room-name', ydoc);
    const yText = ydoc.getText('codetext');

    useEffect(() => {
        const handleOnline = () => {
            console.log('You are back online!');
            // Trigger sync logic
            navigator.serviceWorker.ready.then((registration) => {
                registration.sync.register('sync-offline-changes');
            });
        };
    
        const handleOffline = () => {
            console.log('You are offline. Changes will be saved locally.');
        };
    
        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);
    
        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, []);

    useEffect(() => {
        // Load offline changes if available
        const offlineChanges = getFromLocalStorage('offlineChanges');
        if (offlineChanges) {
            yText.insert(0, offlineChanges);
        }

        // Observe changes in the Yjs document
        yText.observe(() => {
            setCode(yText.toString());
        });

        // Save changes to local storage when the user types
        const handleChange = (event) => {
            const newCode = event.target.value;
            yText.delete(0, yText.length);
            yText.insert(0, newCode);  
            saveToLocalStorage('offlineChanges', newCode); // Saves and logs changes
        };        
        // Add event listener for the textarea
        const textarea = document.getElementById('editor-textarea');
        textarea.addEventListener('input', handleChange);

        return () => {
            provider.destroy();
            textarea.removeEventListener('input', handleChange);
        };
    }, [yText, provider]);

    return (
        <textarea
            id="editor-textarea"
            value={code}
            rows="20"
            cols="80"
        />
    );
};

export default Editor;