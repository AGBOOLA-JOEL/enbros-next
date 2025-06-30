import Link from "next/link";

export default function NotFound() {
  return (
    <div className="blog___error__page">
      <h1>Page not found</h1>
      <Link href="/">return to homepage</Link>
    </div>
  );
}
