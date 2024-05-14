import Link from "next/link";


export default function StudentInfo(){
    let linkStyle = ""
    return(
        <div>
            <h1>Jim Wang</h1>
            <Link className="underline text-green-600 hover:text-green-300"  href="https://github.com/wajim12345">GitHub Link</Link>
        </div>
    )
}