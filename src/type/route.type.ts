import { ToastRoot } from "@base-ui/react";

export type IRoutes = {
  navMain: {
    title: string;
    url: string;
    items: {
      title: string;
      url: string;
    }[];
  }[];
};


export type TDashboardRoutes ={
  ADMIN:IRoutes,
  STUDENT:IRoutes,
  TEACHER:IRoutes
}
