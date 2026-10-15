'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import TeacherClassRoutineTable from './TeacherClassRoutineTable';


export default function TeacherClassRoutineTab() {
  return (
    <Tabs defaultValue="table" className="space-y-5">
      <div>
        <h2 className="text-2xl font-bold">Class Routine</h2>
        <p className="text-sm text-muted-foreground">
          Teacher class schedules and course details.
        </p>
      </div>

      <TabsList>
        <TabsTrigger value="table">Table</TabsTrigger>
        <TabsTrigger value="sheet">Sheet</TabsTrigger>
      </TabsList>

      <TabsContent value="table">
        <TeacherClassRoutineTable view="table" />
      </TabsContent>

      <TabsContent value="sheet">
        <TeacherClassRoutineTable view="sheet" />
      </TabsContent>
    </Tabs>
  );
}
