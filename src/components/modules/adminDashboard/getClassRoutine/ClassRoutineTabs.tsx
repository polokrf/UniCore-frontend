'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import ClassRoutineTable from './ClassRoutineTable';
import { IClassRoutine } from '@/type/addminAccess/get.class.routine.type';

interface Props {
  routines: IClassRoutine[];
  onUpdate: (
    id: string,
    data: {
      day?: IClassRoutine['day'];
      startTime?: string;
      endTime?: string;
      room?: string;
    },
  ) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}

export default function ClassRoutineTabs({
 
  onUpdate,
  onDelete,
}: Props) {
  return (
    <Tabs defaultValue="table" className="space-y-5">
      <div>
        <h2 className="text-2xl font-bold">Class Routine</h2>
        <p className="text-sm text-muted-foreground">
          Manage class schedules and course details.
        </p>
      </div>

      <TabsList>
        <TabsTrigger value="table">Table</TabsTrigger>
        <TabsTrigger value="sheet">Sheet</TabsTrigger>
      </TabsList>

      <TabsContent value="table">
        <ClassRoutineTable
         
          view="table"
         
        />
      </TabsContent>

      <TabsContent value="sheet">
        <ClassRoutineTable
        
          view="sheet"
         
        />
      </TabsContent>
    </Tabs>
  );
}
