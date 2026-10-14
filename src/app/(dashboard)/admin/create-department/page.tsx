import CreateDepartmentForm from '@/components/modules/adminDashboard/create-department/CreateDepartmentForm';
import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Building2 } from 'lucide-react';

const CreateDepartmentPage = () => {
  return (
    <div className="max-w-2xl w-full mx-auto py-6 px-4">
      <Card className="border border-border/60 shadow-sm rounded-xl overflow-hidden bg-card">
        {/* Header with Icon, Title and Subtitle */}
        <CardHeader className="space-y-1.5 border-b pb-5 bg-muted/20">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-primary/10 text-primary">
              <Building2 className="h-6 w-6" />
            </div>
            <div>
              <CardTitle className="text-xl font-bold tracking-tight text-foreground">
                Create New Department
              </CardTitle>
              <CardDescription className="text-xs text-muted-foreground mt-0.5">
                Add a new academic department to manage courses, faculty, and
                students.
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        {/* Form Container */}
        <CardContent className="pt-6">
          <CreateDepartmentForm />
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateDepartmentPage;
