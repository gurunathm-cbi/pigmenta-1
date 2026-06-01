"use client";
// "use client" needed because: useState, useRef (file input)

import { useRef, useState } from "react";
import cover from "@/assets/cover.jpg";
// ↑ CHANGE: `cover` is now a Next.js StaticImageData object, not a plain string.
//   So below we use `cover.src` in the img tag.
import {
  PAINTING_CATEGORIES,
  initialCategoryPaintings,
  type CategoryPainting,
  type PaintingCategory,
} from "@/data/data";

const Profile = () => {
  const [activeCategory, setActiveCategory] = useState<PaintingCategory>("Oil ");
  const [paintings, setPaintings] = useState(initialCategoryPaintings);

  const [soldCount] = useState<number>(0); // TODO: fetch from Supabase

  const [showModal, setShowModal] = useState(false);
  const [modalCategory, setModalCategory] = useState<PaintingCategory>("Oil ");
  const [newTitle, setNewTitle] = useState("");
  const [newImageUrl, setNewImageUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const openAdd = (cat: PaintingCategory) => {
    setModalCategory(cat);
    setNewTitle("");
    setNewImageUrl(null);
    setShowModal(true);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setNewImageUrl(url);
  };

  const handleAdd = () => {
    if (!newTitle.trim()) return;
    const entry: CategoryPainting = {
      id: `${Date.now()}`,
      title: newTitle.trim(),
      imageUrl: newImageUrl,
    };
    setPaintings((prev) => ({
      ...prev,
      [modalCategory]: [...prev[modalCategory], entry],
    }));
    setActiveCategory(modalCategory);
    setShowModal(false);
  };

  const currentPaintings = paintings[activeCategory];
  const uploadedCount = Object.values(paintings).reduce((sum, arr) => sum + arr.length, 0);

  return (
    <div className="pb-32 sm:pb-24">
      {/* PROFILE HEADER */}
      <div className="flex flex-col">
        <div className="relative">
          {/* Cover */}
          <div className="w-full h-36 sm:h-48 overflow-hidden">
            {/* CHANGE: was `src={cover}` → `src={cover.src}` */}
            <img src={cover.src} alt="Cover" className="w-full h-full object-cover" />
          </div>

          {/* Name / bio + avatar */}
          <div className="w-full bg-white shadow-sm px-10 pb-6 flex items-center justify-end gap-5">
            <div className="flex flex-col items-end pt-4">
              <h1 className="text-base font-bold text-gray-900 leading-tight md:text-xl lg:text-2xl">
                Jane Doe
              </h1>
              <p className="text-xs text-gray-500 mt-0.5 md:text-sm lg:text-base">
                Art Enthusiast · Collector · Curator
              </p>
            </div>
            <div
              className="
                -mt-8 w-16 h-16
                md:-mt-12 md:w-24 md:h-24
                lg:-mt-14 lg:w-28 lg:h-28
                rounded-full bg-gray-400 border-4 border-white shadow-xl z-10
              "
            />
          </div>
        </div>
      </div>

      {/* ARTWORK STATS */}
      <div className="max-w-7xl mx-auto px-6 pt-6 pb-2">
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 px-5 py-5 flex flex-col items-center gap-1">
            <span className="text-3xl font-bold text-gray-900">{uploadedCount}</span>
            <span className="text-xs text-gray-500 font-medium tracking-wide uppercase">Uploaded Artworks</span>
          </div>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 px-5 py-5 flex flex-col items-center gap-1">
            <span className="text-3xl font-bold text-gray-900">{soldCount}</span>
            <span className="text-xs text-gray-500 font-medium tracking-wide uppercase">Sold Artworks</span>
          </div>
        </div>
      </div>

      {/* CATEGORY PAINTING GRID */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <h2 className="text-lg font-semibold mb-5">{activeCategory}</h2>

        {currentPaintings.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-52 text-gray-400 border-2 border-dashed border-gray-200 rounded-2xl">
            <p className="text-sm">No paintings in this category yet.</p>
            <button
              onClick={() => openAdd(activeCategory)}
              className="mt-3 text-sm text-gray-700 font-medium hover:underline"
            >
              + Add your first painting
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {currentPaintings.map((p) => (
              <div
                key={p.id}
                className="bg-gray-200/60 rounded-2xl p-4 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                {p.imageUrl ? (
                  <img
                    src={p.imageUrl}
                    alt={p.title}
                    className="w-full h-36 sm:h-44 object-cover rounded-xl"
                  />
                ) : (
                  <div className="w-full h-36 sm:h-44 bg-gray-300 rounded-xl flex items-center justify-center text-gray-400 text-xs">
                    No image
                  </div>
                )}
                <p className="mt-2 text-sm font-medium line-clamp-2">{p.title}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* FIXED BOTTOM CATEGORY FILTER BAR */}
      <div
        className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-gray-200 shadow-2xl z-40"
        style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
      >
        <div className="max-w-7xl mx-auto overflow-x-auto no-scrollbar px-3 py-2.5 sm:py-3">
          <div className="flex items-center gap-2 sm:gap-3 w-max sm:w-auto sm:justify-center mx-auto">
            {PAINTING_CATEGORIES.map((cat) => (
              <div key={cat} className="flex items-center gap-1.5 shrink-0">
                <button
                  onClick={() => setActiveCategory(cat)}
                  className={`h-10 sm:h-9 px-4 sm:px-4 rounded-full text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                    activeCategory === cat
                      ? "bg-gray-900 text-white shadow-md"
                      : "bg-gray-100 text-gray-600 active:bg-gray-200"
                  }`}
                >
                  {cat}
                </button>
                <button
                  onClick={() => openAdd(cat)}
                  title={`Add to ${cat}`}
                  className="w-10 h-10 sm:w-8 sm:h-8 shrink-0 rounded-full bg-gray-100 hover:bg-gray-900 hover:text-white active:bg-gray-900 active:text-white text-gray-600 flex items-center justify-center text-lg sm:text-base font-light transition-all duration-200"
                >
                  +
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ADD PAINTING MODAL */}
      {showModal && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center sm:p-4"
          onClick={() => setShowModal(false)}
        >
          <div
            className="bg-white rounded-t-3xl sm:rounded-2xl shadow-2xl p-6 w-full sm:max-w-sm"
            style={{ paddingBottom: "calc(1.5rem + env(safe-area-inset-bottom, 0px))" }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-base font-semibold mb-1">Add to {modalCategory}</h3>
            <p className="text-xs text-gray-400 mb-4">Upload a painting for this category</p>

            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-gray-300 rounded-xl h-40 flex flex-col items-center justify-center text-gray-400 text-xs cursor-pointer hover:border-gray-500 hover:text-gray-600 transition overflow-hidden"
            >
              {newImageUrl ? (
                <img src={newImageUrl} alt="preview" className="h-full w-full object-cover" />
              ) : (
                <>
                  <span className="text-2xl mb-1">🖼️</span>
                  <span>Click to upload image</span>
                </>
              )}
            </div>
           

            <input
              type="text"
              placeholder="Painting title"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="mt-4 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-300"
            />

            <div className="flex gap-3 mt-5">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 py-2 rounded-lg border border-gray-200 text-sm text-gray-600 hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleAdd}
                disabled={!newTitle.trim()}
                className="flex-1 py-2 rounded-lg bg-gray-900 text-white text-sm hover:bg-gray-700 transition disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Add Painting
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
