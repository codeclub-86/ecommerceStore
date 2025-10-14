"use client";
import { useEffect, useState } from "react";
import { reels } from "@/app/data/reelsData";

export default function ReelViewer({ params }: { params: { id: string } }) {
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        const startIndex = reels.findIndex((r) => r.id === params.id);
        setActiveIndex(startIndex >= 0 ? startIndex : 0);
    }, [params.id]);

    const handleScroll = (e: any) => {
        const index = Math.round(e.target.scrollTop / window.innerHeight);
        setActiveIndex(index);
    };

    return (
        <div
            onScroll={handleScroll}
            className="h-screen overflow-y-scroll snap-y snap-mandatory no-scrollbar bg-black"
        >
            {reels.map((reel, i) => (
                <div
                    key={reel.id}
                    className="h-screen w-full snap-start flex items-center justify-center relative"
                >
                    <video
                        src={reel.videoUrl}
                        controls={false}
                        muted={i !== activeIndex}
                        autoPlay={i === activeIndex}
                        loop
                        className="h-full w-full object-cover"
                    />
                    <div className="absolute bottom-10 left-5 text-white">
                        <p className="text-lg font-medium">{reel.caption}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}
