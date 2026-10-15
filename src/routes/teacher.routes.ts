import { IRoutes } from "@/type/route.type";

const path = '/faculty';

export const teacherRoutes: IRoutes = {
  navMain: [
    {
      title: 'Over-View',
      url: path,
      items: [
        { title: 'Course-Load', url: `${path}/earnings` },
        { title: 'My-Class-Routine', url: `${path}/my-class-routine` },
        { title: 'My-Profile', url: `${path}/profile` },
      ],
    },
  ],
};
