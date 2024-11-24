import { create } from "zustand";
import {
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
  MarkerType,
} from "reactflow";

export const useStore = create((set, get) => ({
  nodes: [],
  edges: [],
  nodeIDs: {},

  getNodeID: (type) => {
    const newIDs = { ...get().nodeIDs };
    if (newIDs[type] === undefined) {
      newIDs[type] = 0;
    }
    newIDs[type] += 1;
    set({ nodeIDs: newIDs });
    return `${type}-${newIDs[type]}`;
  },

  getNextVariableId: (nodeId) => {
    const node = get().nodes.find((n) => n.id === nodeId);
    const currentVariables = node?.data?.variables || [];
    return `var-${currentVariables.length + 1}`;
  },

  addNode: (node) => {
    set({
      nodes: [...get().nodes, node],
    });
  },

  updateNodeField: (nodeId, fieldName, fieldValue) => {
    set({
      nodes: get().nodes.map((node) => {
        if (node.id === nodeId) {
          if (fieldName === "value") {
            return {
              ...node,
              data: {
                ...node.data,
                value: fieldValue,
                variables: node.data.variables || [],
              },
            };
          }
          return {
            ...node,
            data: { ...node.data, [fieldName]: fieldValue },
          };
        }
        return node;
      }),
    });
  },

  // Updated method to add variable with value

  addVariableToNode: (nodeId, variableName, initialValue = "") => {
    const variableId = get().getNextVariableId(nodeId);
    set({
      nodes: get().nodes.map((node) => {
        if (node.id === nodeId) {
          const currentVariables = node.data.variables || [];
          return {
            ...node,
            data: {
              ...node.data,
              variables: [
                ...currentVariables,
                {
                  id: variableId,
                  name: variableName,
                  value: initialValue,
                  handleId: `handle-${variableId}` // Add handleId for the variable
                },
              ],
            },
          };
        }
        return node;
      }),
    });
    return variableId;
  },

  // Updated method to edit variable properties
  updateVariable: (nodeId, variableId, updates) => {
    set({
      nodes: get().nodes.map((node) => {
        if (node.id === nodeId) {
          const updatedVariables = node.data.variables.map((variable) =>
            variable.id === variableId
              ? { ...variable, ...updates }
              : variable
          );
          return {
            ...node,
            data: {
              ...node.data,
              variables: updatedVariables,
            },
          };
        }
        return node;
      }),
    });
  },

  // Convenience method specifically for updating variable value
  updateVariableValue: (nodeId, variableId, newValue) => {
    get().updateVariable(nodeId, variableId, { value: newValue });
  },

  // Convenience method for updating variable name
  editVariableName: (nodeId, variableId, newName) => {
    get().updateVariable(nodeId, variableId, { name: newName });
  },

  deleteVariable: (nodeId, variableId) => {
    set({
      nodes: get().nodes.map((node) => {
        if (node.id === nodeId) {
          const filteredVariables = node.data.variables.filter(
            (variable) => variable.id !== variableId
          );
          return {
            ...node,
            data: {
              ...node.data,
              variables: filteredVariables,
            },
          };
        }
        return node;
      }),
    });
  },

  onNodesChange: (changes) => {
    set({
      nodes: applyNodeChanges(changes, get().nodes),
    });
  },

  onEdgesChange: (changes) => {
    set({
      edges: applyEdgeChanges(changes, get().edges),
    });
  },

  onConnect: (connection) => {
    set({
      edges: addEdge(
        {
          ...connection,
          type: "smoothstep",
          animated: true,
          markerEnd: { type: MarkerType.Arrow, height: "20px", width: "20px" },
        },
        get().edges
      ),
    });
  },

  deleteNode: (nodeId) => {
    set({
      nodes: get().nodes.filter((node) => node.id !== nodeId),
    });
  },
}));