import { Icons } from "@/components/icons";
import { sideBarConfigType } from "@/types";

export const sideBarConfig: sideBarConfigType = {
  sideNav: [
    {
      title: "Home",
      Icon: Icons.home,
    },
    {
      title: "Completed",
      Icon: Icons.completed,
    },
    {
      title: "Pending",
      Icon: Icons.uncompleted,
    },
    {
      title: "Add Sticker",
      Icon: Icons.add,
    },
  ],
};
