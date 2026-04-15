"use client";

import Image from "next/image";
import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { supabase } from "@/lib/supabase";

type WallMessage = {
  id?: string;
  name: string;
  message: string;
  created_at?: string;
};

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
  const [visitorName, setVisitorName] = useState("");
  const [visitorMessage, setVisitorMessage] = useState("");
  const [wallMessages, setWallMessages] = useState<WallMessage[]>([]);
  const [storyStep, setStoryStep] = useState(0);
  const [autoPlayFilm, setAutoPlayFilm] = useState(false);
  const [sceneVisible, setSceneVisible] = useState(true);
  const [sendingMessage, setSendingMessage] = useState(false);

  const introText =
    "hey, this is a late little gift. aku tahu ini telat, but i still wanted to make something that feels warm, personal, and very you.";

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
        text: "Bukan lagu yang rasanya mau bikin semuanya jadi besar. Lebih ke lagu yang duduk pelan di kepala, kayak seseorang yang masih kadang kepikiran tanpa dipanggil.",
      },
      {
        title: "It feels familiar",
        text: "Ada rasa dekat yang susah dijelasin, dan lagu ini punya rasa itu. Kayak sesuatu yang udah berubah, tapi jejaknya belum benar-benar pergi.",
      },
      {
        title: "It feels honest",
        text: "Aku pilih lagu ini bukan karena mau bikin semuanya sedih, tapi karena ini yang paling mirip sama cara aku nginget kamu: pelan, random, tapi nyata.",
      },
    ],
    []
  );

  const storyScenes = useMemo<StoryScene[]>(
    () => [
      {
        title: "we met in high school",
        subtitle: "the first time life quietly introduced us.",
        text: "semuanya mulai di masa sma. awalnya cuma dua orang yang kebetulan ada di tempat yang sama, belum tahu kalau nanti satu sama lain bakal jadi bagian penting dari cerita ini.",
        image: "/story/1-sma.png",
        bubbleLeft: "so this is where it starts.",
        bubbleRight: "i didn’t know this would matter so much.",
        theme: "from-sky-100 via-white to-rose-50",
      },
      {
        title: "one committee, one concert, one beginning",
        subtitle: "we got closer because life kept putting us side by side.",
        text: "karena satu kepanitiaan konser yang sama, kita jadi lebih sering ketemu, lebih sering ngobrol, dan pelan-pelan mulai saling kenal lebih dalam. dari yang awalnya biasa, semuanya mulai terasa beda.",
        image: "/story/2-panitia-konser.png",
        bubbleLeft: "i like being here with you.",
        bubbleRight: "me too. more than i expected.",
        theme: "from-violet-100 via-rose-50 to-white",
      },
      {
        title: "then it became us",
        subtitle: "from quietly close to something real.",
        text: "dari banyak momen kecil yang nggak terlalu heboh, hubungan ini akhirnya tumbuh jadi sesuatu yang nyata. pelan, tapi tulus. dan untuk beberapa waktu, itu terasa cukup.",
        image: "/story/3-mulai-hubungan.png",
        bubbleLeft: "this feels special.",
        bubbleRight: "yeah… it really does.",
        theme: "from-rose-100 via-amber-50 to-white",
      },
      {
        title: "i graduated first",
        subtitle: "and life started moving faster for me.",
        text: "karena aku senior, aku harus lulus duluan. setelah itu, hidup bawa aku masuk ke Poltek SSN. dari sini ritme hidup mulai berubah, dan jarak mulai pelan-pelan mengambil perannya sendiri.",
        image: "/story/4-poltek-ssn.png",
        bubbleLeft: "you’re really moving forward.",
        bubbleRight: "i wish i could pause time a little.",
        theme: "from-sky-100 via-slate-50 to-white",
      },
      {
        title: "we learned how to stay close through a screen",
        subtitle: "distance changed the way we met each other.",
        text: "karena kesibukan dan jarak, kita jadi lebih sering ketemu lewat video call. kadang singkat, kadang cuma sebentar, tapi tetap jadi cara buat saling hadir walau nggak di tempat yang sama.",
        image: "/story/5-videocall.png",
        bubbleLeft: "can you hear me clearly?",
        bubbleRight: "clear enough to miss you more.",
        theme: "from-indigo-100 via-sky-50 to-white",
      },
      {
        title: "then you graduated and went to toronto",
        subtitle: "the world asked even more from you.",
        text: "setelah kamu lulus, kamu melanjutkan pendidikan ke Toronto, Canada. dari situ, jarak kita jadi makin jauh. bukan cuma tempat yang beda, tapi juga jam yang sering nggak sejalan.",
        image: "/story/6-toronto.png",
        bubbleLeft: "i have to go farther now.",
        bubbleRight: "then go. i’ll still be proud of you.",
        theme: "from-indigo-200 via-white to-cyan-50",
      },
      {
        title: "we had to focus on our own dreams",
        subtitle: "sometimes loving someone also means letting life happen.",
        text: "akhirnya kita sama-sama harus fokus mengejar cita-cita. video call jadi makin singkat, waktu jadi makin susah dipertemukan, dan hidup seperti minta kita tumbuh masing-masing dulu sebelum bisa berharap lebih jauh.",
        image: "/story/7-mengejar-mimpi.png",
        bubbleLeft: "maybe this is how we grow.",
        bubbleRight: "even if it hurts.",
        theme: "from-slate-900 via-slate-800 to-slate-900",
      },
      {
        title: "and maybe, one day",
        subtitle: "better timing, better versions of us.",
        text: "aku masih nyimpen harapan itu dengan tenang. semoga suatu saat nanti, kita bisa bertemu lagi dalam posisi yang lebih baik, lebih sukses, lebih siap, dan lebih dewasa buat menjalani sesuatu yang baru. aamiin.",
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

    const fetchMessages = async () => {
      const { data, error } = await supabase
        .from("messages")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error && data) {
        setWallMessages(data);
      }
    };

    fetchMessages();

    return () => {
      audio.pause();
    };
  }, []);

  useEffect(() => {
    const channel = supabase
      .channel("messages-realtime")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "messages" },
        (payload) => {
          const newMessage = payload.new as WallMessage;
          setWallMessages((prev) => {
            const exists = prev.some((item) => item.id === newMessage.id);
            if (exists) return prev;
            return [newMessage, ...prev].slice(0, 50);
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
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

  const handleSubmitMessage = async (e: FormEvent) => {
    e.preventDefault();
    if (!visitorName.trim() || !visitorMessage.trim()) return;

    setSendingMessage(true);

    const newMessage = {
      name: visitorName.trim(),
      message: visitorMessage.trim(),
    };

    const { error } = await supabase.from("messages").insert([newMessage]);

    if (!error) {
      setVisitorName("");
      setVisitorMessage("");
    } else {
      alert("Pesan gagal dikirim. Cek policy Supabase atau koneksi internet.");
    }

    setSendingMessage(false);
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
              before you go in, press play ya. i wanted the first feeling of
              this page to sound like something soft.
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
                  i hope this year feels gentler to you.
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
              because it sounds like remembering someone softly.
            </h2>
            <div className="mt-5 space-y-4 text-neutral-600">
              <p className="leading-7">
                bukan tipe lagu yang terasa terlalu besar. it just feels close.
                kayak perasaan yang datang diam-diam, terus duduk sebentar,
                terus bikin kamu mikir ke orang yang sama lagi.
              </p>
              <p className="leading-7">
                aku pilih lagu ini karena rasanya familiar. not because it’s
                the saddest song ever, tapi karena cara dia tinggal itu mirip
                sama beberapa hal tentang kamu di kepala aku.
              </p>
              <p className="leading-7">
                and maybe that’s the most honest reason. some people leave the
                room, but the feeling of them doesn’t really rush to leave.
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
                aku bikin ini dari lama. maybe you never noticed, maybe that’s
                okay. but i still wanted this page to keep it here, because some
                songs say things better than people do.
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
                  kalau embed-nya nggak kebuka di device tertentu, pakai tombol
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
              write something here.
            </h2>
            <p className="mt-4 leading-7 text-neutral-600">
              pesan yang ditulis di sini sekarang tersimpan online. jadi pesan
              dari device lain juga bisa masuk, kebaca, dan muncul ke semua
              orang yang buka halaman ini.
            </p>

            <form onSubmit={handleSubmitMessage} className="mt-6 space-y-4">
              <input
                value={visitorName}
                onChange={(e) => setVisitorName(e.target.value)}
                placeholder="Your name"
                className="w-full rounded-2xl border border-neutral-300 px-4 py-3 outline-none transition focus:border-rose-400"
              />
              <textarea
                value={visitorMessage}
                onChange={(e) => setVisitorMessage(e.target.value)}
                placeholder="Leave your message..."
                rows={4}
                className="w-full rounded-2xl border border-neutral-300 px-4 py-3 outline-none transition focus:border-rose-400"
              />
              <button
                type="submit"
                disabled={sendingMessage}
                className="rounded-2xl bg-rose-500 px-5 py-3 text-sm font-medium text-white shadow-lg transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {sendingMessage ? "Sending..." : "Send message"}
              </button>
            </form>
          </div>
        </div>

        <div className="mt-6 rounded-[2rem] border border-neutral-200 bg-white p-8 shadow-sm">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-rose-400">
                message wall
              </p>
              <h3 className="mt-2 text-2xl font-semibold">
                messages i can read here
              </h3>
            </div>
            <span className="rounded-full bg-rose-50 px-4 py-2 text-sm text-rose-500">
              {wallMessages.length} saved
            </span>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {wallMessages.length === 0 ? (
              <div className="rounded-2xl bg-neutral-50 p-5 text-neutral-500">
                no messages yet. the first one can start here.
              </div>
            ) : (
              wallMessages.map((item, index) => (
                <div
                  key={`${item.id ?? item.name}-${index}`}
                  className="rounded-2xl bg-neutral-50 p-5"
                >
                  <p className="font-semibold text-neutral-800">{item.name}</p>
                  <p className="mt-2 leading-7 text-neutral-600">
                    {item.message}
                  </p>
                </div>
              ))
            )}
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