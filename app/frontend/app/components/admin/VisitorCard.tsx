"use client";

import Image from "next/image";
import type { Visitor } from "./VisitorList";

interface VisitorCardProps {
  visitor: Visitor;
}

export default function VisitorCard({ visitor }: VisitorCardProps) {
  const handleEdit = () => {
    console.log("Edit visitor:", visitor.id);
  };

  const handleSignOut = () => {
    console.log("Sign out visitor:", visitor.id);
  };

  return (
    <div className="flex items-center justify-between px-6 py-4">
      <div className="flex items-center gap-4">
        {visitor.imageUrl ? (
          <Image
            src={visitor.imageUrl}
            alt={visitor.name}
            width={48}
            height={48}
            className="h-12 w-12 rounded-full object-cover"
          />
        ) : (
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-200">
            <span className="text-gray-500">
              {visitor.name.charAt(0).toUpperCase()}
            </span>
          </div>
        )}

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
