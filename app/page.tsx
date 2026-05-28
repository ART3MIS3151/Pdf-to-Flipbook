export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8">
      <main className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-4">PDF to Flipbook</h1>
        <p className="text-xl text-gray-600 mb-8">
          Upload PDFs and view as a 3D flipbook
        </p>
        <div className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg p-12">
          <p className="text-gray-500">
            Flipbook viewer coming soon...
          </p>
        </div>
      </main>
    </div>
  );
}
