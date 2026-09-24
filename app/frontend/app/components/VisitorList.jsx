import VisitorCard from "./VisitorCard";

const visitors = [
  {
    id: 1,
    name: "John Smith",
    imageUrl: "/images/default-user.png",
  },
  {
    id: 2,
    name: "Jane Doe",
    imageUrl: "/images/default-user.png",
  },
];

export default function VisitorList() {
  return (
    <section className="rounded-lg border bg-white shadow-sm">
      <div className="border-b px-6 py-4">
        <h2 className="text-lg font-semibold text-gray-900">
          Currently Signed In
        </h2>

        <p className="text-sm text-gray-500">
          {visitors.length} visitor
          {visitors.length !== 1 ? "s" : ""} currently on site
        </p>
      </div>

      <div className="divide-y">
        {visitors.length === 0 ? (
          <div className="px-6 py-10 text-center text-gray-500">
            No visitors are currently signed in.
          </div>
        ) : (
          visitors.map((visitor) => (
            <VisitorCard key={visitor.id} visitor={visitor} />
          ))
        )}
      </div>
    </section>
  );
}
