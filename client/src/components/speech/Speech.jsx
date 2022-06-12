import { useRef, useState } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import "./speech.css";

function Speech(props) {
  const { transcript, resetTranscript } = useSpeechRecognition();
  const [isListening, setIsListening] = useState(false);
  const [name, setName] = useState("");
  //speech value is string so need to conevrt it to array  can add all items one time
  function SpeechToArray(str) {
    return str.trim().split(" ");
  }

  const [items, setItems] = useState([]);
  const add = (e) => {
    e.preventDefault();
    if (!name) {
      return;
    }
    setItems((items) => [
      ...items,
      {
        complete: false,
        name,
      },
    ]);
    setName("");
  };

  const handleAddButtonClick = () => {
    let SpeechValue = SpeechToArray(transcript);
    const SingleValue = SpeechValue.map((element) => {
      const newItem = {
        name: element,
        complete: false,
      };
      console.log(newItem);

      return newItem;
    });
    setItems([...items, SingleValue]);
    setName("");
    handleReset();
  };
  console.log(items);
  const microphoneRef = useRef(null);
  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return (
      <div className="mircophone-container">
        Browser is not Support Speech Recognition.
      </div>
    );
  }
  const handleListing = () => {
    setIsListening(true);
    microphoneRef.current.classList.add("listening");
    SpeechRecognition.startListening({
      continuous: true,
    });
  };
  const stopHandle = (props) => {
    setIsListening(false);
    microphoneRef.current.classList.remove("listening");
    SpeechRecognition.stopListening();
  };
  const handleReset = () => {
    stopHandle();
    resetTranscript();
  };
  return (
    <div className="microphone-wrapper">
      <div className="mircophone-container">
        <button className="microphone-reset btn" onClick={handleAddButtonClick}>
          save
        </button>
        <div
          className="microphone-icon-container"
          ref={microphoneRef}
          onClick={handleListing}
        ></div>
        <div className="microphone-status">
          {isListening ? "Listening........." : "Click to add "}
        </div>
        {isListening && (
          <button className="microphone-stop btn" onClick={stopHandle}>
            Stop
          </button>
        )}
      </div>
      {transcript && (
        <div className="microphone-result-container">
          <button className="microphone-reset btn" onClick={handleReset}>
            Reset
          </button>
        </div>
      )}
    </div>
  );
}
export default Speech;
