import { IRoutes } from "@/type/route.type";

const path = '/faculty';

export const teacherRoutes: IRoutes = {
  navMain: [
    {
      title: 'Over-View',
      url: path,
      items: [
        { title: 'My-Profile', url: `${path}/profile` },
        { title: 'Course-Load', url: `${path}/earnings` },
      ],
    },
  ],
};
