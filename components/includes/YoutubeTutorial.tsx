"use client";

// import { useState } from "react";
// import { Button } from "@/components/ui/button";

export default function YouTubeTutorial() {

    // const [loaded, setLoaded] = useState(false);

    return (
        <>
            {/* {loaded ? */}
                <div id="youtube" className="flex flex-col space-y-2 min-h-screen justify-center items-center w-full">
                    <iframe className="rounded-xl" width="1080" height="540" src="https://www.youtube.com/embed/gGhcjKgid4A?si=QY5HNbEykyi7gTfS"
                        title="YouTube video player"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    ></iframe>
                </div>
                 :
                {/* <Button variant={'secondary'} onClick={() => setLoaded(true)}></Button> */}
            {/* } */}
        </>
    );
}