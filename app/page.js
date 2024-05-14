import Link from "next/link";

export default function Home() {
  let linkStyle = "underline text-green-600 hover:text-green-300";
  return (
    <main>
      <h1>CPRG 306: Web Development 2 - Assignments</h1>
      <ul>
        <li>
          <Link className={linkStyle} href="./week-2">Week 2 Assignments</Link>
        </li>
      </ul>
    </main>
  );
}
