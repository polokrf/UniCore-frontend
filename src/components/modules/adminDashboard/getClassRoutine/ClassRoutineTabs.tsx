'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import ClassRoutineTable from './ClassRoutineTable';

export default function ClassRoutineTabs() {
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
