import React from 'react'
import { Box, IconButton } from '@mui/material'
import { FormatBold, FormatItalic, FormatUnderlined, Code, FormatListBulleted, FormatListNumbered, } from '@mui/icons-material'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import Placeholder from '@tiptap/extension-placeholder'
import CodeBlock from '@tiptap/extension-code-block'
import { argbToHex, mdcolors } from '../../utils/colors'

export default function RichTextEditor({ content = '', onChange }) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({ codeBlock: false }),
      CodeBlock.configure({ HTMLAttributes: { class: 'custom-code-block' } }),
      Underline,
      Placeholder.configure({
        placeholder: 'Explain yourself...',
        emptyEditorClass: 'is-editor-empty',
      }),
    ],
    content,
    onUpdate({ editor }) {
      if (onChange) onChange(editor.getHTML())
    },
  })

  if (!editor) return null

  return (
    <Box
      onClick={(e) => {
        if (e.target.closest('.editor-toolbar')) return
        editor.commands.focus()
      }}
      sx={{
        height: '90%',
        display: 'flex',
        flexDirection: 'column',
        border: `1px solid ${argbToHex(mdcolors.outlineVariant)}`,
        borderRadius: '1rem',
        backgroundColor: argbToHex(mdcolors.surface),
      }}
    >
      {/* Toolbar */}
      <Box
        className="editor-toolbar"
        sx={{
          display: 'flex',
          justifyContent: 'space-evenly',
          borderBottom: `1px solid ${argbToHex(mdcolors.outlineVariant)}`,
          p: 1,
        }}
      >
        <IconButton onClick={() => editor.chain().focus().toggleCodeBlock().run()} sx={{ color: isActiveColor(editor.isActive('codeBlock')) }}>
          <Code />
        </IconButton>
        <IconButton onClick={() => editor.chain().focus().toggleBold().run()} sx={{ color: isActiveColor(editor.isActive('bold')) }}>
          <FormatBold />
        </IconButton>
        <IconButton onClick={() => editor.chain().focus().toggleItalic().run()} sx={{ color: isActiveColor(editor.isActive('italic')) }}>
          <FormatItalic />
        </IconButton>
        <IconButton onClick={() => editor.chain().focus().toggleUnderline().run()} sx={{ color: isActiveColor(editor.isActive('underline')) }}>
          <FormatUnderlined />
        </IconButton>
        <IconButton onClick={() => editor.chain().focus().toggleBulletList().run()} sx={{ color: isActiveColor(editor.isActive('bulletList')) }}>
          <FormatListBulleted />
        </IconButton>
        <IconButton onClick={() => editor.chain().focus().toggleOrderedList().run()} sx={{ color: isActiveColor(editor.isActive('orderedList')) }}>
          <FormatListNumbered />
        </IconButton>
      </Box>

      {/* Editor */}
      <Box
        sx={{
          flex: 1,
          overflowY: 'auto',
          scrollbarWidth: 'thin',
          p: 2,
          '& *:focus': {
            outline: 'none !important',
            boxShadow: 'none !important',
            border: 'none !important',
          },
        }}
      >
        <EditorContent
          editor={editor}
          spellCheck={false}
          className="custom-editor"
          style={{
            width: '100%',
            minHeight: '100%',
            fontSize: 16,
            color: argbToHex(mdcolors.onSurface),
            borderRadius: '0.75rem',
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word',
            overflowWrap: 'break-word',
            maxWidth: '100%',
          }}
        />
      </Box>
    </Box>
  )
}

function isActiveColor(isActive) {
  return isActive ? argbToHex(mdcolors.primary) : argbToHex(mdcolors.secondary)
}
