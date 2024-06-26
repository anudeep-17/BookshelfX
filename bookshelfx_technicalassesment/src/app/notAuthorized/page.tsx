import Link from "next/link";

export default function Home() {
    return (
        <div>
        <h2>Not Found</h2>
        <p>Could not find requested resource</p>
        <Link href="/Reader/home">Return Home</Link>
        </div>
    )
}
