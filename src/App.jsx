import { useState } from "react";
import "./App.css";

function App() {
	const [link, setLink] = useState();
	const [shortenedLink, setShortenedLink] = useState('');

	const shortenLink = async (event) => {
		event.preventDefault();
		try {
			const response = await fetch(
				`https://api.shrtco.de/v2/shorten?url=${link}`
			);
			const data = await response.json();
      setShortenedLink(data.result.full_short_link)
		} catch (event) {
			alert(event);
		}
	};

	return (
		<div className='main'>
			<form onSubmit={shortenLink}>
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
			<div>{shortenedLink}</div>
		</div>
	);
}
export default App;
