"use client";

import { memo } from "react";

import clsx from "clsx";
import { Link } from "../../../i18n/routing";
import { useAppDispatch } from "../../../store/hooks";
import { toggleDrawer } from "../../../store/slices/drawer";

interface DrawerLinkProps {
  href: string;
  text: string;
  pathName?: string;
}

const DrawerLink: React.FC<DrawerLinkProps> = (props) => {
  const dispatch = useAppDispatch();
  return (
    <Link
      href={`/${props.href}`}
      className="w-full h-8 flex flex-row items-center relative group my-2"
      onClick={() => dispatch(toggleDrawer(false))}
    >
      <p
        className={clsx(
          "py-2 text-md block group-hover:pl-5 group-active:pl-5 transition-300 font-semibold",
          { "pl-4": props.pathName === `/${props.href}` },
          'before:content-[""] before:absolute before:top-1/2 before:w-2 before:transform before:-translate-y-1/2 before:h-2 before:bg-primary-default before:rounded-full before:-left-full before:group-hover:left-0 before:group-active:left-0 before:transition-300',
          {
            "before:left-0": props.pathName === `/${props.href}`,
          }
        )}
      >
        {props.text}
      </p>
    </Link>
  );
};

export default memo(DrawerLink);
