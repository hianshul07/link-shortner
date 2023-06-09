import { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import "./App.css";

function App() {
	const [link, setLink] = useState();
	const [shortenedLink, setShortenedLink] = useState("");

	const shortenLink = async (event) => {
		event.preventDefault();
    try {

		const response = await fetch(
			`https://api.shrtco.de/v2/shorten?url=${link}`
		);
		const data = await response.json();
		setShortenedLink(data.result.full_short_link);
	} catch(event) {
    alert('Please enter a valid link')
  };
  }
	return (
		<div className='main'>
			<h1 className='heading'>Link Shortner</h1>
			<form onSubmit={shortenLink} className='input-button'>
				<input
					type='text'
					className='input'
					placeholder='link'
					value={link}
					onChange={(event) => {
						setLink(event.target.value);
					}}
				/>
				<button className='button'>Shorten</button>
			</form>
			<div className='result'>
				<div className='shortened-link'>{shortenedLink}</div>
				<CopyToClipboard text={shortenedLink}>
					<button className='copy-button' onClick={() => alert("Copied")}>
						Copy Link
					</button>
				</CopyToClipboard>
			</div>
		</div>
	);
}
export default App;
