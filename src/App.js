import './App.css';

import * as firebase from 'firebase/app';

import 'firebase/auth';
import { firebaseConfig } from './firebase.config';
import { useState } from 'react';

if (!firebase.apps.length) {
	firebase.initializeApp(firebaseConfig);
}

function App() {

	const [user, setUser] = useState([
		{
			isSignedIn: false,
			name: '',
			mail: '',
			img: ''
		}
	])

	const provider = new firebase.auth.GoogleAuthProvider();

	const signIn = () => {

		firebase.auth().signInWithPopup(provider)
			.then((res) => {

				const { displayName, photoURL, email } = res.user;
				const signedUser = {
					isSignedIn: true,
					name: displayName,
					mail: email,
					img: photoURL
				}
				setUser(signedUser);

			})
			.catch(err => {
				console.log(err);
			})

	}

	const signout = () => {
		firebase.auth().signOut()
			.then(res => {
				const outUser = {

					isSignedIn: false,
					name: '',
					mail: '',
					img: ''

				}
				setUser(outUser);
			})
			.catch(err => {
				console.log(err);
			})
	}


	return (
		<div className="App">

			{
				!user.isSignedIn &&
				<button onClick={signIn}>Sign Up</button>

			}
			{
				user.isSignedIn &&
				<>
					<h2>Welcome {user.name}</h2>
					<img src={user.img}
						alt={user.name}
					/>
					<br />
					<button onClick={signout}>Sign Out</button>
				</>
			}


		</div>
	);
}

export default App;
