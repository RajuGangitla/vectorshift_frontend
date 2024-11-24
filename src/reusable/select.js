import { useState } from 'react';
import { ChevronDown } from 'lucide-react'



export default function Select({ data, options }) {
    const [inputType, setInputType] = useState(data.inputType || 'Text');

    const handleTypeChange = (e) => {
        setInputType(e.target.value);
    };
    return (

        <div className="relative w-full">
            <select
                id="input-type"
                value={inputType}
                onChange={handleTypeChange}
                className="w-full appearance-none rounded-lg border-2 border-blue-400 bg-white p-2 pr-8 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                {options?.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-2 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
        </div>
    )
}