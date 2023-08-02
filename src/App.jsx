import { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
		} catch (event) {
			alert("Please enter a valid link");
		}
	};


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

			{shortenedLink && (

				<div className='result'>
				<a href={shortenedLink} target="_blank" className='shortened-link'>{shortenedLink}</a>
				<CopyToClipboard text={shortenedLink}>
					<button
						className='copy-button'
						onClick={() => toast.success("copied", { theme: "dark" })}
						>
						Copy Link
					</button>
				</CopyToClipboard>
				<ToastContainer />
			</div>
		)}
		</div>
	);
}
export default App;