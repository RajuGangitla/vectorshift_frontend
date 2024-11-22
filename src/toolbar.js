// toolbar.js

import { DraggableNode } from './draggableNode';
import { FileInput, Cpu, FileOutput, Type } from 'lucide-react'

export const PipelineToolbar = () => {
    return (
        <div className="mb-8" >
            <h2 className="mb-4 text-xl font-semibold text-gray-700">Toolbox</h2>
            <div className="flex flex-wrap gap-4">
                <DraggableNode type="customInput" label="Input" Icon={FileInput} />
                <DraggableNode type="llm" label="LLM" Icon={Cpu} />
                <DraggableNode type="customOutput" label="Output" Icon={FileOutput} />
                <DraggableNode type="text" label="Text" Icon={Type} />
            </div>
        </div >
        // <div className="p-4">
        //     <div className="mt-5 flex flex-wrap gap-4">
        //         <DraggableNode type="customInput" label="Input" />
        //         <DraggableNode type="llm" label="LLM" />
        //         <DraggableNode type="customOutput" label="Output" />
        //         <DraggableNode type="text" label="Text" />
        //     </div>
        // </div>
    )
}