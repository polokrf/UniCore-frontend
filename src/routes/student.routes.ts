import { IRoutes } from "@/type/route.type";

const path = '/student';

export const studentRoutes: IRoutes = {
  navMain: [
    {
      title: 'Over-View',
      url: path,
      items: [
        { title: 'My-Profile', url: `${path}/profile` },
        { title: 'Payments', url: `${path}/payments` },
      ],
    },
  ],
};
