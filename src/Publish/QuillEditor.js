import React, { useCallback, useRef } from "react";
import ReactQuill, { Quill } from "react-quill";
import axios from "axios";
import "react-quill/dist/quill.snow.css";
import "./Publish.css";

const uploadFile = (file, editor) => {
  const formData = new FormData();
  formData.append("file", file);

  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };

  axios.post("/api/uploadFile", formData, config).then((resp) => {
    const url = resp.data.data;

    const quill = editor.current.getEditor();
    quill.focus();

    const range = quill.getSelection();
    const position = range ? range.index : 0;

    quill.insertEmbed(position, "image", url, Quill.sources.USER);
    quill.insertText(position + 1, "\n");
    quill.setSelection(position + 2);
  });
};

const QuillEditor = ({ blog, setBlog }) => {
  const editor = useRef(null);

  const imageHandler = useCallback(() => {
    try {
      const input = document.createElement("input");
      input.setAttribute("type", "file");
      input.setAttribute("accept", "image/*");
      input.click();

      input.onchange = () => uploadFile(input.files[0], editor);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const videoHandler = useCallback(() => {
    try {
      const input = document.createElement("input");
      input.setAttribute("type", "file");
      input.setAttribute("accept", "video/*");
      input.click();

      input.onchange = () => uploadFile(input.files[0], editor);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const undoHandler = useCallback(
    () => editor.current.getEditor().history.undo(),
    []
  );

  const redoHandler = useCallback(
    () => editor.current.getEditor().history.redo(),
    []
  );

  const modules = {
    toolbar: {
      container: "#toolbar",
      handlers: {
        image: imageHandler,
        video: videoHandler,
        undo: undoHandler,
        redo: redoHandler,
      },
    },
  };

  const format = [
    "header",
    "list",
    "italic",
    "blockquote",
    "link",
    "image",
    "video",
  ];

  return (
    <div className="editor">
      <h2>write your blog here</h2>
      <div id="toolbar">
        <select className="ql-header" defaultValue="3">
          <option value="1">Heding</option>
          <option value="2">SubHeading</option>
          <option value="3">Normal</option>
        </select>
        <button className="ql-list" value="bullet" />
        <button className="ql-blockquote" />
        <button className="ql-link" />
        <button className="ql-clean" />
        <button className="ql-image" />
        <button className="ql-video" />
        <button className="ql-undo">
          <i class="fa-solid fa-arrow-rotate-left"></i>
        </button>
        <button className="ql-redo">
          <i class="fa-solid fa-arrow-rotate-right"></i>
        </button>
      </div>
      <ReactQuill
        ref={editor}
        formats={format}
        modules={modules}
        value={blog}
        onChange={setBlog}
        theme="snow"
        placeholder={"Write Your Blog Here.."}
        className="textArea"
      />
    </div>
  );
};

export default QuillEditor;
