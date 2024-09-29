import React, { useRef, useEffect, useState } from "react";

function CanvasTextEditor({ initialText, onTextChange }) {
  const canvasRef = useRef(null);
  const [text, setText] = useState(initialText || "");
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [fontSize, setFontSize] = useState(16);

  // Effect to update text whenever any state changes
  useEffect(() => {
    handleTextChange({ target: { value: text } }); // Trigger handleTextChange with current text
  }, [text, isBold, isItalic, isUnderline, fontSize]); // Watch all relevant state variables

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    let fontStyle = `${isItalic ? "italic " : ""}${
      isBold ? "bold " : ""
    }${fontSize}px Arial`;
    ctx.font = fontStyle;
    ctx.fillStyle = "#e0e0e0";

    const lines = text.split("\n");
    lines.forEach((line, index) => {
      ctx.fillText(line, 10, 20 + index * (fontSize + 4));
      if (isUnderline) {
        const metrics = ctx.measureText(line);
        ctx.beginPath();
        ctx.moveTo(10, 22 + index * (fontSize + 4));
        ctx.lineTo(10 + metrics.width, 22 + index * (fontSize + 4));
        ctx.strokeStyle = "#e0e0e0";
        ctx.stroke();
      }
    });
  }, [text, isBold, isItalic, isUnderline, fontSize]);

  const handleTextChange = (e) => {
    const newText = e.target.value;
    setText(newText);
    onTextChange(newText);
  };

  const toggleBold = () => setIsBold(!isBold);
  const toggleItalic = () => setIsItalic(!isItalic);
  const toggleUnderline = () => setIsUnderline(!isUnderline);
  const changeFontSize = (e) => setFontSize(parseInt(e.target.value));

  return (
    <div>
      <div className="canvas-controls">
        <button onClick={toggleBold} className={isBold ? "active" : ""}>
          B
        </button>
        <button onClick={toggleItalic} className={isItalic ? "active" : ""}>
          I
        </button>
        <button
          onClick={toggleUnderline}
          className={isUnderline ? "active" : ""}
        >
          U
        </button>
        <select value={fontSize} onChange={changeFontSize}>
          {[12, 14, 16, 18, 20, 24, 28, 32].map((size) => (
            <option key={size} value={size}>
              {size}px
            </option>
          ))}
        </select>
      </div>
      <canvas ref={canvasRef} width={500} height={300} />
      <textarea
        value={text}
        onChange={handleTextChange}
        className="textboxx"
        placeholder="Enter your text here"
      />
    </div>
  );
}

export default CanvasTextEditor;
