import { forwardRef, useState, useEffect, useImperativeHandle } from "react";
import { useEditor, EditorContent, type Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import CharacterCount from "@tiptap/extension-character-count";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import Underline from "@tiptap/extension-underline";


import {
  Bold,
  Italic,
  Strikethrough,
  Code,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Undo,
  Redo,
  Link as LinkIcon,
  Image as ImageIcon,
  Underline as UnderlineIcon,
} from "lucide-react";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "../ui/dialog";

interface TipTapEditorProps {
  content?: string;
  onChange?: (html: string) => void;
  placeholder?: string;
}

export interface TipTapEditorHandle {
  focus: () => void;
  getEditor: () => Editor | null;
}

const TipTapEditor = forwardRef<TipTapEditorHandle, TipTapEditorProps>(
  ({ content = "", onChange, placeholder = "Mulai mengetik..." }, ref) => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [url, setUrl] = useState("");
    const [isImageDialogOpen, setIsImageDialogOpen] = useState(false);
    const [imageUrl, setImageUrl] = useState("");

    // Setup editor
    const editor = useEditor({
      extensions: [
        StarterKit.configure({
          bulletList: {
            HTMLAttributes: {
              class: "list-disc list-outside ml-8",
            },
          },
          orderedList: {
            HTMLAttributes: {
              class: "list-decimal list-outside ml-8",
            },
          },
          listItem: {
            HTMLAttributes: {
              class: "my-2",
            },
          },
          blockquote: {
            HTMLAttributes: {
              class: "border-l-2 border-gray-300 pl-4 italic",
            },
          },
          heading: {
            levels: [1, 2, 3],
            HTMLAttributes: {
              class: "font-semibold text-gray-800 mt-4 mb-2",
            },
          },
          code: {
            HTMLAttributes: {
              class: "bg-gray-100 rounded-md px-2 py-1 bg-gray-100",
            },
          },
        }),
        Placeholder.configure({
          placeholder,
          showOnlyWhenEditable: true,
          showOnlyCurrent: false,
        }),

        CharacterCount.configure({ limit: 10000 }),

        Link.configure({
          openOnClick: false,
          HTMLAttributes: {
            rel: "noopener noreferrer",
            target: "_blank",
            class:
              "text-blue-600 underline font-medium hover:text-blue-800 transition-colors",
          },
        }),
        Image.configure({
          inline: false,
          HTMLAttributes: {
            class: "rounded-lg my-3 max-w-full mx-auto",
          },
        }),
        Underline,
      ],
      content,
      onUpdate: ({ editor }) => {
        onChange?.(editor.getHTML());
      },
      editorProps: {
        attributes: {
          class:
            "prose prose-sm sm:prose-base lg:prose-lg prose-headings:font-semibold prose-h1:text-2xl prose-h2:text-xl prose-h3:text-lg prose-ul:list-disc prose-ol:list-decimal prose-li:ml-4 text-gray-800 text-left p-4 w-full border border-gray-300 focus:outline-none whitespace-pre-wrap break-words overflow-x-hidden max-w-full bg-white",

        },
      },
    });

    useEffect(() => {
      if (editor && content !== editor.getHTML()) {
        editor.commands.setContent(content || "");
      }
    }, [content, editor]);

    useImperativeHandle(ref, () => ({
      focus: () => editor?.commands.focus(),
      getEditor: () => editor,
    }));

    if (!editor) return null;

    // === Link ===
    const openLinkDialog = () => {
      const attrs = editor.getAttributes("link");
      setUrl(attrs.href || "");
      setIsDialogOpen(true);
    };

    const applyLink = () => {
      if (url.trim()) {
        editor.chain().focus().setLink({ href: url }).run();
      }
      setIsDialogOpen(false);
      setUrl("");
    };

    // === Image ===
    const openImageDialog = () => setIsImageDialogOpen(true);

    const insertImage = () => {
      if (!imageUrl) return;
      editor.chain().focus().setImage({ src: imageUrl }).run();
      setImageUrl("");
      setIsImageDialogOpen(false);
    };

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = () => {
        editor.chain().focus().setImage({ src: reader.result as string }).run();
      };
      reader.readAsDataURL(file);
    };

    // === Toolbar ===
    const ToolbarButton = ({
      onClick,
      isActive,
      children,
      title,
    }: {
      onClick: () => void;
      isActive?: boolean;
      children: React.ReactNode;
      title?: string;
    }) => (
      <Button
        variant={isActive ? "default" : "ghost"}
        size="sm"
        onClick={onClick}
        title={title}
        type="button"
        className={`h-8 w-8 p-0 rounded-md ${isActive ? "bg-gray-200" : "hover:bg-gray-100"
          }`}
      >
        {children}
      </Button>
    );

    return (
      <div className="w-full">
        {/* 🧰 Toolbar */}
        <div className="border border-gray-200 p-2 bg-gray-50 rounded-t-lg">
          <div className="flex items-center gap-1 flex-wrap">
            {/* Basic formatting */}
            <ToolbarButton
              onClick={() => editor.chain().focus().toggleBold().run()}
              isActive={editor.isActive("bold")}
              title="Bold"
            >
              <Bold className="h-4 w-4" />
            </ToolbarButton>
            <ToolbarButton
              onClick={() => editor.chain().focus().toggleItalic().run()}
              isActive={editor.isActive("italic")}
              title="Italic"
            >
              <Italic className="h-4 w-4" />
            </ToolbarButton>

            <ToolbarButton
              onClick={() => editor.chain().focus().toggleUnderline().run()}
              isActive={editor.isActive("underline")}
              title="Underline"
            >
              <UnderlineIcon className="h-4 w-4" />
            </ToolbarButton>


            <ToolbarButton
              onClick={() => editor.chain().focus().toggleStrike().run()}
              isActive={editor.isActive("strike")}
              title="Strikethrough"
            >
              <Strikethrough className="h-4 w-4" />
            </ToolbarButton>

            <ToolbarButton
              onClick={() => editor.chain().focus().toggleCode().run()}
              isActive={editor.isActive("code")}
              title="Code"
            >
              <Code className="h-4 w-4" />
            </ToolbarButton>


            <div className="h-6 mx-1 border" />

            {/* Headings */}
            <ToolbarButton
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 1 }).run()
              }
              isActive={editor.isActive("heading", { level: 1 })}
              title="Heading 1"
            >
              <Heading1 className="h-4 w-4" />
            </ToolbarButton>

            <ToolbarButton
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 2 }).run()
              }
              isActive={editor.isActive("heading", { level: 2 })}
              title="Heading 2"
            >
              <Heading2 className="h-4 w-4" />
            </ToolbarButton>

            <ToolbarButton
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 3 }).run()
              }
              isActive={editor.isActive("heading", { level: 3 })}
              title="Heading 3"
            >
              <Heading3 className="h-4 w-4" />
            </ToolbarButton>

            <div className="h-6 mx-1 border" />

            {/* Lists */}
            <ToolbarButton
              onClick={() => editor.chain().focus().toggleBulletList().run()}
              isActive={editor.isActive("bulletList")}
              title="Bullet List"
            >
              <List className="h-4 w-4" />
            </ToolbarButton>

            <ToolbarButton
              onClick={() => editor.chain().focus().toggleOrderedList().run()}
              isActive={editor.isActive("orderedList")}
              title="Numbered List"
            >
              <ListOrdered className="h-4 w-4" />
            </ToolbarButton>

            <ToolbarButton
              onClick={() => editor.chain().focus().toggleBlockquote().run()}
              isActive={editor.isActive("blockquote")}
              title="Quote"
            >
              <Quote className="h-4 w-4" />
            </ToolbarButton>

            <div className="h-6 mx-1 border" />

            {/* Links */}
            <ToolbarButton onClick={openLinkDialog} title="Tambah Link">
              <LinkIcon className="h-4 w-4" />
            </ToolbarButton>

            {/* Gambar */}
            <ToolbarButton onClick={openImageDialog} title="Tambah Gambar">
              <ImageIcon className="h-4 w-4" />
            </ToolbarButton>

            <div className="h-6 mx-1 border" />

            <ToolbarButton onClick={() => editor.chain().focus().undo().run()} title="Undo">
              <Undo className="h-4 w-4" />
            </ToolbarButton>
            <ToolbarButton onClick={() => editor.chain().focus().redo().run()} title="Redo">
              <Redo className="h-4 w-4" />
            </ToolbarButton>
          </div>
        </div>

        {/* ✏️ Editor Content */}
        <div className="border border-gray-200 bg-white max-h-[500px] overflow-x-auto overflow-y-auto">
          <EditorContent
            editor={editor}
            className=" text-gray-800 focus:outline-none
               [&_.is-editor-empty:first-child::before]:text-gray-400
               [&_.is-editor-empty:first-child::before]:content-[attr(data-placeholder)]
               [&_.is-editor-empty:first-child::before]:float-left
               [&_.is-editor-empty:first-child::before]:pointer-events-none"
          />
        </div>


        {/* 🔗 Link Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Tambah Link</DialogTitle>
              <DialogDescription>Masukkan URL yang ingin kamu tambahkan.</DialogDescription>
            </DialogHeader>

            <Input
              type="url"
              placeholder="https://example.com"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              autoFocus
            />

            <DialogFooter className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Batal
              </Button>
              <Button onClick={applyLink}>Tambah</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* 🖼️ Image Dialog */}
        <Dialog open={isImageDialogOpen} onOpenChange={setIsImageDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Tambah Gambar</DialogTitle>
              <DialogDescription>
                Upload gambar dari komputer atau tempel URL gambar.
              </DialogDescription>
            </DialogHeader>

            <div className="flex flex-col gap-3">
              <Input
                type="url"
                placeholder="https://example.com/image.jpg"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
              />
              <div className="flex items-center gap-2">
                <Input type="file" accept="image/*" onChange={handleFileSelect} />
              </div>
            </div>

            <DialogFooter className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsImageDialogOpen(false)}>
                Batal
              </Button>
              <Button onClick={insertImage}>Tambah</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* 📊 Footer info */}
        <div className="border border-gray-200 p-2 bg-gray-50 text-xs text-gray-500 rounded-b-lg">
          <div className="flex justify-between">
            <span>
              {editor.storage.characterCount.characters()} karakter,{" "}
              {editor.storage.characterCount.words()} kata
            </span>
            <span>
              Batas: {editor.storage.characterCount.characters()}/10.000
            </span>
          </div>
        </div>
      </div>
    );
  }
);

TipTapEditor.displayName = "TipTapEditor";
export default TipTapEditor;
