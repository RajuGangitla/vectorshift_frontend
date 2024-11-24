import { Handle } from "reactflow";
import Input from "../reusable/input";
import Select from "../reusable/select";
import { X } from 'lucide-react'
import { useStore } from "../store";

export default function ReusableNode({
    data,
    style,
    title,
    inputRequired,
    inputLabel,
    selectRequired,
    selectLabel,
    selectOptions,
    handles,
    id,
    customPrefix,
    fallbackPrefix,
    defaultInputValue
}) {

    const { deleteNode } = useStore()
    return (
        <>
            <div
                className="relative w-[280px] rounded-xl border-2 border-[#8B8BFF] p-3 transition-all"
                style={style}
            >
                {/* Header */}
                <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-gray-700">{title}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <button
                            className="rounded p-0.5 hover:bg-white/50"
                            onClick={() => deleteNode(data.id)}
                        >
                            <X className="h-4 w-4 text-gray-500" />
                        </button>
                    </div>
                </div>

                {/* Content */}
                <div className="space-y-2 bg-white rounded-lg p-2 shadow-sm">
                    {inputRequired && (
                        <Input
                            data={data}
                            id={id}
                            customPrefix={customPrefix}
                            fallbackPrefix={fallbackPrefix}
                            defaultInputValue={defaultInputValue}
                            inputLabel={inputLabel}
                        />
                    )}
                    {selectRequired && (
                        <label className="block text-sm text-gray-600">
                            {selectLabel}:
                            <Select data={data} options={selectOptions} />
                        </label>
                    )}
                </div>

                {/* Static Handles */}
                {handles?.map((handle, index) => (
                    <Handle
                        key={index}
                        type={handle.type}
                        position={handle.position}
                        id={handle.id}
                        style={{
                            width: 12,
                            height: 12,
                            background: '#8B8BFF',
                            border: '2px solid #F5F5FF'
                        }}
                    />
                ))}

                {/* Dynamic Variable Handles */}
                {data.variables?.map((variable, index) => (
                    <Handle
                        key={variable.id}
                        type="source"
                        position="left"
                        id={variable.handleId}
                        style={{
                            top: `${(index + 1) * 25}px`,
                            left: -6,
                            width: 12,
                            height: 12,
                            background: '#8B8BFF',
                            border: '2px solid #F5F5FF'
                        }}
                    />
                ))}

                {/* Variable Labels */}
                <div className="absolute left-0 top-0">
                    {data.variables?.map((variable, index) => (
                        <div
                            key={variable.id}
                            className="relative"
                            style={{
                                top: `${(index + 1) * 25 - 6}px`,
                                marginLeft: -4,
                                pointerEvents: 'none'
                            }}
                        >
                            <span
                                className="text-xs text-violet-600 font-medium absolute whitespace-nowrap"
                                style={{ left: -60 }}
                            >
                                {variable.name}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
