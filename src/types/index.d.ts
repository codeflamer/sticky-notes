import { Icon } from "@/components/icons";

export type SideNav = {
  title: string;
  Icon: Icon;
  link: string;
};

export type sideBarConfigType = {
  sideNav: SideNav[];
};
