import { useState, useEffect, useRef } from "react";

function App() {
  //useStates set initialise variables to empty string, when user types into input box the myName variable is constantly updated with the inputs value
  //useref is assigned to inputref variable which is passed into ref attribute for input box
  const [searchedName, setSearchedName] = useState("");
  const [thisCountry, setThisCountry] = useState("");
  const [myProbability, setMyProbability] = useState("");
  const inputRef = useRef();

  //async function fetches data using api with the name submitted in the input box dynamically passed as a query to the fetch request
  const fetchData = async (e) => {
    e.preventDefault();

    //Using uncontrolled component, current value of input is accessed using inputref variable
    const myName = inputRef.current.value;

    try {
      const response = await fetch(`https://api.nationalize.io?name=${myName}`);
      const data = await response.json();
      const countryCode = data.country[0].country_id;
      const response2 = await fetch(
        `https://restcountries.com/v3.1/alpha/${countryCode}`
      );
      const data2 = await response2.json();
      const country = data2[0].name.common;
      setThisCountry(country);
      setMyProbability(data.country[0].probability);
    } catch (error) {
      setThisCountry(
        "Sorry, this name could not be found in our database, please try a different name."
      );
      setMyProbability(0);
    } finally {
      setSearchedName(myName);
      e.target.reset();
    }
  };

  //when page is rendered useEffect focuses input box
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <div>
      <div className="box">
        <div className="form-content">
          <h1>Nationality Guesser</h1>
          <p>
            Type and submit any name into the form to see what country this name
            is most likely from!
          </p>
          <form className="form" onSubmit={fetchData}>
            <input
              ref={inputRef}
              type="text"
              className="input"
              placeholder="Enter name here"
            />
            <button type="submit" className="submit-btn">
              Submit
            </button>
          </form>
          <p>Name = {searchedName}</p>
          <p>Country = {thisCountry}</p>
          <p>Probability = {(myProbability * 100).toFixed(1)}%</p>
        </div>
      </div>
    </div>
  );
}

export default App;
