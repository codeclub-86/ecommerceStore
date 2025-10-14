"use client";
import Link from "next/link";
import { reels } from "../../data/reelsData";

export default function HomeReelsPreview() {
    return (
        <section className="p-6 bg-black text-white">
            <h2 className="text-xl font-semibold mb-4">Seed Reels</h2>
            <div className="flex gap-4 overflow-x-auto no-scrollbar">
                {reels.map((reel) => (
                    <Link key={reel.id} href={`/reels/${reel.id}`}>
                        <video
                            src={reel.videoUrl}
                            muted
                            loop
                            className="w-48 h-72 object-cover rounded-2xl cursor-pointer hover:scale-105 transition-transform"
                        />
                    </Link>
                ))}
            </div>
        </section>
    );
}
