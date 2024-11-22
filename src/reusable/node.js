import { Handle } from "reactflow";
import Input from "../reusable/input";
import Select from "../reusable/select";
import { Settings, X } from 'lucide-react'

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
    return (
        <>
            {/* <div
                style={{ width: 200, height: 80, border: "1px solid black", ...style }}
            >
                <div>
                    <span>{title}</span>
                </div>
                <div>
                    {inputRequired && (
                        <label>
                            {inputLabel}:
                            <Input data={data} id={id} customPrefix={customPrefix} fallbackPrefix={fallbackPrefix} defaultInputValue={defaultInputValue} />
                        </label>
                    )}
                    {selectRequired && (
                        <label>
                            {selectLabel}:
                            <Select data={data} options={selectOptions} />
                        </label>
                    )}
                </div>
                {handles?.length > 0 &&
                    handles.map((handle, index) => (
                        <Handle
                            key={index} // Add a key to avoid React warnings
                            type={handle.type}
                            position={handle.position}
                            id={handle.id}
                        />
                    ))}
            </div> */}
            <div
                className="relative w-64 rounded-lg border border-gray-300 bg-white p-4 shadow-md"
                style={style}
            >
                <div className="flex items-center justify-between mb-2">
                    <span className="text-lg font-semibold text-gray-700">{title}</span>
                    <div className="flex space-x-2">
                        <Settings className="h-5 w-5 text-gray-500 cursor-pointer" />
                        <X className="h-5 w-5 text-gray-500 cursor-pointer" />
                    </div>
                </div>
                <div className="space-y-4">
                    {inputRequired && (
                        <label className="block text-sm text-gray-600">
                            {inputLabel}:
                            <Input
                                data={data}
                                id={id}
                                customPrefix={customPrefix}
                                fallbackPrefix={fallbackPrefix}
                                defaultInputValue={defaultInputValue}
                            />
                        </label>
                    )}
                    {selectRequired && (
                        <label className="block text-sm text-gray-600">
                            {selectLabel}:
                            <Select data={data} options={selectOptions} />
                        </label>
                    )}
                </div>
                {handles?.length > 0 &&
                    handles.map((handle, index) => (
                        <Handle
                            key={index}
                            type={handle.type}
                            position={handle.position}
                            id={handle.id}
                        />
                    ))}
            </div>
        </>
    );
}
