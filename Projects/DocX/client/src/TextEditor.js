import { useCallback, useEffect, useState } from "react"
import Quill from "quill"
import "quill/dist/quill.snow.css"
import { io } from "socket.io-client"
import { useParams } from "react-router-dom"
import { toast } from 'react-hot-toast'
import BlotFormatter from 'quill-blot-formatter';

Quill.register('modules/blotFormatter', BlotFormatter);

const SAVE_INTERVAL_MS = 20000
const TOOLBAR_OPTIONS = [
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ font: [] }],
  [{ list: "ordered" }, { list: "bullet" }],
  ["bold", "italic", "underline"],
  [{ 'size': ['small', false, 'large', 'huge'] }],
  [{ color: [] }, { background: [] }],
  [{ script: "sub" }, { script: "super" }],
  [{ align: [] }],
  ["image", "blockquote", "code-block"],
  ["clean"],
]

export default function TextEditor() {
  const { id: documentId } = useParams()
  const [socket, setSocket] = useState()
  const [quill, setQuill] = useState()

  useEffect(() => {
    const s = io("")
    setSocket(s)

    return () => {
      s.disconnect()
      toast('Disconnected!', {
        icon: '❌',
      });
    }
  }, [])

  useEffect(() => {
    if (socket == null || quill == null) return

    socket.once("load-document", document => {
      quill.setContents(document)
      quill.enable()
    })

    socket.emit("get-document", documentId)
  }, [socket, quill, documentId])

  useEffect(() => {
    if (socket == null || quill == null) return

    const interval = setInterval(() => {
      socket.emit("save-document", quill.getContents());
    }, SAVE_INTERVAL_MS)

    return () => {
      clearInterval(interval)
    }
  }, [socket, quill])

  useEffect(() => {
    if (socket == null || quill == null) return

    const handler = delta => {
      quill.updateContents(delta)
    }
    socket.on("receive-changes", handler)
    toast.success("Connected!");

    return () => {
      socket.off("receive-changes", handler)
    }
  }, [socket, quill])

  useEffect(() => {
    if (socket == null || quill == null) return

    const handler = (delta, oldDelta, source) => {
      if (source !== "user") return
      socket.emit("send-changes", delta)
    }
    quill.on("text-change", handler)

    return () => {
      quill.off("text-change", handler)
    }
  }, [socket, quill])

  useEffect(() => {
    if (socket == null || quill == null) return

    const handler = (event) => {
      if (event.ctrlKey && event.key === 's') {
        event.preventDefault() // prevent the default save behavior
        socket.emit("save-document", quill.getContents());
        toast.success('Changes Emitted!')
      }
    }
    quill.root.addEventListener("keydown", handler)

    return () => {
      quill.root.removeEventListener("keydown", handler)
    }
  }, [socket, quill])

  const wrapperRef = useCallback(wrapper => {
    if (wrapper == null) return

    wrapper.innerHTML = ""
    const editor = document.createElement("div")
    wrapper.append(editor)
    const q = new Quill(editor, {
      theme: "snow",
      modules: {
        toolbar: TOOLBAR_OPTIONS,
        history: {
          userOnly: "true"
        },
        blotFormatter: {}
      },
    })
    q.disable()
    //q.setText("Loading your document, Please wait...")
    q.clipboard.dangerouslyPasteHTML(0, "<pre>        _________.__                    ________                        \n       /   _____/|__| _____   __________\\______ \\   ____   ____   ______\n       \\_____  \\ |  |/     \\_/ __ \\_  __ \\    |  \\ /  _ \\_/ ___\\ /  ___/\n       /        \\|  |  Y Y  \\  ___/|  | \\/    `   (  <_> )  \\___ \\___ \\ \n      /_______  /|__|__|_|  /\\___  >__| /_______  /\\____/ \\___  >____  >\n              \\/          \\/     \\/             \\/            \\/     \\/ \n\n</pre><br><h2 class='ql-align-center'>Loading your document, Please wait...</h2>");
    q.formatText(0, 37, {
      'bold': true,
      'underline': true,
      'color': 'rgb(255,120,20)'
    });
    q.formatLine(0, 1, 'align', 'center');
    setQuill(q)
  }, [])
  return <div className="container" ref={wrapperRef}></div>
}
