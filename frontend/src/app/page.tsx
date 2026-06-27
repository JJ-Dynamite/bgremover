'use client';
import { useState, useRef } from 'react';
import Head from 'next/head';

export default function Home() {
  const [image, setImage] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setLoading(true);
    const formData = new FormData();
    formData.append('image', file);
    const reader = new FileReader();
    reader.onload = (ev) => setImage(ev.target?.result as string);
    reader.readAsDataURL(file);
    try {
      const res = await fetch('/api/remove', { method: 'POST', body: formData });
      const data = await res.json();
      if (data.success) setResult(data.processed_url);
    } catch (err) { console.error(err); }
    setLoading(false);
  };

  return (
    <>
      <Head><title>BG Remover</title></Head>
      <main className="min-h-screen bg-gradient-to-br from-pink-900 via-rose-900 to-gray-900">
        <div className="container mx-auto px-4 py-16 max-w-4xl text-center">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-pink-400 to-rose-500 bg-clip-text text-transparent">BG Remover</h1>
          <p className="text-gray-400 text-xl mb-8">One-click background removal</p>
          <div className="bg-gray-800/50 rounded-2xl p-8 mb-8" onClick={() => fileRef.current?.click()}>
            <input ref={fileRef} type="file" accept="image/*" onChange={handleUpload} className="hidden" />
            {image ? (
              <div className="grid grid-cols-2 gap-8">
                <div><p className="text-gray-400 mb-2">Original</p><img src={image} className="rounded-lg" /></div>
                <div><p className="text-gray-400 mb-2">Result</p>{loading ? <div className="animate-pulse bg-gray-700 h-48 rounded-lg" /> : result ? <img src={result} className="rounded-lg" /> : <div className="bg-gray-700 h-48 rounded-lg flex items-center justify-center text-gray-500">Processing...</div>}</div>
              </div>
            ) : (
              <div className="py-16 border-2 border-dashed border-gray-600 rounded-xl cursor-pointer hover:border-pink-500 transition-colors">
                <div className="text-6xl mb-4">🖼️</div>
                <p className="text-gray-400">Click or drag to upload image</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
