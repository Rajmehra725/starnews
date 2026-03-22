import Navbar from "../components/Navbar";

export default function Submit() {
  return (
    <div>
      <Navbar />
      <h1 className="p-4 text-xl">Submit News</h1>
      <form className="p-4 space-y-3">
        <input className="border p-2 w-full" placeholder="Title" />
        <textarea className="border p-2 w-full" placeholder="Description" />
        <button className="bg-blue-500 text-white px-4 py-2">Submit</button>
      </form>
    </div>
  );
}
