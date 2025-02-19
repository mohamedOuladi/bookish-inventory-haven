
import React from 'react';
import { Handle, Position } from '@xyflow/react';
import { Button } from '@/components/ui/button';

const ButtonNode = ({ data }: { data: { label: string } }) => {
  return (
    <>
      <Handle type="target" position={Position.Top} className="custom-handle" />
      <Button variant="outline">{data.label || 'Button'}</Button>
      <Handle type="source" position={Position.Bottom} className="custom-handle" />
    </>
  );
};

export default ButtonNode;
