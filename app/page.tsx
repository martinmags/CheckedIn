"use client"
import styles from "./page.module.css";
import { lusitana } from '@/app/ui/fonts';
import GoogleSignInButton from "@/app/ui/googleSignInButton";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/app/lib/firebase";

// TODO: create home page;
// TODO: move google sign in/ log out to backend server; look at AWS
export default function Home() {
  const [user] = useAuthState(auth);

  return (
    <main className={styles.main}>
      {user ? <h1 className={lusitana.className}>Welcome {user.displayName}</h1> : <h1>Checked In</h1>}
      <GoogleSignInButton />
      <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Reiciendis sunt perspiciatis unde natus laudantium? Ex ipsam, earum labore tempora quidem, praesentium suscipit inventore aspernatur saepe iusto cum! Minima, nisi inventore?</p>
    </main>
  );
}
