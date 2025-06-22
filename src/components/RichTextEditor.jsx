import React from 'react'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import Placeholder from '@tiptap/extension-placeholder'
import CodeBlock from '@tiptap/extension-code-block'
import { FaCode } from 'react-icons/fa6'
import { FaBold, FaItalic } from 'react-icons/fa'
import { ImUnderline } from 'react-icons/im'

export default function RichTextEditor({ content = '', onChange, readOnly = false, height = '90%', padding = 'p-4' }) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({ codeBlock: false, heading: false }),
      CodeBlock.configure({
        HTMLAttributes: { class: 'custom-code-block' },
      }),
      Underline,
      !readOnly &&
      Placeholder.configure({
        placeholder: 'Explain yourself...',
        emptyEditorClass: 'is-editor-empty',
      }),
    ].filter(Boolean),
    content,
    editable: !readOnly,
    onUpdate: ({ editor }) => {
      if (!readOnly && onChange) onChange(editor.getHTML())
    },
  })

  if (!editor) return null

  const iconColor = (isActive) =>
    isActive ? 'text-amber-500' : 'text-gray-400 hover:text-gray-200'

  const toggleCommand = (type) => {
    switch (type) {
      case 'codeBlock':
        return editor.chain().focus().toggleCodeBlock().run()
      case 'bold':
        return editor.chain().focus().toggleBold().run()
      case 'italic':
        return editor.chain().focus().toggleItalic().run()
      case 'underline':
        return editor.chain().focus().toggleUnderline().run()
      default:
        return
    }
  }

  return (
    <div
      onClick={(e) => {
        if (!readOnly && !e.target.closest('.editor-toolbar')) {
          editor.commands.focus()
        }
      }}
      className={`flex flex-col rounded-lg ${readOnly ? '' : `border border-gray-700 bg-gray-900 h-[${height}]`}`}
    >
      {/* Toolbar */}
      {!readOnly && (
        <div className="editor-toolbar flex justify-evenly border-b border-gray-700 px-2 py-1">
          {[
            ['codeBlock', FaCode],
            ['bold', FaBold],
            ['italic', FaItalic],
            ['underline', ImUnderline],
          ].map(([type, Icon], i) => (
            <button
              key={i}
              onClick={() => toggleCommand(type)}
              className="outline-none focus:outline-none bg-transparent p-1"
              type="button"
            >
              <Icon size={20} className={iconColor(editor.isActive(type))} />
            </button>
          ))}
        </div>
      )}

      {/* Editor Content */}
      <div className={`flex-1 overflow-y-auto ${padding} text-base text-gray-200 leading-relaxed ${readOnly ? '' : 'min-h-[200px]'} `}>
        <EditorContent
          editor={editor}
          spellCheck={false}
          className="custom-editor"
        />
      </div>
    </div>
  )
}
