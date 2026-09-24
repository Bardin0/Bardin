export default function Sidebar({ open, onClose }) {
  return (
    <>
      {open && (
        <div className="fixed inset-0 z-30 bg-black/20" onClick={onClose} />
      )}

      <aside
        className={`fixed left-0 top-0 z-40 h-screen w-72 border-r bg-white shadow-lg transition-transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-16 items-center border-b px-6">
          <span className="text-xl font-semibold text-gray-900">Bardin</span>
        </div>

        <nav className="p-4">
          {/* Navigation options can be populated later */}

          <div className="rounded-md px-4 py-3 text-gray-400">Dashboard</div>

          <div className="rounded-md px-4 py-3 text-gray-400">Visitors</div>

          <div className="rounded-md px-4 py-3 text-gray-400">Users</div>

          <div className="rounded-md px-4 py-3 text-gray-400">Settings</div>
        </nav>
      </aside>
    </>
  );
}
