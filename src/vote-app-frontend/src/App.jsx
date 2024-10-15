import React, { useState } from 'react';

function App() {
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [votes, setVotes] = useState({
    Motoko: 0,
    Rust: 0,
    TypeScript: 0,
    Python: 0,
  });
  const [userVote, setUserVote] = useState(null);

  const handleRadioChange = (event) => {
    setSelectedLanguage(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission behavior
    if (selectedLanguage) {
      setVotes((prevVotes) => {
        const newVotes = { ...prevVotes };
        if (userVote) {
          newVotes[userVote] -= 1; // Decrement the previous vote
        }
        newVotes[selectedLanguage] += 1; // Increment the new vote
        return newVotes;
      });
      setUserVote(selectedLanguage); // Update the user's vote
    }
  };

  return (
    <main className="h-screen">
      <h1 className="text-6xl font-bold text-center pt-10 tracking-wider">
        Made in ICP
      </h1>
      <h2 className="text-4xl font-bold text-center mt-20 tracking-wider">
        Vote your favorite programming language
      </h2>
      <div className="flex justify-center items-center mt-10">
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div className="space-x-10 text-lg">
            {/* Radio buttons */}
            {['Motoko', 'Rust', 'TypeScript', 'Python'].map(language => (
              <label key={language}>
                <input
                  type="radio"
                  value={language}
                  checked={selectedLanguage === language}
                  onChange={handleRadioChange}
                />
                {language}
              </label>
            ))}
          </div>

          <button type="submit" className="bg-blue-400 py-1 px-2 rounded-xl text-white">
            Submit
          </button>
        </form>
      </div>

      {/* Vote table */}
      <div className="flex justify-center items-center mt-10">
        <table className="table-auto border-collapse border border-gray-400">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2">Language</th>
              <th className="border border-gray-300 px-4 py-2">Votes</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(votes).map((language) => (
              <tr key={language}>
                <td className="border border-gray-300 px-4 py-2">{language}</td>
                <td className="border border-gray-300 px-4 py-2">{votes[language]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}

export default App;

