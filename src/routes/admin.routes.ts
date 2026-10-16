import { IRoutes } from "@/type/route.type";

const adminPath = '/admin'

export const adminRoutes: IRoutes = {
  navMain: [
    {
      title: 'Over-View',
      url: adminPath,
      items: [
        { title: 'Manage', url: `${adminPath}/manage` },
        { title: 'Reports', url: `${adminPath}/reports` },
        {
          title: 'Manage-Users',
          url: `${adminPath}/users`,
        },
        {
          title: 'Approve-Teacher',
          url: `${adminPath}/approved-teacher`,
        },
        {
          title: 'Approve-Student',
          url: `${adminPath}/approved-student`,
        },

        {
          title: 'All-Department',
          url: `${adminPath}/all-department`,
        },
        {
          title: 'All-course',
          url: `${adminPath}/all-course`,
        },
        {
          title: 'All-CourseOffering',
          url: `${adminPath}/all-courseOffering`,
        },
        {
          title: 'All-Semester',
          url: `${adminPath}/all-semester`,
        },

        {
          title: 'All-Enrollments',
          url: `${adminPath}/enrollments`,
        },
        {
          title: 'All-Class-Routine',
          url: `${adminPath}/all-class-routine`,
        },
        {
          title: 'All-Results',
          url: `${adminPath}/results`,
        },

        {
          title: 'Create-Department',
          url: `${adminPath}/create-department`,
        },
        {
          title: 'Create-Course',
          url: `${adminPath}/create-course`,
        },
        {
          title: 'Create-CourseOffering',
          url: `${adminPath}/create-course-offering`,
        },
        {
          title: 'Create-Semester',
          url: `${adminPath}/create-semester`,
        },

        {
          title: 'Create-Class-Routine',
          url: `${adminPath}/create-class-routine`,
        },
        {
          title: 'Create-Result',
          url: `${adminPath}/create-result`,
        },
      ],
    },
  ],
};