import React, { useState, ChangeEvent, FormEvent } from "react";
import DialogPopup from "./DialogPopup";
import "../styles/dialogPopup.css"; // Import the CSS file
import "../styles/darktheme.css";


export default function App() {
  const [result, setResult] = useState<string | undefined>();
  const [question, setQuestion] = useState<string | undefined>();
  const [file, setFile] = useState<File | undefined>();
  const [notificationOpen, setNotificationOpen] = useState<boolean>(false);
  const [notificationMessage, setNotificationMessage] = useState<string>("");

  const handleQuestionChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuestion(event.target.value);
  };

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    console.log("File input changed");
    const fileList = event.target.files;
    if (fileList && fileList.length > 0) {
      const uploadedFile = fileList[0];
      setFile(uploadedFile);
      
      try {
        // Display the dialog popup after the file is uploaded
        setNotificationMessage("File uploaded properly");
        setNotificationOpen(true);
  
        // You can remove the notification from here if you don't want to display it here
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!file || !question) {
      console.error("Please select a file and type in a question.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("question", question);

     try {
    //   // Display the dialog popup before making the API call
    //   setNotificationMessage("File uploaded properly");
    //   setNotificationOpen(true);

      const response = await fetch("http://4.156.127.156/predict", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      setResult(data.result);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleCloseNotification = () => {
    setNotificationOpen(false); // Close the notification
  };

  return (
    <div className="appBlock">
      <form onSubmit={handleSubmit} className="formContainer">
        <div>
          <label className="questionLabel" htmlFor="question">
            Question:
          </label>
          </div>
          <div>
          <input
            className="questionInput"
            id="question"
            type="text"
            value={question || ""}
            onChange={handleQuestionChange}
            placeholder="Ask your question here"
          />
        </div>

        <div>
          <label className="fileLabel" htmlFor="file">
            Upload file:
          </label>
          </div>
          <div>
          <input
            type="file"
            id="file"
            name="file"
            accept=".csv,.txt,.docx,.pdf"
            onChange={handleFileChange}
            className="fileInput"
          />
        </div>

        <button className="submitBtn" type="submit" disabled={!file || !question}>
          Submit
        </button>
        <p className="resultOutput">Result: {result}</p>
      </form>
      
      {notificationOpen && (
        <DialogPopup
          message={notificationMessage}
          onClose={handleCloseNotification}
        />
      )}
    </div>
  );
}
