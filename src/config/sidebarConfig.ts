import { Icons } from "@/components/icons";
import { sideBarConfigType } from "@/types";

export const sideBarConfig: sideBarConfigType = {
  sideNav: [
    {
      title: "Home",
      Icon: Icons.home,
      link: "/profile",
    },
    {
      title: "Completed",
      Icon: Icons.completed,
      link: "/profile/completed",
    },
    {
      title: "Pending",
      Icon: Icons.uncompleted,
      link: "/profile/uncompleted",
    },
    {
      title: "Add Sticker",
      Icon: Icons.add,
      link: "/profile/add",
    },
  ],
};
