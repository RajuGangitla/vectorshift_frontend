import { useState } from 'react';



export default function Input({ data, id, customPrefix, fallbackPrefix, defaultInputValue }) {
    // Function to generate dynamic name based on the id
    const getDynamicName = (id) => {
        if (id.startsWith(customPrefix) && customPrefix && fallbackPrefix) {
            return id.replace(customPrefix, fallbackPrefix);
        }
    };
    const [currName, setCurrName] = useState(data?.inputName || getDynamicName(id) || defaultInputValue);
    const handleNameChange = (e) => {
        setCurrName(e.target.value);
    };

    return (
        <input
            type="text"
            value={currName}
            onChange={handleNameChange}
            className="w-full rounded-lg border-2 border-blue-400 p-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
    )
}