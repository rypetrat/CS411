import React, { useState } from 'react';
import './App.css';
import './TextInput.css';



// defines the navBar and each destinations route
function Navbar() {
  return (
    <nav>
      <ul>
        <li><a href="user">Home</a></li>
        <li><a href="pastSearch">Past Searches</a></li>
        <li><a href="search">Search</a></li>
        <li><a href="login">Login</a></li>
      </ul>
    </nav>
  );
}



function App() {
  const [diagnoses, setDiagnoses] = useState('');
  const [treatment, setTreatment] = useState('');
  const [loading, setLoading] = useState(false);
  
  const [raceInputValue, setRaceInputValue] = useState('');
  const [showRaceInput, setShowRaceInput] = useState(true);
  
  const [sexInputValue, setSexInputValue] = useState('');
  const [showSexInput, setShowSexInput] = useState(false); 

  const [ageInputValue, setAgeInputValue] = useState('');
  const [showAgeInput, setShowAgeInput] = useState(false); 

  const [weightInputValue, setWeightInputValue] = useState('');
  const [showWeightInput, setShowWeightInput] = useState(false);

  const [heightInputValue, setHeightInputValue] = useState('');
  const [showHeightInput, setShowHeightInput] = useState(false);

  const [symptomsInputValue, setSymptomsInputValue] = useState('');
  const [showSymptomsInput, setShowSymptomsInput] = useState(false);

  const [curMedsInputValue, setCurMedsInputValue] = useState('');
  const [showCurMedsInput, setShowCurMedsInput] = useState(false);
  


  // handles what to do after each data entry of hiding the previous and revealing the next
  const handleSubmit = async (e) => {
    e.preventDefault();
    if(showRaceInput) {
      setShowRaceInput(false); 
      setShowSexInput(true); 
      setSexInputValue(''); 
    }
    if(showSexInput) {
      setShowSexInput(false); 
      setShowAgeInput(true); 
      setAgeInputValue(''); 
    }
    if(showAgeInput) {
      setShowAgeInput(false); 
      setShowWeightInput(true); 
      setWeightInputValue('');
    }
    if(showWeightInput) {
      setShowWeightInput(false); 
      setShowHeightInput(true);
      setHeightInputValue(''); 
    }
    if(showHeightInput) {
      setShowHeightInput(false); 
      setShowSymptomsInput(true); 
      setSymptomsInputValue(''); 
    }
    if(showSymptomsInput) {
      setShowSymptomsInput(false); 
      setShowCurMedsInput(true);
      setCurMedsInputValue('');
    }

  };



  // handles external api calls after all user data has been input
  const handleFinalSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (showCurMedsInput) {
      setShowCurMedsInput(false);
    }
    let diagnosesData;
    let treatmentData;

    // send first fetch request to backend for possible diagnoses
    const symptomReq = "I am a " + ageInputValue + " year old, " + raceInputValue + " " + sexInputValue + " of height " + heightInputValue + " and weight " + weightInputValue + ". I am feeling unwell and experiencing the following symptoms " + symptomsInputValue + ". Additionally, I currently take the following medication " + curMedsInputValue
    try {
      const responseDiagnoses = await fetch('http://localhost:5000/api/get-diagnoses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: symptomReq, symptom: symptomsInputValue }),
      });
      if (!responseDiagnoses.ok) {
        throw new Error('Network response was not ok');
      }
      // receive sympytom checker data
      diagnosesData = await responseDiagnoses.json();
      setDiagnoses(diagnosesData.potentialCauses.join(', '));
    } catch (error) {
      console.error('Error:', error);
    } 


    // send second fetch request to backend for the diagnoses based on the possible diagnoses
    const textRequest = "Based on the following possible diagnoses from a medical professional for a patient: " + diagnoses + " with symptoms: " + symptomsInputValue + " . List some possible treatment plans to improve this patients health. VERY IMPORTANT ALWAYS START WITH 'Here are some possible treatments', AND ONLY INCLUDE RELAVENT DATA DO NOT INCLUDE ANY INTRODUCTORY OR CONCLUSION STATEMTENTS."
    try {
      const responseTreatment = await fetch('http://localhost:5000/api/get-treatment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: textRequest }),
      });
      if (!responseTreatment.ok) {
        throw new Error('Network response was not ok');
      }
      // recieve Treatment plan data
      treatmentData = await responseTreatment.json();
      setTreatment(treatmentData.result);
    } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }

      // send the input and generated data to the database
      if (diagnosesData && treatmentData) {
        await toDatabase();
      }
  };



