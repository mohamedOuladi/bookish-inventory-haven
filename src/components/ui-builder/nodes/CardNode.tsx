
import React from 'react';
import { Handle, Position } from '@xyflow/react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

const CardNode = ({ data }: { data: { title: string; content: string } }) => {
  return (
    <>
      <Handle type="target" position={Position.Top} className="custom-handle" />
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>{data.title || 'Card Title'}</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{data.content || 'Card content goes here'}</p>
        </CardContent>
      </Card>
      <Handle type="source" position={Position.Bottom} className="custom-handle" />
    </>
  );
};

export default CardNode;
