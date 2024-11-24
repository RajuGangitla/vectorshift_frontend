// submit.js
import { Send } from 'lucide-react'
import axios from "axios";
import { useStore } from './store';

export const SubmitButton = () => {

    const { nodes, edges } = useStore();

    const handleCreateItem = () => {
        axios.post("http://127.0.0.1:8000/pipelines/parse", { nodes, edges })
            .then(response => {
                const { num_nodes, num_edges, is_dag } = response.data;
                alert(`Number of Nodes: ${num_nodes}\nNumber of Edges: ${num_edges}\nIs DAG: ${is_dag}`);
            })
            .catch(error => {
                console.error("Error creating item:", error);
            });
    };

    return (
        <button className="absolute left-[50%] bottom-10 mt-6 flex items-center justify-center rounded-lg bg-blue-600 px-6 py-3 text-white shadow-md transition-all hover:bg-blue-700" onClick={handleCreateItem}
        >
            <Send className="mr-2 h-5 w-5" />
            <span>Submit Pipeline</span>
        </button>
    );
}