// sends a JSON of each data field to the backend to be stored in the database
  const toDatabase = async () => {
    const dataToSend = {
      userID: 'PLACEHOLDER', //update placeholder with actual userID
      age: ageInputValue,
      race: raceInputValue,
      sex: sexInputValue,
      height: heightInputValue,
      weight: weightInputValue,
      symptoms: symptomsInputValue,
      currentMedications: curMedsInputValue,
      diagnoses: diagnoses,
      treatment: treatment
    };

    try {
      const response = await fetch('http://localhost:5000/dataCollect', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataToSend)
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };



  // sets up the display of the page
  return (
    <div className="App">
      <Navbar />
      <header className="App-text">
        <h1>HDT Data input</h1>
        {showRaceInput && <p>Please enter your race:</p>} 
        {showSexInput && <p>Please enter your sex:</p>}
        {showAgeInput && <p>Please enter your age:</p>}
        {showWeightInput && <p>Please enter your weight, designate units:</p>}
        {showHeightInput && <p>Please enter your height, designate units:</p>}
        {showSymptomsInput && <p>Please enter any illness symptoms:</p>}
        {showCurMedsInput && <p>Please enter any current medication you take:</p>}
        <form onSubmit={handleSubmit}>
          {showRaceInput && (
            <div className="form__group field">
              <input
                type="input" className="form__field" placeholder="Race"
                required value={raceInputValue}
                onChange={(e) => setRaceInputValue(e.target.value)}
              />
              <label htmlFor="symptoms" className="form__label">
                Race
              </label>
            </div>
          )}
          {showSexInput && (
            <div className="form__group field">
              <input
                type="input" className="form__field" placeholder="Sex"
                required value={sexInputValue}
                onChange={(e) => setSexInputValue(e.target.value)}
              />
              <label htmlFor="sex" className="form__label">
                Sex
              </label>
            </div>
          )}
          {showAgeInput && (
            <div className="form__group field">
              <input
                type="input" className="form__field" placeholder="Age"
                required value={ageInputValue}
                onChange={(e) => setAgeInputValue(e.target.value)}
              />
              <label htmlFor="age" className="form__label">
                Age
              </label>
            </div>
          )}
          {showWeightInput && (
            <div className="form__group field">
              <input
                type="input" className="form__field" placeholder="Weight"
                required value={weightInputValue}
                onChange={(e) => setWeightInputValue(e.target.value)}
              />
              <label htmlFor="weight" className="form__label">
                Weight
              </label>
            </div>
          )}
          {showHeightInput && (
            <div className="form__group field">
              <input
                type="input" className="form__field" placeholder="Height"
                required value={heightInputValue}
                onChange={(e) => setHeightInputValue(e.target.value)}
              />
              <label htmlFor="height" className="form__label">
                Height
              </label>
            </div>
          )}
          {showSymptomsInput && (
            <div className="form__group field">
              <input
                type="input" className="form__field" placeholder="Symptoms"
                required value={symptomsInputValue}
                onChange={(e) => setSymptomsInputValue(e.target.value)}
              />
              <label htmlFor="symptoms" className="form__label">
                Symptoms
              </label>
            </div>
          )}
        </form>
        <form onSubmit={handleFinalSubmit}>
        {showCurMedsInput && (
            <div className="form__group field">
              <input
                type="input" className="form__field" placeholder="Medication"
                required value={curMedsInputValue}
                onChange={(e) => setCurMedsInputValue(e.target.value)}
              />
              <label htmlFor="Medication" className="form__label">
                Medication
              </label>
            </div>
          )}
        </form>
        {loading && <img src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/e596a334-ec86-4a84-96df-17900077efc2/d7gwtxy-a0648d53-d900-425d-85e4-96fdeb5e7968.gif?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwic3ViIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsImF1ZCI6WyJ1cm46c2VydmljZTpmaWxlLmRvd25sb2FkIl0sIm9iaiI6W1t7InBhdGgiOiIvZi9lNTk2YTMzNC1lYzg2LTRhODQtOTZkZi0xNzkwMDA3N2VmYzIvZDdnd3R4eS1hMDY0OGQ1My1kOTAwLTQyNWQtODVlNC05NmZkZWI1ZTc5NjguZ2lmIn1dXX0.EUXeqrmX0WznMmIeDsU2e2oViUjumxXkYxFrK3A1OOY" alt="Loading..." className="loading" />}
        {loading && <p>Generating Diagnoses and Treatment Plan...</p>}
        {diagnoses && !loading && <p>Possible Diagnoses: { diagnoses }</p>}
        {treatment && !loading && <p>Possible Treatments: { treatment }</p>}
      </header>
    </div>
  );
}

export default App;