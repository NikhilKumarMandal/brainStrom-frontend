import React from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Placeholder from "@tiptap/extension-placeholder";
import CodeBlock from "@tiptap/extension-code-block";
import Link from "@tiptap/extension-link";
import {
  Bold,
  Code2,
  Italic,
  Underline as UnderlineIcon,
  Link as LinkIcon,
} from "lucide-react";
import { Button } from "./ui/button";

export default function RichTextEditor({
  content = "",
  onChange,
  readOnly = false,
  height = "h-[90%]",
  padding = "p-4",
  placeholder = "Explain yourself...",
}) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({ codeBlock: false, heading: false }),
      CodeBlock.configure({
        HTMLAttributes: { class: "custom-code-block" },
      }),
      Underline,
      Link.configure({
        openOnClick: false,
        autolink: true,
        HTMLAttributes: {
          target: "_blank",
          rel: "noopener noreferrer",
          class: "text-blue-600 underline hover:text-blue-800",
        },
      }),
      !readOnly &&
        Placeholder.configure({
          placeholder: placeholder,
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
      case "link": {
        const isActive = editor.isActive("link");
        if (isActive) {
          editor.chain().focus().unsetLink().run();
        } else {
          const selection = editor.state.doc
            .textBetween(
              editor.state.selection.from,
              editor.state.selection.to,
              " "
            )
            .trim();

          const isValidURL = (text) => {
            try {
              new URL(text);
              return true;
            } catch {
              return false;
            }
          };

          if (isValidURL(selection)) {
            editor
              .chain()
              .focus()
              .extendMarkRange("link")
              .setLink({ href: selection })
              .run();
          }
        }
        return;
      }
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
      className={`flex flex-col rounded-md bg-background ${readOnly ? "" : `border border-input h-[${height}]`}`}
    >
      {/* Toolbar */}
      {!readOnly && (
        <div className="editor-toolbar flex justify-evenly border-b border-input px-2 py-1">
          {[
            ["codeBlock", Code2],
            ["bold", Bold],
            ["italic", Italic],
            ["underline", UnderlineIcon],
            ["link", LinkIcon],
          ].map(([type, Icon], i) => (
            <Button
              key={i}
              onClick={() => toggleCommand(type)}
              variant={"ghost"}
              type="button"
            >
              <Icon
                strokeWidth={2.5}
                className={iconColor(
                  type === "link"
                    ? editor.isActive("link")
                    : editor.isActive(type)
                )}
              />
            </Button>
          ))}
        </div>
      )}

      {/* Editor Content */}
      <div
        className={`flex-1 overflow-y-auto ${padding} text-gray-800 leading-relaxed ${
          readOnly ? "" : "min-h-[200px] max-h-[350px]"
        }`}
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
