import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
//@ts-ignore
import { Users, Play, Share2 } from "lucide-react";
import { Appbar } from "./components/Appbar";
import { Redirect } from "./components/Redirect";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-gray-100 transition-colors duration-300">
      <Appbar />
      <Redirect />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-b from-gray-900 to-purple-900">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center pl-6">
              <div className="space-y-4 max-w-3xl mx-auto">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-7xl bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400 p-1">
                  Stream Together, Vibe Together
                </h1>
                <p className="text-gray-400 md:text-2xl">
                  Create a shared music room and let your friends choose the
                  tunes. The ultimate social listening experience.
                </p>
                <p className="text-3xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
                  Welcome to Muzer
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-800">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
              <div className="flex flex-col items-center space-y-4 text-center">
                <Users className="h-10 w-10 text-purple-400" />
                <h2 className="text-xl font-bold">Collaborative Playlists</h2>
                <p className="text-gray-400">
                  Create a room and invite friends to add songs to the queue in
                  real-time.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <Play className="h-10 w-10 text-pink-400" />
                <h2 className="text-xl font-bold">Synchronized Playback</h2>
                <p className="text-gray-400">
                  Everyone in the room hears the same song at the same time,
                  creating a shared experience.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <Share2 className="h-10 w-10 text-indigo-400" />
                <h2 className="text-xl font-bold">Easy Sharing</h2>
                <p className="text-gray-400">
                  Share your room with a simple link, no sign-up required for
                  guests.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
              How It Works
            </h2>
            <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-purple-500 text-3xl font-bold text-white">
                  1
                </div>
                <h3 className="text-xl font-bold">Create a Room</h3>
                <p className="text-gray-400">
                  Start a new music room with just a click.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-pink-500 text-3xl font-bold text-white">
                  2
                </div>
                <h3 className="text-xl font-bold">Invite Friends</h3>
                <p className="text-gray-400">
                  Share the room link with your friends.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-indigo-500 text-3xl font-bold text-white">
                  3
                </div>
                <h3 className="text-xl font-bold">Enjoy Together</h3>
                <p className="text-gray-400">
                  Let everyone add songs and enjoy the music together.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-800">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
                Ready to Get Started?
              </h2>
              <p className="mx-auto max-w-[600px] text-gray-400 md:text-xl">
                Join MusicStream today and start sharing your favorite tunes
                with friends.
              </p>
              <div className="w-full max-w-sm space-y-2">
                <form className="flex space-x-2">
                  <Input
                    className="flex-1 bg-gray-700"
                    placeholder="Enter your email"
                    type="email"
                  />
                  <Button
                    type="submit"
                    className="bg-purple-500 text-white hover:bg-purple-600"
                  >
                    Sign Up
                  </Button>
                </form>
                <p className="text-xs text-gray-400">
                  Start your free trial. No credit card required.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="w-full py-6 px-4 md:px-6 border-t border-gray-800">
        <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center">
          <p className="text-xs text-gray-400">
            © 2023 MusicStream. All rights reserved.
          </p>
          <nav className="flex gap-4 sm:gap-6 mt-4 sm:mt-0">
            <a className="text-xs hover:text-purple-400" href="#">
              Terms of Service
            </a>
            <a className="text-xs hover:text-purple-400" href="#">
              Privacy
            </a>
          </nav>
        </div>
      </footer>
    </div>
  );
}
