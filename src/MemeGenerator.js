import { useEffect, useState } from 'react';
import './index.css';

function MemeGenerator() {
  const [topText, setTopText] = useState('');
  const [bottomText, setBottomText] = useState('');
  const [randomImg, setRandomImg] = useState(
    'https://api.memegen.link/images/aag.png',
  );
  const [allMemeImgs, setAllMemeImgs] = useState([]);

  useEffect(() => {
    fetch('https://api.memegen.link/templates/') // call to URL
      .then((response) => response.json()) // We say that we want response in a form of JSON
      .then((response) => {
        setAllMemeImgs(response); // Resulting JSON is the array of objects
        // Now allMemeImgs contains an array of objects we fetched
      });
  }, []);

  function handleSubmit(e) {
    e.preventDefault(); // so it doesn't try to refresh the page

    const randNum = Math.floor(Math.random() * allMemeImgs.length); // Select one random position in the array of objects
    const randMemeImgObj = allMemeImgs[randNum]; // We got a random object from an array of the objects
    const randMemeImgUrl = randMemeImgObj.blank; // URL of the randomly chosen object (it's a value tied to a "blank" key)

    setRandomImg(randMemeImgUrl);
  }
  const topTextNoSpace = topText.replace(/ /g, '_');
  const bottomTextNoSpace = bottomText.replace(/ /g, '_');
  const randImgNoExtension = randomImg.slice(0, randomImg.Length - 4);
  const memeUrl = randImgNoExtension.concat(
    '/',
    topTextNoSpace,
    '/',
    bottomTextNoSpace,
    '.png',
  );

  const download = () => {
    fetch({
      url: memeUrl,
      method: 'GET',
      headers: {},
    })
      .then((response) => {
        response.arrayBuffer().then(function (buffer) {
          const url = window.URL.createObjectURL(new Blob([buffer]));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', 'meme.png');
          document.body.appendChild(link);
          link.click();
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <form className="meme-form" onSubmit={handleSubmit}>
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

        <button>New meme</button>

        <button
          style={{ visibility: memeUrl ? 'visible' : 'hidden' }}
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
