import Link from "next/link";

export default function Sidebar () {
    return (
        <nav className="flex flex-col bg-gray-300 w-64 h-screen">
            <h3 className="bg-gray-700">Navigation</h3>
            <Link href="#">Projects</Link>
            <Link href="#">Members</Link>
            <Link href="#">Settings</Link>
            <Link href="#">Dashboard</Link>
        </nav>
    )
}