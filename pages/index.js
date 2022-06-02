import Head from "next/head";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <div className="grid grid-cols-3 gap-x-16">
        <div className="border shadow bg-white">
          <div className="flex flex-col h-full">
            <div>
              <img src="/art-science-eng.jpeg"></img>
            </div>
            <div className="m-5 flex flex-col space-y-3 ">
              <div className="text-lg font-bold">
                The Art of Doing Science and Engineering
              </div>
              <div className="text-lg">Richard Hamming</div>
              <div className="py-4">
                The Art of Doing Science and Engineering is a reminder that a
                childlike capacity for learning and creativity are accessible to
                everyone.
              </div>
            </div>

            <div className="mt-auto px-5 mb-5">
              <button className="buttonPrimary w-full">purchase - $23</button>
            </div>
          </div>
        </div>

        <div className="border shadow bg-white">
          <div className="flex flex-col h-full">
            <div>
              <img src="/prince-of-persia.jpeg"></img>
            </div>
            <div className="m-5 flex flex-col space-y-3">
              <div className="text-lg font-bold">
                The Making of Prince of Persia: Journals 1985-1993
              </div>
              <div className="text-lg">Jordan Mechner</div>
              <div className="py-4">
                In The Making of Prince of Persia, on the 30th anniversary of
                the game’s release, Mechner looks back at the journals he kept
                from 1985 to 1993..
              </div>
            </div>
            <div className="mt-auto px-5 mb-5">
                <button className="buttonPrimary w-full">purchase - $25</button>
              </div>
          </div>
        </div>

        <div className="border shadow bg-white">
          <div className="flex flex-col h-full">
            <div>
              <img src="/working-in-public.jpeg"></img>
            </div>
            <div className="m-5 flex flex-col space-y-3">
              <div className="text-lg font-bold">
                Working in Public: The Making and Maintenance of Open Source
              </div>
              <div className="text-lg">Nadia Eghbal</div>
              <div className="py-4">
                Nadia Eghbal takes an inside look at modern open source and
                offers a model through which to understand the challenges faced
                by online creators.
              </div>
            </div>
            <div className="mt-auto px-5 mb-5">
                <button className="buttonPrimary w-full">purchase - $28</button>
              </div>
          </div>
        </div>
      </div>
    </>
  );
}
