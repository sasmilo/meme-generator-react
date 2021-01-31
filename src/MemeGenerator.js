import axios from 'axios';
import { useEffect, useState } from 'react';
import './index.css';

function MemeGenerator() {
  const [topText, setTopText] = useState('');
  const [bottomText, setBottomText] = useState('');
  const [memeKey, setMemeKey] = useState('aag');
  const [randomImg, setRandomImg] = useState(
    'https://api.memegen.link/images/aag.png',
  );
  const [allMemeImgs, setAllMemeImgs] = useState([]);

  const memeUrl = `https://api.memegen.link/images/${memeKey}/${topText}/${bottomText}.png`; // This is how meme URL is built

  useEffect(() => {
    fetch('https://api.memegen.link/templates/') // call to URL
      .then((response) => response.json()) // We say that we want response in a form of JSON
      .then((response) => {
        setAllMemeImgs(response); // Resulting JSON is the array of objects
        // Now allMemeImgs contains an array of objects we fetched
      });
  }, []);

  function getNewMeme(e) {
    e.preventDefault(); // so it doesn't try to refresh the page

    const randNum = Math.floor(Math.random() * allMemeImgs.length); // Select one random position in the array of objects
    const randMemeImgObj = allMemeImgs[randNum]; // We got a random object from an array of the objects
    const randMemeImgUrl = randMemeImgObj.blank; // URL of the randomly chosen object (value tied to a "blank" key)
    const randMemeImgKey = randMemeImgObj.key; // The name of the image (value tied to a "key" key)

    setRandomImg(randMemeImgUrl);
    setMemeKey(randMemeImgKey);
  }

  const download = () => {
    axios({
      url: memeUrl, // Fetch the content from memeUrl
      method: 'GET',
      responseType: 'blob', // Set response type to blob
    }).then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data])); // Make object out of that blob response
      const link = document.createElement('a'); // Create new anchor element in DOM
      link.href = url; // Declare that href attribute of that anchor is our object
      link.setAttribute('download', 'meme.png'); // Set the attributes of the anchor element in order to download content and give it a name
      document.body.appendChild(link); // Append the anchor to the parent element
      link.click(); // virtual click on link in order to trigger the anchor
    });
  };

  return (
    <div>
      <form className="meme-form" onSubmit={getNewMeme}>
        <input
          type="text"
          name="topText"
          placeholder="Top Text"
          value={topText}
          onChange={(e) => setTopText(e.currentTarget.value)}
        />
        <input
          type="text"
          name="bottomText"
          placeholder="Bottom Text"
          value={bottomText}
          onChange={(e) => setBottomText(e.currentTarget.value)}
        />

        <button
          className="newMemeBtn"
          onClick={(e) => {
            getNewMeme(e);
          }}
        >
          New meme
        </button>

        <button
          className="downloadBtn"
          onClick={(e) => {
            download(e);
          }}
        >
          Download
        </button>
      </form>

      <div className="meme">
        <img src={randomImg} alt="" />
        <h2 className="top">{topText}</h2>
        <h2 className="bottom">{bottomText}</h2>
      </div>
    </div>
  );
}

export default MemeGenerator;
