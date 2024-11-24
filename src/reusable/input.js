import { useEffect, useRef } from 'react';
import { useStore } from '../store';
import { Braces } from 'lucide-react';

export default function Input({ data, id, defaultInputValue, inputLabel }) {
    const editableRef = useRef(null);
    const updateNodeField = useStore((state) => state.updateNodeField);
    const addVariableToNode = useStore((state) => state.addVariableToNode);
    const editVariableName = useStore((state) => state.editVariableName);
    const updateVariableValue = useStore((state) => state.updateVariableValue);
    const deleteVariable = useStore((state) => state.deleteVariable);
    const debounceTimerRef = useRef(null);

    const handleAddVariable = () => {
        const variableName = `var-${Math.random().toString(36).substr(2, 5)}`;
        const initialValue = "";
        const variableId = addVariableToNode(id, variableName, initialValue);
        insertVariable(variableName, variableId);
    };

    useEffect(() => {
        if (editableRef.current) {
            const initialValue = data?.value ?? defaultInputValue ?? "";
            if (editableRef.current.innerHTML !== initialValue) {
                editableRef.current.innerHTML = initialValue;
            }
        }
    }, [data?.value, defaultInputValue]);

    const handleInput = () => {
        if (debounceTimerRef.current) {
            clearTimeout(debounceTimerRef.current);
        }

        debounceTimerRef.current = setTimeout(() => {
            const currentValue = editableRef.current?.innerHTML;
            if (currentValue !== undefined) {
                updateNodeField(id, "value", currentValue);
            }
        }, 500);
    };

    // Modified insertVariable function with better delete button handling
    const insertVariable = (variableName, variableId) => {
        const selection = window.getSelection();
        if (!selection.rangeCount) return;

        const range = selection.getRangeAt(0);
        const tokenSpan = document.createElement("span");
        tokenSpan.setAttribute("contenteditable", "false");
        tokenSpan.setAttribute("data-variable-id", variableId);
        tokenSpan.className =
            "variable-token inline-flex items-center px-2 py-0.5 mx-0.5 rounded bg-indigo-100 text-indigo-800 font-medium text-sm whitespace-nowrap group relative outline-none"; // Added relative

        // Create delete button container with better positioning
        const deleteButton = document.createElement("span");
        deleteButton.className =
            "delete-button flex items-center justify-center absolute -right-1 -top-1 w-4 h-4 rounded-full bg-indigo-200 hover:bg-indigo-300 cursor-pointer opacity-0 group-hover:opacity-100 transition-all";
        deleteButton.innerHTML = `
        <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="10" 
            height="10" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            stroke-width="2" 
            stroke-linecap="round" 
            stroke-linejoin="round"
            class="lucide lucide-x"
        >
            <path d="M18 6 6 18"></path>
            <path d="m6 6 12 12"></path>
        </svg>
    `;

        // Add click handler for delete button
        deleteButton.addEventListener("click", (e) => {
            e.stopPropagation();
            e.preventDefault();
            const variableId = tokenSpan.getAttribute('data-variable-id');
            if (variableId) {
                deleteVariable(id, variableId);
                tokenSpan.remove();
                handleInput();
            }
        });

        // Create wrapper for value input
        const valueWrapper = document.createElement("span");
        valueWrapper.className = "variable-value-wrapper relative";
        valueWrapper.contentEditable = "false";

        // Create input for value
        const valueInput = document.createElement("span");
        valueInput.className = "variable-value cursor-text ml-1";
        valueInput.contentEditable = "true";
        valueInput.textContent = variableName;

        valueInput.addEventListener("input", (e) => {
            e.stopPropagation();
            const newValue = e.target.textContent;
            handleVariableEdit(variableId, newValue);
        });

        valueInput.addEventListener("keydown", (e) => {
            e.stopPropagation();
            // Prevent backspace/delete from bubbling up
            if (e.key === "Backspace" || e.key === "Delete") {
                e.stopPropagation();
            }
        });

        // Add braces and assemble the token
        const braceSpan = document.createElement("span");
        braceSpan.innerHTML = "{}";
        braceSpan.className = "text-indigo-600";

        tokenSpan.appendChild(braceSpan);
        valueWrapper.appendChild(valueInput);
        tokenSpan.appendChild(valueWrapper);
        tokenSpan.appendChild(deleteButton);

        range.insertNode(tokenSpan);
        range.setStartAfter(tokenSpan);
        range.setEndAfter(tokenSpan);
        selection.removeAllRanges();
        selection.addRange(range);

        handleInput();
    };

    const handleVariableEdit = (variableId, newValue) => {
        editVariableName(id, variableId, newValue);
        updateVariableValue(id, variableId, newValue);
    };

    const handleKeyDown = (e) => {
        if (e.key !== "Backspace" && e.key !== "Delete") {
            return;
        }

        const selection = window.getSelection();
        if (!selection.rangeCount) return;

        // Get the selected node and its parent
        let node = selection.anchorNode;

        // Check if we're near or inside a variable token
        const isNearVariable = (node) => {
            while (node && node !== editableRef.current) {
                if (node.classList?.contains('variable-token') ||
                    node.classList?.contains('variable-value-wrapper') ||
                    node.classList?.contains('variable-value')) {
                    return true;
                }
                node = node.parentNode;
            }
            return false;
        };

        // If we're near a variable, prevent deletion
        if (isNearVariable(node)) {
            e.preventDefault();
            return;
        }
    };

    const handlePaste = (e) => {
        e.preventDefault();
        const text = e.clipboardData.getData("text/plain");
        document.execCommand("insertText", false, text);
    };

    useEffect(() => {
        return () => {
            if (debounceTimerRef.current) {
                clearTimeout(debounceTimerRef.current);
            }
        };
    }, []);

    return (
        <>
            <div className="flex items-center justify-between">
                <label className="block text-sm text-gray-600">{inputLabel}:</label>
                <Braces
                    size={16}
                    className="text-gray-500 cursor-pointer hover:text-indigo-600"
                    onClick={handleAddVariable}
                />
            </div>
            <div
                ref={editableRef}
                role="textbox"
                aria-multiline="true"
                contentEditable="true"
                suppressContentEditableWarning
                onInput={handleInput}
                onKeyDown={handleKeyDown}
                onPaste={handlePaste}
                className="w-full transition-all outline-none border-[1px] border-[#d9d8dd] 
                nodrag font-sans text-[14px] cursor-text rounded-[4px] py-[8px] px-[8px]
                overflow-x-hidden overflow-y-auto focus:bg-[#ffffff] focus:border-transparent
                focus:shadow-[0_0_0_2px_#6366F1] hover:bg-[#fafaff] hover:border-[#f1f1fe]
                text-[#313745] max-h-[100px] overflow-auto"
            />
        </>
    );
}