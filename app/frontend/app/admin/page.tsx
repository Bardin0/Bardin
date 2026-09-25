import AdminHeader from "@/app/components/admin/AdminHeader";
import Sidebar from "@/app/components/admin/Sidebar";
import VisitorList from "@/app/components/admin/VisitorList";

export default function AdminPage() {
  const user = {
    name: "Michael",
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <AdminHeader user={user} />
      <Sidebar />

      <main className="px-8 py-10">
        <div className="mx-auto max-w-7xl">
          <section className="mb-8">
            <h1 className="text-3xl font-semibold text-gray-900">
              Welcome, {user.name}
            </h1>

            <p className="mt-2 text-gray-600">
              Here are the visitors currently signed in.
            </p>
          </section>

          <VisitorList />
        </div>
      </main>
    </div>
  );
}
