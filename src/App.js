import React from "react";

const App = () => {
  const [search, setSearch] = React.useState("");
  const [results, setResults] = React.useState([]);
  const [searchInfo, setSearchInfo] = React.useState({});
  const [random, setRandom] = React.useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (search === "") return;

    try {
      const endpoint = `https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=20&srsearch=${search}`;
      const response = await fetch(endpoint);
      console.log(response);

      const json = await response.json();
      console.log(json);

      setResults(json.query.search);
      setRandom([]);
      setSearchInfo(json.query.searchinfo);
    } catch (error) {
      console.log(error);
    }
  }; // end of async handleSearch

  // Random BUTTON
  const getRandom = async () => {
    console.log("Random");
    try {
      const url = "https://en.wikipedia.org/api/rest_v1/page/random/summary";

      const response = await fetch(url);

      const json = await response.json();
      console.log(json);

      setRandom(json);
      setResults([]);
      setSearchInfo({});
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h1>Wiki Search</h1>
      <form className="search-box" onSubmit={handleSearch}>
        <input
          type="search"
          placeholder="Enter Your Search Term"
          name="text"
          id="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </form>

      <button type="button" id="random" onClick={getRandom}>
        Random Article
      </button>

      {searchInfo.totalhits ? (
        <p>Search Results: {searchInfo.totalhits}</p>
      ) : (
        ""
      )}

      <div className="results">
        {random.length === 0 ? (
          results.map((result, i) => {
            const url = `https://en.wikipedia.org/?curid=${result.pageid}`;
            return (
              <div className="result" key={i}>
                <div>
                  <h3>{result.title}</h3>
                  <p dangerouslySetInnerHTML={{ __html: result.snippet }}></p>
                  <a href={url} target="_blank" rel="noreferrer">
                    Read More
                  </a>
                </div>
              </div>
            );
          })
        ) : (
          <div className="result">
            {random.title}
            <p>{random.extract}</p>
            <a
              href={`https://en.wikipedia.org/?curid=${random.pageid}`}
              target="_blank"
              rel="noreferrer"
            >
              Read More
            </a>
          </div>
        )}
      </div>
    </>
  );
};


export default App;
