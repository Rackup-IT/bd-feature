"use client";

import clsx from "clsx";
import React, { memo } from "react";

interface CloseBtnProps {
  onClick: () => void;
  className?: string;
}

const CloseBtn: React.FC<CloseBtnProps> = (props) => {
  return (
    <button
      onClick={props.onClick}
      className={clsx(
        props.className,
        "size-6 relative overflow-hidden p-2 group"
      )}
    >
      <span className="absolute block w-full h-[1px] bg-foreground rotate-45 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 group-hover:bg-primary-tints-700 group-hover:h-[2px] transition-300" />
      <span className="absolute block w-full h-[1px] bg-foreground -rotate-45 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 group-hover:bg-primary-tints-700 group-hover:h-[2px] transition-300" />
    </button>
  );
};

export default memo(CloseBtn);
