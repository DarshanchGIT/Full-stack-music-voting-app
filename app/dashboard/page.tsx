"use client";
//example vidoe link : https://www.youtube.com/watch?v=dQw4w9WgXcQ

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
//@ts-ignore
import { ThumbsUp, ThumbsDown } from "lucide-react";
import Image from "next/image";

const initialQueue = [
  {
    id: 1,
    title: "Song 1",
    votes: 5,
    thumbnail: "https://i.ytimg.com/vi/dQw4w9WgXcQ/default.jpg",
  },
  {
    id: 2,
    title: "Song 2",
    votes: 3,
    thumbnail: "https://i.ytimg.com/vi/dQw4w9WgXcQ/default.jpg",
  },
  {
    id: 3,
    title: "Song 3",
    votes: 1,
    thumbnail: "https://i.ytimg.com/vi/dQw4w9WgXcQ/default.jpg",
  },
];

export default function Component() {
  const [videoUrl, setVideoUrl] = useState("");
  const [queue, setQueue] = useState(initialQueue);
  const [currentVideo, setCurrentVideo] = useState("dQw4w9WgXcQ");

  const extractVideoId = (url: string): string => {
    const trimmedUrl = url.trim();

    // Handle full URL format
    if (trimmedUrl.includes("youtube.com/watch?v=")) {
      return trimmedUrl.split("v=")[1].split("&")[0];
    }
    // Handle short URL format
    else if (trimmedUrl.includes("youtu.be/")) {
      return trimmedUrl.split("youtu.be/")[1].split("?")[0];
    }
    // Handle embedded URL format
    else if (trimmedUrl.includes("youtube.com/embed/")) {
      return trimmedUrl.split("embed/")[1].split("?")[0];
    }
    return "";
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitted URL:", videoUrl);

    // Extract video ID from URL
    const videoId = extractVideoId(videoUrl);
    if (videoId) {
      // Add new video to the queue with a default thumbnail and votes
      setQueue((prevQueue) => [
        ...prevQueue,
        {
          id: prevQueue.length + 1, // Ensure unique ID
          title: "New Song", // You can update this with actual video title if needed
          votes: 0,
          thumbnail: `https://i.ytimg.com/vi/${videoId}/default.jpg`, // Using videoId for thumbnail
        },
      ]);
    }

    // Clear the input field
    setVideoUrl("");
  };

  const handleVote = (id: number, increment: number) => {
    setQueue(
      queue
        .map((item) =>
          item.id === id ? { ...item, votes: item.votes + increment } : item
        )
        .sort((a, b) => b.votes - a.votes)
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-purple-900 text-gray-900">
      <div className="container mx-auto p-4 md:px-20">
        <h1 className="text-5xl font-bold mb-6 text-center pt-8 text-white p-6">
          Song Voting Queue
        </h1>

        <div className="grid md:grid-cols-2 gap-4 md:gap-20">
          {/* Left Column: URL Input and Preview */}
          <div className="space-y-4">
            <form onSubmit={handleSubmit}>
              <div className="flex gap-2">
                <Input
                  type="text"
                  value={videoUrl}
                  onChange={(e) => setVideoUrl(e.target.value)}
                  placeholder="Enter YouTube video URL"
                  className="flex-grow bg-gray-100 text-gray-900 border-gray-300"
                />
                <Button
                  type="submit"
                  className="bg-purple-600 hover:bg-purple-700 text-white"
                >
                  Add to Queue
                </Button>
              </div>
            </form>
            <div>
              <h2 className="text-xl font-semibold mb-2 text-white">Preview</h2>
              <div className="aspect-video w-full">
                {videoUrl ? (
                  <iframe
                    width="100%"
                    height="100%"
                    src={`https://www.youtube.com/embed/${
                      videoUrl.split("v=")[1]
                    }`}
                    title="YouTube video preview"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="border-4 border-white-400 rounded-lg"
                  ></iframe>
                ) : (
                  <div className="w-full h-full bg-gray-800 flex items-center justify-center text-white text-sm border-4 border-white-400 rounded-lg">
                    Enter a YouTube URL to preview
                  </div>
                )}
              </div>
            </div>
          </div>
          {/* Right Column: Now Playing and Voting Queue */}
          <div className="space-y-4 w-[500px]">
            <div>
              <h2 className="text-3xl font-semibold mb-2 text-white p-4">
                Now Playing
              </h2>
              <div className="aspect-video w-full">
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${currentVideo}`}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="border-4 border-white-400 rounded-lg"
                ></iframe>
              </div>
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-2 text-white">
                Upcoming Songs
              </h2>
              <div className="space-y-2 max-h-[calc(100vh-400px)] overflow-y-auto pr-2 scroll-container">
                {queue.map((item) => (
                  <Card
                    key={item.id}
                    className="bg-gray-100 border-gray-300 w-full"
                  >
                    <CardContent className="p-5 flex items-center">
                      <Image
                        src={item.thumbnail}
                        alt={item.title}
                        width={68}
                        height={68}
                        className="w-20 h-15 object-cover mr-2 rounded"
                      />
                      <div className="flex-grow min-w-0">
                        <h3 className="font-bold text-base truncate">
                          {item.title}
                        </h3>
                        <p className="text-small text-gray-600">
                          Votes: {item.votes}
                        </p>
                      </div>
                      <div className="flex gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleVote(item.id, 1)}
                          className="hover:bg-purple-200 text-purple-700 p-1"
                        >
                          <ThumbsUp className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleVote(item.id, -1)}
                          className="hover:bg-purple-200 text-purple-700 p-1"
                        >
                          <ThumbsDown className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
