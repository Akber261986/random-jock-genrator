'use client';
import { useState, useEffect } from "react";
import { Button } from "./ui/button";

interface jockRespons{
    setup: string;
    punchLine: string;
}

export default function RandomJock() {
    
const [jock, setJock] = useState<string>("");

useEffect(()=>{
    fetchJock();
}, []);

async function fetchJock(): Promise <void> {
    try {
        const response = await fetch(
            "https://official-joke-api.appspot.com/random_joke"
        )
        const data: jockRespons = await response.json();
        setJock (`${data.setup} - ${data.punchLine}`);
    } catch (error){
        console.error("Error in fetch jock", error)
        setJock ("Failed to fetch jock, try again")
    }
}
    return(
        <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-[#ffa500] to-[#ff6b6b] p-4">
            <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
                <h1 className="text-3xl font-bold mb-4 text-[#333]">😂 Random Joke 👈</h1>
                <div className="bg-[#f5f5f5] roundef-lg p-6 mb-6 text-[#555] text-lg ">
                    {jock || "Loading..."}
                </div>
                <Button
                onClick={fetchJock}
                className="bg-[#4caf50] hover:bg-[#43a047] text-white font-bold py-2 px-4 rounded-full transition-colors duration-300"
                >😂 Get New Joke 😂</Button>
            </div>
        </div>
    )
}