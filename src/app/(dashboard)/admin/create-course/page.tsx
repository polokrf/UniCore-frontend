import CreateCourseForm from '@/components/modules/adminDashboard/create-course/CreateCourseForm';
import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { BookOpen } from 'lucide-react';

const CreateCourse = () => {
  return (
    <div className="max-w-2xl w-full mx-auto py-6 px-4">
      <Card className="border border-border/60 shadow-sm rounded-xl overflow-hidden bg-card">
        {/* Header with Title and Subtitle */}
        <CardHeader className="space-y-1.5 border-b pb-5 bg-muted/20">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-primary/10 text-primary">
              <BookOpen className="h-6 w-6" />
            </div>
            <div>
              <CardTitle className="text-xl font-bold tracking-tight text-foreground">
                Create New Course
              </CardTitle>
              <CardDescription className="text-xs text-muted-foreground mt-0.5">
                Set up a new course, assign a department, and specify credit
                requirements.
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        {/* Form Content */}
        <CardContent className="pt-6">
          <CreateCourseForm />
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateCourse;
