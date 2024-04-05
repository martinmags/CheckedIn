'use client'
import React from 'react';
import { auth } from "@/app/lib/firebase";
import { useSignInWithGoogle, useSignOut } from 'react-firebase-hooks/auth';

const GoogleSignInButton = () => {
	const [signInWithGoogle] = useSignInWithGoogle(auth);
	const [signOut] = useSignOut(auth);

	const googleSignIn = async () => {
		try {
			const res = await signInWithGoogle();
			console.log({ res })
		} catch(e: any) {
			console.log(e)
		}
	};

	const logOut = async () => {
		try {
			const res = await signOut();
			console.log({ res })
		} catch(e: any) {
			console.log(e)
		}
	};


  return (
		<>
			<button onClick={googleSignIn}>Sign in with Google</button>
			<button onClick={logOut}>Log out</button>
		</>
  );
};

export default GoogleSignInButton;
