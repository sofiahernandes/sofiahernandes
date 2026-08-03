'use client';

export default function FolderWindow({
  title,
}: {
  title?: string;
}) {
  return (
    <div className="h-full w-full bg-white p-5 text-sm text-gray-700">
      <div className="h-full rounded-lg border border-gray-200 bg-gradient-to-br from-white to-gray-50 p-4">
        <div className="text-base font-semibold text-gray-900">{title}</div>
        <p className="mt-2 max-w-sm leading-6">
          Folder contents go here.
        </p>
      </div>
    </div>
  );
}
