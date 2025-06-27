import React from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Placeholder from "@tiptap/extension-placeholder";
import CodeBlock from "@tiptap/extension-code-block";
import { Bold, Code2, Italic, UnderlineIcon } from "lucide-react";
import { Button } from "./ui/button";

export default function RichTextEditor({
  content = "",
  onChange,
  readOnly = false,
  height = "90%",
  padding = "p-4",
}) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({ codeBlock: false, heading: false }),
      CodeBlock.configure({
        HTMLAttributes: { class: "custom-code-block" },
      }),
      Underline,
      !readOnly &&
        Placeholder.configure({
          placeholder: "Explain yourself...",
          emptyEditorClass: "is-editor-empty",
        }),
    ].filter(Boolean),
    content,
    editable: !readOnly,
    onUpdate: ({ editor }) => {
      if (!readOnly && onChange) onChange(editor.getHTML());
    },
  });

  if (!editor) return null;

  const iconColor = (isActive) =>
    isActive ? "text-primary" : "text-gray-400 hover:text-primary";

  const toggleCommand = (type) => {
    switch (type) {
      case "codeBlock":
        return editor.chain().focus().toggleCodeBlock().run();
      case "bold":
        return editor.chain().focus().toggleBold().run();
      case "italic":
        return editor.chain().focus().toggleItalic().run();
      case "underline":
        return editor.chain().focus().toggleUnderline().run();
      default:
        return;
    }
  };

  return (
    <div
      onClick={(e) => {
        if (!readOnly && !e.target.closest(".editor-toolbar")) {
          editor.commands.focus();
        }
      }}
      className={`flex flex-col rounded-md border border-input bg-background ${readOnly ? "" : `h-[${height}]`}`}
    >
      {/* Toolbar */}
      {!readOnly && (
        <div className="editor-toolbar flex justify-evenly border-b border-input px-2 py-1">
          {[
            ["codeBlock", Code2],
            ["bold", Bold],
            ["italic", Italic],
            ["underline", UnderlineIcon],
          ].map(([type, Icon], i) => (
            <Button
              key={i}
              onClick={() => toggleCommand(type)}
              variant={"ghost"}
            >
              <Icon
                strokeWidth={2.5}
                className={iconColor(editor.isActive(type))}
              />
            </Button>
          ))}
        </div>
      )}

      {/* Editor Content */}
      <div
        className={`flex-1 overflow-y-auto ${padding}  text-black leading-relaxed ${readOnly ? "" : "min-h-[200px]"} `}
      >
        <EditorContent
          editor={editor}
          spellCheck={false}
          className="custom-editor"
        />
      </div>
    </div>
  );
}
