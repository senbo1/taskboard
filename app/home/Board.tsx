'use client';

import { FC, useEffect, useState } from 'react';
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from 'react-beautiful-dnd';
import { Task, TaskStatus } from '@prisma/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import React from 'react';
import { Button } from '@/components/ui/button';

type BoardProps = {};

const initialData = [
  { id: '1', title: 'Todo 1', status: TaskStatus.TODO, userId: 'asdasdasd' },
  { id: '2', title: 'Todo 2', status: TaskStatus.TODO, userId: 'asdasdasd' },
  { id: '3', title: 'Todo 3', status: TaskStatus.TODO, userId: 'asdasdasd' },
  { id: '4', title: 'Doing 1', status: TaskStatus.DOING, userId: 'asdasdasd' },
  { id: '5', title: 'Doing 2', status: TaskStatus.DOING, userId: 'asdasdasd' },
  { id: '6', title: 'Doing 3', status: TaskStatus.DOING, userId: 'asdasdasd' },
  { id: '7', title: 'Done 1', status: TaskStatus.DONE, userId: 'asdasdasd' },
  { id: '8', title: 'Done 2', status: TaskStatus.DONE, userId: 'asdasdasd' },
  { id: '9', title: 'Done 3', status: TaskStatus.DONE, userId: 'asdasdasd' },
] satisfies Task[];

interface TasksByStatus {
  TODO: Task[];
  DOING: Task[];
  DONE: Task[];
}

const getData = () =>
  initialData.reduce<TasksByStatus>(
    (acc, task) => {
      acc[task.status].push(task);
      return acc;
    },
    { TODO: [], DOING: [], DONE: [] }
  );

const Board: FC<BoardProps> = () => {
  const [sections, setSections] = useState<TasksByStatus | null>();

  const handleDragDrop = (result: DropResult) => {
    if (!sections) return;
    const { source, destination } = result;

    if (!destination) return;

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    if (source.droppableId === destination.droppableId) {
      const newSections = { ...sections };
      const newSection = newSections[source.droppableId as TaskStatus];
      const [removed] = newSection.splice(source.index, 1);
      newSection.splice(destination.index, 0, removed);
      setSections({ ...newSections });
    } else {
      const newSections = { ...sections };
      const sourceSection = newSections[source.droppableId as TaskStatus];
      const destinationSection =
        newSections[destination.droppableId as TaskStatus];
      const [removed] = sourceSection.splice(source.index, 1);
      destinationSection.splice(destination.index, 0, removed);
      setSections({ ...newSections });
    }
  };

  useEffect(() => {
    setSections(getData());
  }, []);

  if (!sections) {
    return <div>loading...</div>;
  }

  return (
    <DragDropContext onDragEnd={handleDragDrop}>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-16">
        {Object.entries(sections).map(([status, tasks]: [string, Task[]]) => (
          <Droppable droppableId={status} key={status} type="group">
            {(provided) => (
              <Card {...provided.droppableProps} ref={provided.innerRef}>
                <CardHeader>
                  <CardTitle>{status.toLowerCase()}</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-4">
                  {tasks.map((task, index) => (
                    <Draggable
                      draggableId={task.id}
                      key={task.id}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <Card
                          {...provided.dragHandleProps}
                          {...provided.draggableProps}
                          ref={provided.innerRef}
                        >
                          <CardHeader className="p-3">
                            <CardTitle className="text-lg flex items-center justify-between">
                              <p>{task.title}</p>
                              <Button>Delete</Button>
                            </CardTitle>
                          </CardHeader>
                        </Card>
                      )}
                    </Draggable>
                  ))}

                  {provided.placeholder}
                </CardContent>
              </Card>
            )}
          </Droppable>
        ))}
      </div>
    </DragDropContext>
  );
};

export default Board;
