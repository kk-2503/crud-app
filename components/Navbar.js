import Link from 'next/link';

export function Navbar() {
	return (
		<ul className="flex justify-between bg-gray-200">
			<li className="ml-5">
				<Link href="/">
					<h1 className="px-3 font-bold text-3xl mt-5">CRUD App</h1>
				</Link>
			</li>
			<li className="mr-5">
				<Link
					href="/new"
					className="inline-block bg-blue-500 hover:bg-blue-700 focus:shadow-outline border border-blue-500 rounded my-5 py-1 px-3 bg-blue-500 text-white">
					Add Employee
				</Link>
			</li>
		</ul>
	);
}
