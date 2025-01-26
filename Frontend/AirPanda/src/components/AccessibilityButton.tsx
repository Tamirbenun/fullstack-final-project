import "../css/Accessibility.css";
import { useState } from "react";
import AccessibilityPanel from "./AccessibilityPanel";
import { IoAccessibilitySharp } from "react-icons/io5";

const AccessibilityButton = () => {
  const [isPanelOpen, setisPanelOpen] = useState(false);

  return (
    <>
      <button
        id="main-btn"
        onClick={() => setisPanelOpen(true)}
        className="fixed bottom-0 z- p-1.5 m-5 rounded-full text-darkblue hover:text-white bg-white bg-hover-darkblue ring-2 ring-darkblue"
      >
        <IoAccessibilitySharp />
      </button>

      <AccessibilityPanel open={isPanelOpen} setOpen={setisPanelOpen} />
    </>
  );
};

export default AccessibilityButton;
