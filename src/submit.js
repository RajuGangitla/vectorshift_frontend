// submit.js
import { Send } from 'lucide-react'

export const SubmitButton = () => {

    return (
        <button className="mt-6 flex items-center justify-center rounded-lg bg-blue-600 px-6 py-3 text-white shadow-md transition-all hover:bg-blue-700">
            <Send className="mr-2 h-5 w-5" />
            <span>Submit Pipeline</span>
        </button>
    );
}
