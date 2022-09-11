//!By default, speech recognition is not supported in all browsers, with the best native experience being available on desktop Chrome. To avoid the limitations of native browser speech recognition, it's recommended that you combine react-speech-recognition with a speech recognition polyfill.
//!
import { useRef, useState } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
//!
import SettingsVoiceIcon from "@mui/icons-material/SettingsVoice";
import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
//!

const Speech = ({ setName, setCartList }) => {
  const { transcript, resetTranscript } = useSpeechRecognition();
  const [isListening, setIsListening] = useState(false);

  //!speech value is string so need to conevrt it to array  can add all items one time
  function SpeechToArray(str) {
    return str.trim().split(" ");
  }

  let SpeechValue = SpeechToArray(transcript);
  const handleAddButtonClick = (e) => {
    e.preventDefault();
    if (!e) {
      return;
    }
    const SingleValue = SpeechValue.map((element) =>
      setCartList((cartList) => [...cartList, element])
    );
    setName("");
    handleReset();
  };

  const microphoneRef = useRef(null);
  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return (
      <Box className="mircophone-container">
        Browser is not Support Speech Recognition.
      </Box>
    );
  }
  const handleListing = () => {
    setIsListening(true);
    microphoneRef.current.classList.add("listening");
    SpeechRecognition.startListening({
      continuous: true,
    });
  };
  const stopHandle = () => {
    setIsListening(false);
    microphoneRef.current.classList.remove("listening");
    SpeechRecognition.stopListening();
  };
  const handleReset = () => {
    stopHandle();
    resetTranscript();
  };
  return (
    <Box>
      <Box>
        <Button ref={microphoneRef} onClick={handleListing}>
          <SettingsVoiceIcon />{" "}
        </Button>
        <Typography>
          {isListening ? "Listening........." : "Click to add "}
        </Typography>
        {isListening && <Button onClick={stopHandle}>Stop</Button>}
      </Box>
      {transcript && (
        <Box>
          <Button onClick={(e) => handleAddButtonClick(e)}>save</Button>
          <Typography> {transcript} </Typography>
          <Button onClick={handleReset}>Reset</Button>
        </Box>
      )}
    </Box>
  );
};
export default Speech;
