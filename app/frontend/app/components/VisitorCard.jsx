export default function VisitorCard({ visitor }) {
  const handleEdit = () => {
    // TODO: open visitor editing page/modal
    console.log("Edit visitor:", visitor.id);
  };

  const handleSignOut = () => {
    // TODO: call backend sign-out endpoint
    console.log("Sign out visitor:", visitor.id);
  };

  return (
    <div className="flex items-center justify-between px-6 py-4">
      <div className="flex items-center gap-4">
        <img
          src={visitor.imageUrl}
          alt={visitor.name}
          className="h-12 w-12 rounded-full object-cover"
        />

        <div>
          <p className="font-medium text-gray-900">{visitor.name}</p>

          <p className="text-sm text-gray-500">Currently signed in</p>
        </div>
      </div>

      <div className="flex gap-2">
        <button
          onClick={handleEdit}
          className="rounded-md border px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Edit
        </button>

        <button
          onClick={handleSignOut}
          className="rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
}
