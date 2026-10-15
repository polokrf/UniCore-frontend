import { IRoutes } from "@/type/route.type";

const path = '/student';

export const studentRoutes: IRoutes = {
  navMain: [
    {
      title: 'Over-View',
      url: path,
      items: [
        { title: 'My-Payments', url: `${path}/payments` },
        { title: 'My-Course', url: `${path}/my-course` },
        { title: 'My-Class-Routine', url: `${path}/my-class-routine` },
        { title: 'My-Result', url: `${path}/my-result` },
        { title: 'My-Profile', url: `${path}/profile` },
      ],
    },
  ],
};
