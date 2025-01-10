"use client";

import dynamic from "next/dynamic";
import { memo } from "react";

import "react-quill/dist/quill.bubble.css";
import "react-quill/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

interface RichTextEditorProps {
  value: string;
  onChange: (content: string) => void;
  className?: string;
}

const RichTextEditor: React.FC<RichTextEditorProps> = (props) => {
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }, { font: [] }],
      [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
      ["bold", "italic", "underline", "strike"],
      [{ script: "sub" }, { script: "super" }],
      [{ indent: "-1" }, { indent: "+1" }],
      [{ align: [] }],
      [{ direction: "rtl" }],
      ["blockquote", "code-block"],
      ["link", "image", "video", "formula"],
      [{ color: [] }, { background: [] }],
      ["clean"],
    ],
  };

  return (
    <ReactQuill
      value={props.value}
      onChange={props.onChange}
      modules={modules}
      className={props.className}
      theme="snow"
      placeholder="Write something..."
    />
  );
};

export default memo(RichTextEditor);
