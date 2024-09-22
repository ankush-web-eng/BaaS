"use client";

import React from 'react';

export default function YouTubeTutorial() {
    return (
        <div className="flex flex-col items-center justify-center md:min-h-screen w-full p-4">
            <div className="w-full max-w-4xl aspect-video">
                <iframe 
                    className="w-full h-full rounded-xl"
                    src="https://www.youtube.com/embed/gGhcjKgid4A?si=QY5HNbEykyi7gTfS"
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                ></iframe>
            </div>
        </div>
    );
}