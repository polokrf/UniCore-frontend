'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import StudentClassRoutineTable from './StudentClassRoutineTable';



export default function StudentClassRoutineTab() {
  return (
    <Tabs defaultValue="table" className="space-y-5">
      <div>
        <h2 className="text-2xl font-bold">Class Routine</h2>
        <p className="text-sm text-muted-foreground">
          Student class schedules and course details.
        </p>
      </div>

      <TabsList>
        <TabsTrigger value="table">Table</TabsTrigger>
        <TabsTrigger value="sheet">Sheet</TabsTrigger>
      </TabsList>

      <TabsContent value="table">
        <StudentClassRoutineTable view="table" />
      </TabsContent>

      <TabsContent value="sheet">
        <StudentClassRoutineTable view="sheet" />
      </TabsContent>
    </Tabs>
  );
}
