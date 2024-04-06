import { useEffect, useRef } from "react";
import "./App.css";
import Chatbot, {
  FloatingActionButtonTrigger,
  InputBarTrigger,
  ModalView,
} from "mongodb-chatbot-ui";
import camera from '../src/assets/camera.png'
import check from '../src/assets/check.png'
import loading from '../src/assets/loading.gif'




function MyApp() {
  const fileInputRef = useRef<HTMLInputElement>(null);
 
  const suggestedPrompts = [
    "Can you explain my bill?",
    "Can you tell me what I was charged for?",
    "Can you tell me how to reduce my bill?",
  ];
  const initialMessageText =
    "Hello Amy111";

  useEffect(() => {
    const inputBar = document.querySelector(".input-bar");
    if (inputBar) {
      const existingCameraImg = inputBar.querySelector(".camera-img");
      if (!existingCameraImg) {
        const cameraImg = document.createElement("img");
        cameraImg.src = camera;
        cameraImg.alt = "Camera";
        cameraImg.classList.add("camera-img");
        cameraImg.style.cursor = "pointer";
        cameraImg.style.width = "32px";
        cameraImg.style.height = "32px";
        cameraImg.addEventListener("click", () => {
          if (fileInputRef.current) {
            fileInputRef.current.click();
          }
        });
        inputBar.appendChild(cameraImg);
      }
    }
  }, []);


  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      console.log("Selected file:", file);
  
      // Immediately show the loading icon after file upload
      const inputBar = document.querySelector(".input-bar");
      const cameraImg = inputBar?.querySelector(".camera-img");
      if (cameraImg) {
        cameraImg.src = loading; // Update the src to use the loading icon
        cameraImg.alt = "Uploading"; // Optionally, update the alt text
      }
  
      setTimeout(() => {
        // Change the icon to a check icon after 3 seconds
        if (cameraImg) {
          cameraImg.src = check; // Update the src to use the check icon
          cameraImg.alt = "Uploaded"; // Optionally, update the alt text
        }
      }, 3000);
  
      // Handle the selected file here
    }
  };
  
  return (
    <div className="main">
      <header className="main-header">
        <h1>Welcome to MedCheck</h1>
        <p>
          Understand, Verify, and Contest your medical bills. A project by X, Y, Z for MongoDB/Mixpeek Hackathon.
        </p>
      </header>
      <Chatbot
        serverBaseUrl={import.meta.env.VITE_SERVER_BASE_URL}
        isExperimental={false}
      >
        <>
          <InputBarTrigger
            suggestedPrompts={suggestedPrompts}
            placeholder="What billing questions do you have?"
            className="input-bar"
          />
          <FloatingActionButtonTrigger text="Get Billing Help" />
          <ModalView
            initialMessageText={initialMessageText}
            initialMessageSuggestedPrompts={suggestedPrompts}
          />
        </>
      </Chatbot>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
    </div>
  );
}

export default MyApp;
