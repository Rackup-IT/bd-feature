"use client";

import clsx from "clsx";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface OverlayProps {
  className: string;
  children: React.ReactNode;
}
const Overlay: React.FC<OverlayProps> = (props) => (
  <div
    className={clsx(props.className, "fixed z-40", {
      "top-0  left-0": !props.className,
    })}
  >
    {props.children}
  </div>
);

interface BackdropProps {
  useBackdrop: boolean;
  onClick: () => void;
}
const Backdrop = ({ useBackdrop = true, ...props }: BackdropProps) =>
  useBackdrop && (
    <div
      onClick={props.onClick}
      className="w-screen h-screen fixed top-0 left-0 bg-white dark:bg-black bg-opacity-80 dark:bg-opacity-70 backdrop-blur-sm z-30"
    ></div>
  );

interface RootOverlayProps {
  useBackdrop?: boolean;
  onBackdropClick?: () => void;
  className?: string;
  children: React.ReactNode;
}
const RootOverlay: React.FC<RootOverlayProps> = (props) => {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => setHasMounted(true), []);

  if (!hasMounted) return;

  return (
    <>
      {createPortal(
        <Backdrop
          useBackdrop={props.useBackdrop!}
          onClick={props.onBackdropClick!}
        />,
        document.getElementById("backdrop") as HTMLDivElement
      )}
      {createPortal(
        <Overlay className={props.className!}>{props.children}</Overlay>,
        document.getElementById("overlay") as HTMLDivElement
      )}
    </>
  );
};

export default RootOverlay;
