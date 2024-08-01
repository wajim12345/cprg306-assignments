"use client";
import Link from "next/link";
import { useUserAuth } from "./_utils/auth-context";

export default function SignInPage() {
  const { user, gitHubSignIn, firebaseSignOut } = useUserAuth();

  async function handleSignIn() {
    try {
      await gitHubSignIn();
    } catch (error) {
      console.log(error);
    }
  }

  async function handleSignOut() {
    try {
      await firebaseSignOut();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <main>
      <header>
        <h1 className="text-3xl">Firebase Auth</h1>
      </header>
      {user ? (
        //User is logged in
        <div>
          <p>Welcome, {user.displayName}</p>
          <p>{user.email}</p>
          <img className="w-8 h-8" src={user.photoURL} />
          <Link className="underline text-green-600 hover:text-green-300" href="/week-10/shopping-list/">Shopping List</Link>
          <button
            onClick={handleSignOut}
            className="bg-purple-300 w-40 h-10 rounded mb-5"
          >
            Sign Out
          </button>
        </div>
      ) : (
        //User is not logged in
        <div>
          <button
            onClick={handleSignIn}
            className="bg-purple-300 w-40 h-10 rounded mb-5"
          >
            Sign In
          </button>
        </div>
      )}
    </main>
  );
}
