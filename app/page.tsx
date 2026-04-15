"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";

type StoryScene = {
  title: string;
  subtitle: string;
  text: string;
  image: string;
  bubbleLeft: string;
  bubbleRight: string;
  theme: string;
};

export default function GiftWebsite() {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [showIntro, setShowIntro] = useState(true);
  const [openedLetter, setOpenedLetter] = useState(false);
  const [showReasons, setShowReasons] = useState(false);
  const [typedText, setTypedText] = useState("");
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);
  const [envelopeOpen, setEnvelopeOpen] = useState(false);
  const [storyStep, setStoryStep] = useState(0);
  const [autoPlayFilm, setAutoPlayFilm] = useState(false);
  const [sceneVisible, setSceneVisible] = useState(true);

  const introText =
    "hey, this is a late little gift hehe. aku tahu ini agak telat banget, but i still wanted to make something that feels warm, personal, and memorable mungkin semoga hehe.";

  const galleryPhotos = useMemo(
    () => Array.from({ length: 15 }, (_, i) => `/gallery/${i + 1}.jpg`),
    []
  );

  const memories = useMemo(
    () => [
      "the way some random days felt lighter just because you were around",
      "how familiar everything felt back then, even the quiet parts",
      "how some songs still sound like they accidentally belong to you",
      "the fact that a few good memories still know how to stay soft",
    ],
    []
  );

  const reasons = useMemo(
    () => [
      {
        title: "It feels quiet",
        text: "Bukan tipe lagu yang melebih lebihkan sesuatu atau terlalu dramatis malah lagu ini menurut aku paling nampar dengan cara paling halus. Lagu ini kayak menggambarkan kayak ada orang yang masih kepikiran tapi orangnya udah ga disamping kita lagi. ",
      },
      {
        title: "It feels familiar",
        text: "Lagu ini kayak bilang kalau ada sesuatu yang asing tapi terasa familiar banget.",
      },
      {
        title: "It feels honest",
        text: "Aku pilih lagu ini bukan karena mau buat semuanya jadi sedih wkwk tapi menurut aku lagu ini paling jujur dalam menggambarkan apa yang aku rasa sampai sekarang.",
      },
    ],
    []
  );

  const storyScenes = useMemo<StoryScene[]>(
    () => [
      {
        title: "we met in high school",
        subtitle: "the first time life quietly introduced us.",
        text: "Semuanya mulai dari sma yaa hehe, dua orang yang bahkan sebenernya ga kenal dan aku cuman bisa liat kamu dari kejauhan dan ngomong ke jibril kalau kagum sama kamu(walau kamu gapercaya cerita ini)",
        image: "/story/1-sma.png",
        bubbleLeft: "so this is where it starts.",
        bubbleRight: "i didn’t know this would matter so much.",
        theme: "from-sky-100 via-white to-rose-50",
      },
      {
        title: "Langit Benderang, Konser pertama kita bareng, Awal mula semua makin dalam",
        subtitle: "we got closer because life kept putting us side by side.",
        text: "Aku bersykur tuhan temuin kita dalam satu kejadian yang sangat kebetulan. Langit Benderang, kangen banget gasi sama acara ini? makasih yaa bawahan aku wkwkwk.",
        image: "/story/2-panitia-konser.png",
        bubbleLeft: "i like being here with you.",
        bubbleRight: "me too. more than i expected.",
        theme: "from-violet-100 via-rose-50 to-white",
      },
      {
        title: "then it became us",
        subtitle: "from quietly close to something real.",
        text: "Setelah agak lama dikit dan setelah mental ku terkumpul, aku beraniin diri buat nembah kamuu di GYMMMMM wkwkkwkw makasii udah mau sama aku walaupun harusnya alurnya kita jadian dulu baru konser yaa.",
        image: "/story/3-mulai-hubungan.png",
        bubbleLeft: "this feels special.",
        bubbleRight: "yeah… it really does.",
        theme: "from-rose-100 via-amber-50 to-white",
      },
      {
        title: "i graduated first",
        subtitle: "and life started moving faster for me.",
        text: "karena aku lebih tua dikit, aku harus lulus duluan :(. setelah itu, hidup  ngebawa aku masuk ke Poltek SSN. dan dari sini ritme hidup mulai berubah, dan jarak mulai pelan-pelan ngambil perannya sendiri.",
        image: "/story/4-poltek-ssn.png",
        bubbleLeft: "you’re really moving forward.",
        bubbleRight: "i wish i could pause time a little.",
        theme: "from-sky-100 via-slate-50 to-white",
      },
      {
        title: "we learned how to stay close through a screen",
        subtitle: "distance changed the way we met each other.",
        text: "karena kesibukan aku sihh dan jarak kita, kita jadi lebih sering ketemu hanya lewat video call. berat banget karena harus ngerubah kebiasaan kita yang dulu.",
        image: "/story/5-videocall.png",
        bubbleLeft: "can you hear me clearly?",
        bubbleRight: "clear enough to miss you more.",
        theme: "from-indigo-100 via-sky-50 to-white",
      },
      {
        title: "then you graduated and went to toronto",
        subtitle: "the world asked even more from you.",
        text: "HOREEE kamuu lulus dan keterima di Toronto, hal yang kamu cita citain dari dulu dengan beasiswa, aku bangga banget sama kamu. tapi aku sedih kita makin jauh T_T.",
        image: "/story/6-toronto.png",
        bubbleLeft: "i have to go farther now.",
        bubbleRight: "then go. i’ll still be proud of you.",
        theme: "from-indigo-200 via-white to-cyan-50",
      },
      {
        title: "we had to focus on our own dreams",
        subtitle: "sometimes loving someone also means letting life happen.",
        text: "akhirnya kita harus sama sama fokus buat ngejar mimpi kita masing-masing ya. Sakit, tapi aku udah percaya kok kalau ini mungkin bagian dari prosesnya, makasih selalu ngomong gitu ke aku wkwk.",
        image: "/story/7-mengejar-mimpi.png",
        bubbleLeft: "maybe this is how we grow.",
        bubbleRight: "even if it hurts.",
        theme: "from-slate-900 via-slate-800 to-slate-900",
      },
      {
        title: "and maybe, one day",
        subtitle: "better timing, better versions of us.",
        text: "aku masih nyimpen harapan itu. semoga suatu saat nanti, kita bisa bertemu lagi dalam posisi yang lebih baik, lebih sukses, lebih siap, dan lebih dewasa buat menjalani sesuatu yang baru yaa,aamiin.",
        image: "/story/8-reunion.png",
        bubbleLeft: "meet me again someday.",
        bubbleRight: "i’ll keep that hope softly.",
        theme: "from-emerald-100 via-white to-rose-50",
      },
    ],
    []
  );

  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";

    const audio = new Audio("/music.mp3");
    audio.loop = true;
    audio.volume = 0.35;
    audioRef.current = audio;

    return () => {
      audio.pause();
    };
  }, []);

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setTypedText(introText.slice(0, index + 1));
      index += 1;
      if (index >= introText.length) clearInterval(interval);
    }, 28);

    return () => clearInterval(interval);
  }, [introText]);

  useEffect(() => {
    if (!autoPlayFilm) return;

    const timer = setInterval(() => {
      setSceneVisible(false);
      setTimeout(() => {
        setStoryStep((prev) => {
          if (prev >= storyScenes.length - 1) return 0;
          return prev + 1;
        });
        setSceneVisible(true);
      }, 260);
    }, 4600);

    return () => clearInterval(timer);
  }, [autoPlayFilm, storyScenes.length]);

  const handleStart = async () => {
    try {
      if (audioRef.current) {
        await audioRef.current.play();
        setIsPlaying(true);
      }
    } catch (error) {
      console.log("Audio gagal diputar:", error);
    }

    setShowIntro(false);
    setTimeout(() => {
      document.getElementById("hero")?.scrollIntoView({ behavior: "smooth" });
    }, 200);
  };

  const toggleMusic = async () => {
    if (!audioRef.current) return;

    try {
      if (audioRef.current.paused) {
        await audioRef.current.play();
        setIsPlaying(true);
      } else {
        audioRef.current.pause();
        setIsPlaying(false);
      }
    } catch (error) {
      console.log("Audio gagal diputar:", error);
    }
  };

  const changeScene = (nextIndex: number) => {
    setSceneVisible(false);
    setTimeout(() => {
      setStoryStep(nextIndex);
      setSceneVisible(true);
    }, 220);
  };

  const goPrevScene = () => {
    changeScene(Math.max(0, storyStep - 1));
  };

  const goNextScene = () => {
    changeScene(Math.min(storyScenes.length - 1, storyStep + 1));
  };

  const currentScene = storyScenes[storyStep];
  const isDarkScene = storyStep === 6;

  return (
    <main className="min-h-screen overflow-x-hidden bg-[radial-gradient(circle_at_top,_#fff1f2,_#ffffff_42%,_#f5f5f5)] text-neutral-800">
      <style jsx global>{`
        @keyframes floatSlow {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-12px);
          }
        }

        @keyframes fadeUp {
          0% {
            opacity: 0;
            transform: translateY(28px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slowZoom {
          0% {
            transform: scale(1);
          }
          100% {
            transform: scale(1.03);
          }
        }

        @keyframes sceneFadeIn {
          0% {
            opacity: 0;
            transform: scale(1.015);
            filter: blur(3px);
          }
          100% {
            opacity: 1;
            transform: scale(1);
            filter: blur(0);
          }
        }

        @keyframes sceneFadeOut {
          0% {
            opacity: 1;
            transform: scale(1);
            filter: blur(0);
          }
          100% {
            opacity: 0;
            transform: scale(0.985);
            filter: blur(3px);
          }
        }

        @keyframes letterRise {
          0% {
            opacity: 0;
            transform: translateY(40px) scale(0.94);
          }
          55% {
            opacity: 1;
            transform: translateY(-34px) scale(1.02);
          }
          100% {
            opacity: 1;
            transform: translateY(-28px) scale(1);
          }
        }

        @keyframes flapOpen {
          0% {
            transform: perspective(900px) rotateX(0deg);
          }
          100% {
            transform: perspective(900px) rotateX(180deg);
          }
        }

        @keyframes flapClose {
          0% {
            transform: perspective(900px) rotateX(180deg);
          }
          100% {
            transform: perspective(900px) rotateX(0deg);
          }
        }

        @keyframes softGlow {
          0%,
          100% {
            box-shadow: 0 10px 25px rgba(244, 114, 182, 0.15);
          }
          50% {
            box-shadow: 0 16px 36px rgba(244, 114, 182, 0.28);
          }
        }

        .cinematic-section {
          animation: fadeUp 0.8s ease both;
        }

        .float-slow {
          animation: floatSlow 4.8s ease-in-out infinite;
        }

        .slow-zoom {
          animation: slowZoom 6s ease-in-out infinite alternate;
        }

        .scene-in {
          animation: sceneFadeIn 0.55s cubic-bezier(0.2, 0.8, 0.2, 1) both;
        }

        .scene-out {
          animation: sceneFadeOut 0.25s ease both;
        }

        .letter-rise {
          animation: letterRise 0.9s cubic-bezier(0.2, 0.8, 0.2, 1) both;
        }

        .flap-open {
          animation: flapOpen 0.78s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
          transform-origin: top center;
          backface-visibility: hidden;
        }

        .flap-close {
          animation: flapClose 0.45s ease forwards;
          transform-origin: top center;
          backface-visibility: hidden;
        }

        .soft-glow {
          animation: softGlow 2.8s ease-in-out infinite;
        }
      `}</style>

      {showIntro && (
        <section className="fixed inset-0 z-50 flex min-h-screen items-center justify-center bg-neutral-950 px-6 text-white">
          <div className="relative mx-auto max-w-3xl overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur md:p-12">
            <div className="absolute -left-10 -top-10 h-32 w-32 rounded-full bg-rose-400/20 blur-3xl" />
            <div className="absolute -bottom-10 -right-10 h-32 w-32 rounded-full bg-amber-300/20 blur-3xl" />

            <p className="relative mb-3 text-sm uppercase tracking-[0.3em] text-rose-300">
              a late little gift
            </p>
            <h1 className="relative text-3xl font-semibold leading-tight md:text-6xl">
              {typedText}
              <span className="animate-pulse">|</span>
            </h1>
            <p className="relative mt-6 max-w-2xl leading-7 text-neutral-300">
              before you go in, press play ya. aku ada lagu buat nemenin kamu scroll webnya.
            </p>

            <div className="relative mt-8 flex flex-col gap-3 sm:flex-row">
              <button
                onClick={handleStart}
                className="rounded-2xl bg-rose-500 px-6 py-3 text-sm font-medium text-white shadow-lg transition hover:-translate-y-0.5"
              >
                Play music & start
              </button>
              <button
                onClick={() => setShowIntro(false)}
                className="rounded-2xl border border-white/15 bg-white/5 px-6 py-3 text-sm font-medium text-white/90 transition hover:bg-white/10"
              >
                Open quietly
              </button>
            </div>
          </div>
        </section>
      )}

      {selectedPhoto && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 px-4"
          onClick={() => setSelectedPhoto(null)}
        >
          <div className="relative w-full max-w-4xl">
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute -top-12 right-0 rounded-full bg-white px-4 py-2 text-sm shadow"
            >
              Close
            </button>
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-white">
              <Image
                src={selectedPhoto}
                alt="Kenangan"
                fill
                sizes="100vw"
                className="object-contain"
              />
            </div>
          </div>
        </div>
      )}

      <div className="fixed bottom-4 right-4 z-40 flex gap-2">
        <button
          onClick={toggleMusic}
          className="rounded-full bg-black/85 px-4 py-3 text-sm text-white shadow-lg backdrop-blur transition hover:scale-105"
        >
          {isPlaying ? "Pause music" : "Play music"}
        </button>
        <a
          href="#gallery"
          className="rounded-full border border-neutral-300 bg-white/90 px-4 py-3 text-sm shadow-lg backdrop-blur transition hover:scale-105"
        >
          Gallery
        </a>
      </div>

      <section
        id="hero"
        className="cinematic-section mx-auto flex min-h-screen max-w-6xl flex-col justify-center px-6 py-16 md:px-10"
      >
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div className="space-y-6">
            <p className="inline-block rounded-full border border-rose-200 bg-white/80 px-4 py-2 text-sm shadow-sm">
              for someone who still matters in a soft way
            </p>

            <div className="space-y-4">
              <h1 className="text-4xl font-semibold leading-tight md:text-6xl">
                happy birthday,
                <span className="block text-rose-500">
                  in my own little way.
                </span>
              </h1>

              <p className="max-w-xl text-base leading-7 text-neutral-600 md:text-lg">
                this page is not here to make things heavy. i just wanted to
                leave something that feels warm, honest, and a little prettier
                than plain words.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <a
                href="#about-song"
                className="rounded-2xl bg-rose-500 px-5 py-3 text-sm font-medium text-white shadow-lg transition hover:-translate-y-0.5"
              >
                Why this song?
              </a>
              <a
                href="#message"
                className="rounded-2xl border border-neutral-300 bg-white px-5 py-3 text-sm font-medium shadow-sm transition hover:-translate-y-0.5"
              >
                Read the letter
              </a>
            </div>
          </div>

          <div className="relative float-slow">
            <div className="rounded-[2rem] border border-white/70 bg-white/80 p-6 shadow-2xl backdrop-blur">
              <div className="space-y-4 rounded-[1.5rem] bg-gradient-to-br from-rose-100 to-amber-50 p-6">
                <p className="text-sm uppercase tracking-[0.2em] text-neutral-500">
                  birthday wish
                </p>
                <h2 className="text-2xl font-semibold md:text-3xl">
                  Semoga tahun ini bawa banyak hal baik buat kamu.
                </h2>
                <p className="leading-7 text-neutral-700">
                  more calm. more good surprises. more moments where life feels
                  like it’s finally being nice to you.
                </p>
              </div>
            </div>
            <div className="absolute -bottom-4 -left-4 h-24 w-24 rounded-full bg-rose-200/70 blur-2xl" />
            <div className="absolute -right-4 -top-4 h-28 w-28 rounded-full bg-amber-200/70 blur-2xl" />
          </div>
        </div>
      </section>

      <section className="cinematic-section mx-auto max-w-6xl px-6 pb-4 md:px-10">
        <div className="grid gap-4 md:grid-cols-4">
          {memories.map((item, index) => (
            <div
              key={index}
              className="rounded-[1.5rem] border border-neutral-200 bg-white/80 p-5 shadow-sm backdrop-blur transition hover:-translate-y-1 hover:shadow-lg"
            >
              <p className="text-sm uppercase tracking-[0.2em] text-rose-400">
                0{index + 1}
              </p>
              <p className="mt-3 leading-7 text-neutral-600">{item}</p>
            </div>
          ))}
        </div>
      </section>

      <section
        id="about-song"
        className="cinematic-section mx-auto max-w-6xl px-6 py-10 md:px-10 md:py-16"
      >
        <div className="grid gap-6 md:grid-cols-2 items-start">
          <div className="rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm md:p-8">
            <p className="mb-3 text-sm uppercase tracking-[0.2em] text-rose-400">
              why i picked about you
            </p>
            <h2 className="text-3xl font-semibold md:text-4xl">
              because it sounds like remembering someone.
            </h2>
            <div className="mt-5 space-y-4 text-neutral-600">
              <p className="leading-7">
                I chose About You bukan karena lagunya sedih banget, 
                tapi karena rasanya familiar. It doesn’t try too hard, nggak terlalu loud, tapi tetap tinggal di kepala. 
                Kayak perasaan yang datang pelan-pelan, terus tiba-tiba sadar… oh, ini tentang seseorang yang pernah berarti.
              </p>
              <p className="leading-7">
               Lagu ini juga punya vibe yang quiet, tapi bukan kosong. Lebih ke tenang, soft, dan jujur. 
               It feels like remembering someone without forcing it, tanpa harus di dramatisir. 
               Kadang cuma lewat potongan lirik atau nada, terus langsung keinget momen tertentu tanpa sengaja.
              </p>
              <p className="leading-7">
                And maybe that’s why I picked this. Because it feels real. Nggak berisik, nggak berlebihan, tapi tetap ada. 
                Kayak beberapa hal tentang kamu di kepala aku. Nnggak selalu muncul, tapi sekali datang, rasanya masih sama.
              </p>
            </div>

            <button
              onClick={() => setShowReasons((prev) => !prev)}
              className="mt-6 rounded-2xl border border-neutral-300 bg-neutral-50 px-4 py-3 text-sm font-medium transition hover:bg-neutral-100"
            >
              {showReasons ? "Hide the extra reasons" : "Show 3 more reasons"}
            </button>

            {showReasons && (
              <div className="mt-5 grid gap-4">
                {reasons.map((reason) => (
                  <div key={reason.title} className="rounded-2xl bg-rose-50 p-4">
                    <h3 className="font-semibold text-neutral-800">
                      {reason.title}
                    </h3>
                    <p className="mt-2 leading-7 text-neutral-600">
                      {reason.text}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-5">
            <div className="rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm">
              <p className="text-sm uppercase tracking-[0.2em] text-rose-400">
                playlist
              </p>
              <h3 className="mt-3 text-2xl font-semibold">
                i left the playlist here too.
              </h3>
              <p className="mt-3 leading-7 text-neutral-600">
                btw, kalau kamu sadar aku buat satu playlist baru buat kamu.
                kamu inget ga dulu aku suka banget buat playlist buat kamu, buat kita.
                Terima ya ini playlist buat kita untuk sekarang, kalau engga terima yaudah anggap aja playlist aku buat kamu hehe
              </p>

              <div className="mt-5 overflow-hidden rounded-[1.5rem] border border-neutral-200 shadow-sm">
                <iframe
                  data-testid="embed-iframe"
                  style={{ borderRadius: "24px" }}
                  src="https://open.spotify.com/embed/playlist/3WwSvY8GwKh7LzyF3XaCvg?utm_source=generator"
                  width="100%"
                  height="352"
                  frameBorder="0"
                  allowFullScreen
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                  title="Spotify Playlist"
                />
              </div>

              <div className="mt-4 flex flex-wrap gap-3">
                <a
                  href="https://open.spotify.com/playlist/3WwSvY8GwKh7LzyF3XaCvg?si=4a6a3badff5042be"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex rounded-2xl bg-rose-500 px-5 py-3 text-sm font-medium text-white shadow-lg transition hover:-translate-y-0.5"
                >
                  open in spotify
                </a>

                <p className="self-center text-sm text-neutral-500">
                  kalau nggak kebuka di device tertentu, pakai tombol
                  ini aja.
                </p>
              </div>
            </div>

            <div className="rounded-[2rem] border border-rose-100 bg-gradient-to-r from-rose-50 to-amber-50 p-6 shadow-sm">
              <p className="text-sm uppercase tracking-[0.2em] text-rose-400">
                small note
              </p>
              <p className="mt-3 leading-7 text-neutral-700">
                i didn’t choose this song to make things sad. i chose it
                because it feels true.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="cinematic-section mx-auto max-w-6xl px-6 py-8 md:px-10 md:py-16">
        <div className="rounded-[2rem] border border-neutral-200 bg-white p-8 shadow-sm md:p-10">
          <div className="mb-8 text-center">
            <p className="text-sm uppercase tracking-[0.2em] text-rose-400">
              cinematic story
            </p>
            <h2 className="mt-3 text-3xl font-semibold md:text-4xl">
              maybe we were asked to grow first, before life lets us try again.
            </h2>
            <p className="mx-auto mt-4 max-w-2xl leading-7 text-neutral-600">
              this part tells the story the way i hold it in my head: dari sma,
              satu kepanitiaan, ldr, toronto, sampai harapan buat ketemu lagi
              di waktu yang lebih baik.
            </p>
          </div>

          <div className="mb-6 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => setAutoPlayFilm((prev) => !prev)}
              className="rounded-2xl bg-rose-500 px-5 py-3 text-sm font-medium text-white shadow-lg transition hover:-translate-y-0.5"
            >
              {autoPlayFilm ? "Stop autoplay" : "Autoplay the film"}
            </button>
            <button
              onClick={goPrevScene}
              className="rounded-2xl border border-neutral-300 bg-white px-5 py-3 text-sm font-medium shadow-sm transition hover:-translate-y-0.5"
            >
              Previous scene
            </button>
            <button
              onClick={goNextScene}
              className="rounded-2xl border border-neutral-300 bg-white px-5 py-3 text-sm font-medium shadow-sm transition hover:-translate-y-0.5"
            >
              Next scene
            </button>
          </div>

          <div className="grid gap-8 md:grid-cols-[1.15fr_0.85fr] md:items-center">
            <div
              className={`relative h-[520px] overflow-hidden rounded-[1.75rem] border border-neutral-200 bg-gradient-to-br ${currentScene.theme} transition-all duration-500`}
            >
              <div
                className={isDarkScene ? "absolute inset-0 z-10 bg-black/25" : ""}
              />

              <div className="absolute left-6 top-6 z-20 rounded-full bg-white/90 px-4 py-2 text-xs uppercase tracking-[0.2em] text-rose-400 shadow-sm">
                scene 0{storyStep + 1}
              </div>

              <div className="absolute right-6 top-6 z-20 rounded-full bg-white/90 px-4 py-2 text-xs uppercase tracking-[0.2em] text-neutral-500 shadow-sm">
                {currentScene.subtitle}
              </div>

              <div
                className={`absolute inset-0 z-0 ${sceneVisible ? "scene-in" : "scene-out"}`}
              >
                <div className="relative h-full w-full slow-zoom">
                  <Image
                    src={currentScene.image}
                    alt={currentScene.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 60vw"
                    className="object-cover"
                    priority
                  />
                </div>
              </div>

              <div className="absolute left-6 bottom-20 z-20 max-w-[220px] rounded-2xl bg-white/92 px-5 py-3 text-base leading-7 text-neutral-700 shadow-lg">
                {currentScene.bubbleLeft}
              </div>

              <div className="absolute right-6 top-24 z-20 max-w-[220px] rounded-2xl bg-white/92 px-5 py-3 text-base leading-7 text-neutral-700 shadow-lg">
                {currentScene.bubbleRight}
              </div>

              {storyStep === 3 && (
                <div className="absolute right-8 bottom-8 z-20 rounded-2xl bg-white/92 px-3 py-2 text-xs text-indigo-600 shadow-sm">
                  toronto becomes your next horizon.
                </div>
              )}

              {storyStep === 4 && (
                <div className="absolute left-8 top-24 z-20 rounded-2xl bg-white/92 px-3 py-2 text-xs text-sky-600 shadow-sm">
                  distance turns into calls and waiting.
                </div>
              )}

              {storyStep === 7 && (
                <div className="absolute inset-x-0 bottom-8 z-20 text-center text-sm font-medium text-emerald-700">
                  aamiin for better timing, better versions, and a beautiful
                  reunion.
                </div>
              )}
            </div>

            <div className={sceneVisible ? "scene-in" : "scene-out"}>
              <p className="text-sm uppercase tracking-[0.2em] text-rose-400">
                story chapter
              </p>
              <h3 className="mt-3 text-3xl font-semibold md:text-4xl">
                {currentScene.title}
              </h3>
              <p className="mt-5 leading-8 text-neutral-600">
                {currentScene.text}
              </p>
              <p className="mt-5 leading-8 text-neutral-600">
                maybe this is not the part where everything works out yet.
                maybe this is just the part where both of us become who we need
                to become first.
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {storyScenes.map((scene, index) => (
                  <button
                    key={scene.title}
                    onClick={() => changeScene(index)}
                    className={`h-2.5 rounded-full transition-all ${
                      storyStep === index ? "w-10 bg-rose-500" : "w-2.5 bg-rose-200"
                    }`}
                    aria-label={`Go to scene ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="gallery"
        className="cinematic-section mx-auto max-w-6xl px-6 py-8 md:px-10 md:py-16"
      >
        <div className="mb-8 space-y-3 text-center">
          <p className="text-sm uppercase tracking-[0.2em] text-rose-400">
            gallery
          </p>
          <h2 className="text-3xl font-semibold md:text-4xl">
            little pieces of you
          </h2>
          <p className="mx-auto max-w-2xl leading-7 text-neutral-600">
            not every memory has to be explained. some of them are already
            enough just by being here.
          </p>
        </div>

        <div className="columns-2 gap-4 space-y-4 md:columns-3">
          {galleryPhotos.map((src, index) => (
            <button
              key={src}
              onClick={() => setSelectedPhoto(src)}
              className="relative mb-4 w-full overflow-hidden rounded-[1.5rem] border border-neutral-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div
                className="relative w-full"
                style={{ aspectRatio: index % 3 === 0 ? "4 / 5" : "4 / 4.8" }}
              >
                <Image
                  src={src}
                  alt={`Gallery photo ${index + 1}`}
                  fill
                  sizes="(max-width: 768px) 50vw, 33vw"
                  className="object-cover"
                />
              </div>
            </button>
          ))}
        </div>
      </section>

      <section className="cinematic-section mx-auto max-w-6xl px-6 py-8 md:px-10 md:py-16">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-[2rem] border border-neutral-200 bg-white p-8 shadow-sm">
            <p className="text-sm uppercase tracking-[0.2em] text-rose-400">
              digital envelope
            </p>
            <h2 className="mt-3 text-3xl font-semibold md:text-4xl">
              one small sealed thing.
            </h2>
            <p className="mt-4 leading-7 text-neutral-600">
              this part is for the kind of words that feel nicer when they’re
              opened slowly.
            </p>

            <button
              onClick={() => setEnvelopeOpen((prev) => !prev)}
              className="mt-6 rounded-2xl bg-neutral-900 px-5 py-3 text-sm font-medium text-white transition hover:-translate-y-0.5"
            >
              {envelopeOpen ? "Close envelope" : "Open envelope"}
            </button>

            <div className="mt-8 flex justify-center">
              <button
                type="button"
                onClick={() => setEnvelopeOpen((prev) => !prev)}
                className="relative w-full max-w-sm cursor-pointer text-left"
              >
                <div className="soft-glow h-48 rounded-[2rem] bg-gradient-to-br from-rose-200 via-rose-300 to-pink-300 shadow-lg" />

                <div
                  className={`absolute inset-x-0 top-0 z-20 h-24 rounded-t-[2rem] bg-rose-400 ${
                    envelopeOpen ? "flap-open" : "flap-close"
                  }`}
                  style={{
                    clipPath: "polygon(0 0, 100% 0, 50% 100%)",
                    transformStyle: "preserve-3d",
                  }}
                />

                <div className="absolute inset-x-0 bottom-0 z-10 h-24 rounded-b-[2rem] bg-rose-200/85" />
                <div className="absolute bottom-0 left-0 z-10 h-32 w-1/2 rounded-bl-[2rem] bg-rose-100/75 [clip-path:polygon(0_0,100%_100%,0_100%)]" />
                <div className="absolute bottom-0 right-0 z-10 h-32 w-1/2 rounded-br-[2rem] bg-rose-100/75 [clip-path:polygon(100%_0,100%_100%,0_100%)]" />

                {!envelopeOpen && (
                  <div className="absolute inset-0 z-30 flex items-center justify-center">
                    <div className="rounded-full bg-white/90 px-4 py-2 text-sm font-medium text-rose-500 shadow-sm">
                      tap to open
                    </div>
                  </div>
                )}

                <div
                  className={`absolute inset-x-5 z-40 rounded-[1.5rem] bg-white p-5 shadow-2xl transition-all duration-700 ${
                    envelopeOpen
                      ? "top-0 opacity-100 pointer-events-auto"
                      : "top-28 opacity-0 pointer-events-none"
                  }`}
                >
                  {envelopeOpen && (
                    <div className="letter-rise">
                      <p className="text-sm uppercase tracking-[0.2em] text-rose-400">
                        inside
                      </p>
                      <p className="mt-3 leading-7 text-neutral-700">
                        i think some people stay special even after everything
                        changes. not in a loud way. just in a way that stays
                        true.
                      </p>
                    </div>
                  )}
                </div>
              </button>
            </div>
          </div>

          <div className="rounded-[2rem] border border-neutral-200 bg-white p-8 shadow-sm">
            <p className="text-sm uppercase tracking-[0.2em] text-rose-400">
              leave a message for author
            </p>
            <h2 className="mt-3 text-3xl font-semibold md:text-4xl">
              if you have a message for the author, leave it here.
            </h2>
            <p className="mt-4 leading-7 text-neutral-600">
             Kalau kamu mau ngomong sesuatu atau mau komen soal web ini, feel free ya buat kontak aku lagi sapa tau lupa nomor aku hehe
            </p>

            <div className="mt-8 space-y-4">
              <a
                href="https://wa.me/6281242939595"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between rounded-[1.5rem] border border-green-200 bg-green-50 px-5 py-4 transition hover:-translate-y-0.5 hover:shadow-md"
              >
                <div>
                  <p className="text-sm uppercase tracking-[0.2em] text-green-600">
                    WhatsApp
                  </p>
                  <p className="mt-1 text-lg font-semibold text-neutral-800">
                    081242939595
                  </p>
                </div>
                <span className="rounded-full bg-green-500 px-4 py-2 text-sm font-medium text-white">
                  Chat now
                </span>
              </a>

              <a
                href="https://t.me/6281242939595"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between rounded-[1.5rem] border border-sky-200 bg-sky-50 px-5 py-4 transition hover:-translate-y-0.5 hover:shadow-md"
              >
                <div>
                  <p className="text-sm uppercase tracking-[0.2em] text-sky-600">
                    Telegram
                  </p>
                  <p className="mt-1 text-lg font-semibold text-neutral-800">
                    081242939595
                  </p>
                </div>
                <span className="rounded-full bg-sky-500 px-4 py-2 text-sm font-medium text-white">
                  Open
                </span>
              </a>
            </div>

            <div className="mt-6 rounded-2xl bg-neutral-50 p-4 text-sm leading-7 text-neutral-500">
              thank you for stopping by this little page.
            </div>
          </div>
        </div>
      </section>

      <section
        id="message"
        className="cinematic-section mx-auto max-w-6xl px-6 py-8 md:px-10 md:py-16"
      >
        <div className="grid gap-6 md:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm md:p-8">
            <p className="text-sm uppercase tracking-[0.2em] text-rose-400">
              before the letter
            </p>
            <h2 className="mt-3 text-3xl font-semibold md:text-4xl">
              one last honest thing.
            </h2>
            <p className="mt-4 leading-7 text-neutral-600">
              i rewrote this part from scratch because i wanted it to sound
              calmer, simpler, and more like something i’d actually say if i
              wasn’t trying too hard.
            </p>
            <button
              onClick={() => setOpenedLetter((prev) => !prev)}
              className="mt-6 rounded-2xl bg-neutral-900 px-5 py-3 text-sm font-medium text-white transition hover:-translate-y-0.5"
            >
              {openedLetter ? "Close the letter" : "Open the letter"}
            </button>
          </div>

          <div className="rounded-[2rem] bg-neutral-900 p-8 text-white shadow-2xl md:p-12">
            {!openedLetter ? (
              <div className="flex min-h-[320px] flex-col items-center justify-center text-center">
                <p className="text-sm uppercase tracking-[0.3em] text-rose-300">
                  locked for a second
                </p>
                <h3 className="mt-3 text-3xl font-semibold">
                  open this when you’re ready.
                </h3>
                <p className="mt-4 max-w-md leading-7 text-neutral-300">
                  it’s just a birthday letter. simple, honest, and nothing
                  louder than that.
                </p>
              </div>
            ) : (
              <div>
                <p className="mb-3 text-sm uppercase tracking-[0.2em] text-rose-300">
                  a message for you
                </p>
                <div className="space-y-5 text-[15px] leading-8 text-neutral-200 md:text-base">
                  <p>
                    happy birthday. i know this is late, and maybe that already
                    says a lot about how long i kept thinking about whether i
                    should make this or just keep everything to myself.
                  </p>
                  <p>
                    but i still wanted to leave something here. not because i
                    expect anything from it, and not because i’m trying to make
                    the day about me. i just didn’t want your birthday to pass
                    without at least one real, warm thing from me existing
                    somewhere.
                  </p>
                  <p>
                    i hope this year gives you more than the last one did. more
                    peace, more steady days, more little moments that make life
                    feel less tiring. i hope things work out for you in ways
                    that feel almost unfairly kind.
                  </p>
                  <p>
                    thank you for once being such a meaningful part of my life.
                    not just in the obvious way, but in the quiet way too. you
                    made certain days easier. you made some heavy things feel
                    lighter than they actually were.
                  </p>
                  <p>
                    i still think about you sometimes. not all the time, not in
                    a way that ruins everything, just in the human way. in the
                    way someone important still shows up in random corners of
                    your mind because they mattered there first.
                  </p>
                  <p>
                    i think what i’m trying to say is: i’m not pretending it
                    all meant less just because it ended. it meant a lot. and
                    i’m okay admitting that.
                  </p>
                  <p>
                    i’m also learning that care can change shape. sometimes
                    it’s no longer closeness. sometimes it’s just wishing
                    someone well without needing to be part of where they’re
                    headed next.
                  </p>
                  <p>
                    so that’s really all this is. a small page, a chosen song,
                    a few photos, and one honest wish: i hope you’re happy. i
                    hope life is soft with you. and i hope this year brings you
                    so many good things that you stop being surprised by them.
                  </p>
                  <p>
                    you were a beautiful part of my life once. that stays true.
                    and i think that’s enough for me to say today.
                  </p>
                  <p>happy birthday, again.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="cinematic-section mx-auto max-w-6xl px-6 py-8 md:px-10 md:py-16">
        <div className="grid gap-5 md:grid-cols-3">
          {[
            ["Back to start", "Go back to the first part of the page.", "#hero"],
            ["See the gallery", "Open the memory section again.", "#gallery"],
            ["Read the letter", "Return to the most personal part.", "#message"],
          ].map(([title, desc, link], index) => (
            <a
              key={title}
              href={link}
              className="rounded-[1.75rem] border border-neutral-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <p className="text-sm uppercase tracking-[0.2em] text-rose-400">
                0{index + 1}
              </p>
              <h3 className="mt-2 text-xl font-semibold">{title}</h3>
              <p className="mt-3 leading-7 text-neutral-600">{desc}</p>
            </a>
          ))}
        </div>
      </section>

      <section className="px-6 pb-16 pt-8 md:px-10">
        <div className="mx-auto max-w-4xl rounded-[2rem] border border-neutral-200 bg-white px-6 py-8 text-center shadow-sm md:px-10">
          <p className="text-sm uppercase tracking-[0.25em] text-neutral-400">
            last page
          </p>
          <h2 className="mt-3 text-2xl font-semibold md:text-3xl">
            thank you for once feeling like home.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl leading-7 text-neutral-600">
            no dramatic ending. no complicated message. just a quiet thank you,
            left here on purpose.
          </p>
        </div>
      </section>
    </main>
  );
}