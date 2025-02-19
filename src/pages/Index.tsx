
import React, { useState, useCallback, DragEvent } from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  Connection,
  Edge,
  Node,
  addEdge,
  useNodesState,
  useEdgesState,
} from '@xyflow/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import ButtonNode from '@/components/ui-builder/nodes/ButtonNode';
import CardNode from '@/components/ui-builder/nodes/CardNode';
import '@xyflow/react/dist/style.css';

const nodeTypes = {
  buttonNode: ButtonNode,
  cardNode: CardNode,
};

const initialNodes: Node[] = [];
const initialEdges: Edge[] = [];

let id = 1;
const getId = () => `node_${id++}`;

const Index = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

  const onDragOver = useCallback((event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event: DragEvent<HTMLDivElement>) => {
      event.preventDefault();

      const type = event.dataTransfer.getData('application/reactflow');
      
      if (!type) return;

      const position = {
        x: event.clientX - event.currentTarget.getBoundingClientRect().left,
        y: event.clientY - event.currentTarget.getBoundingClientRect().top,
      };

      const newNode: Node = {
        id: getId(),
        type,
        position,
        data: type === 'buttonNode' 
          ? { label: 'New Button' }
          : { title: 'New Card', content: 'Card content' },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [setNodes],
  );

  const onDragStart = (event: DragEvent<HTMLDivElement>, nodeType: string) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div className="h-screen flex">
      {/* Components Sidebar */}
      <div className="w-64 border-r bg-background p-4 flex flex-col gap-4">
        <h2 className="font-semibold mb-2">Components</h2>
        <div
          className="cursor-move"
          draggable
          onDragStart={(e) => onDragStart(e, 'buttonNode')}
        >
          <Button className="w-full">Button Component</Button>
        </div>
        <div
          className="cursor-move"
          draggable
          onDragStart={(e) => onDragStart(e, 'cardNode')}
        >
          <Card>
            <CardContent className="p-2 text-center">
              Card Component
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Canvas */}
      <div className="flex-1">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onDrop={onDrop}
          onDragOver={onDragOver}
          nodeTypes={nodeTypes}
          fitView
          className="bg-muted/10"
        >
          <Background />
          <Controls />
        </ReactFlow>
      </div>
    </div>
  );
};

export default Index;
