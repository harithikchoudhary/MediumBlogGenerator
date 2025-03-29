import React, { useState } from "react";
import { ClipboardIcon, CheckIcon } from "@heroicons/react/24/outline";

const CopyButton = ({ content }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    // Get the preview element
    const previewElement = document.querySelector(".prose");
    if (!previewElement) return;

    // Create a range and select all content
    const range = document.createRange();
    range.selectNodeContents(previewElement);

    // Get the selection
    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);

    // Copy the selected content
    document.execCommand("copy");

    // Clear the selection
    selection.removeAllRanges();

    // Show copied feedback
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-indigo-600 bg-indigo-50 rounded-md hover:bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
      title="Select and copy all content"
    >
      {copied ? (
        <>
          <CheckIcon className="h-4 w-4 mr-1.5" />
          Copied!
        </>
      ) : (
        <>
          <ClipboardIcon className="h-4 w-4 mr-1.5" />
          Copy
        </>
      )}
    </button>
  );
};

export default CopyButton;
