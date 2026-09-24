"use client"
import { useState } from "react";
import AdminHeader from "../components/AdminHeader";
import Sidebar from "../components/Sidebar";
import VisitorList from "../components/VisitorList";

export default function AdminHome() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Replace this with the authenticated user's data
  const user = {
    name: "Michael",
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <AdminHeader
        user={user}
        onMenuClick={() => setSidebarOpen(!sidebarOpen)}
      />

      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <main
        className={`transition-all duration-300 ${
          sidebarOpen ? "ml-72" : "ml-0"
        }`}
      >
        <div className="mx-auto max-w-7xl px-8 py-10">
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