import gsap from 'gsap';
import { useLayoutEffect, useRef, useState } from 'react';
import { ScrollTrigger } from 'gsap/all';
import { hightlightsSlides } from '../../../constants';

gsap.registerPlugin(ScrollTrigger);

interface VideoState {
    startPlay: boolean;
    videoId: number;
    isPlaying: boolean;
}

export default function VideoCarousel() {
    const videoRef = useRef<HTMLVideoElement[]>([]);
    const videoSpanRef = useRef<HTMLSpanElement[]>([]);
    const videoDivRef = useRef<HTMLDivElement[]>([]);

    const [video, setVideo] = useState<VideoState>({
        startPlay: false,
        videoId: 0,
        isPlaying: false,
    });

    const [loadedData, setLoadedData] = useState<Event[]>([]);
    const { startPlay, videoId, isPlaying } = video;

    useLayoutEffect(() => {
        gsap.to('#slider', {
            xPercent: -90 * videoId,
            duration: 2.5,
            ease: 'power2.inOut',
        });

        gsap.to('#video', {
            scrollTrigger: {
                trigger: '#video',
                toggleActions: 'restart none none none',
            },
            onComplete: () => {
                setVideo((prev) => ({
                    ...prev,
                    startPlay: true,
                    isPlaying: true,
                }));
            },
        });
    }, [videoId]);

    useLayoutEffect(() => {
        let currentProgress = 0;
        const span = videoSpanRef.current;

        if (span[videoId]) {
            const anim = gsap.to(span[videoId], {
                onUpdate: () => {
                    const progress = Math.ceil(anim.progress() * 100);

                    if (progress !== currentProgress) {
                        currentProgress = progress;

                        gsap.to(videoDivRef.current[videoId], {
                            width: window.innerWidth < 760 ? '10vw' : window.innerWidth < 1200 ? '10vw' : '4vw',
                        });

                        gsap.to(span[videoId], {
                            width: `${currentProgress}%`,
                            backgroundColor: '#000',
                        });
                    }
                },
                onComplete: () => {
                    if (isPlaying) {
                        gsap.to(videoDivRef.current[videoId], {
                            width: '12px',
                        });
                        gsap.to(span[videoId], {
                            backgroundColor: '#afafaf',
                        });
                    }
                },
            });

            if (videoId === 0) {
                anim.restart();
            }

            const animUpdate = () => {
                anim.progress(
                    videoRef.current[videoId].currentTime /
                        hightlightsSlides[videoId].videoDuration
                );
            };

            if (isPlaying) {
                gsap.ticker.add(animUpdate);
            } else {
                gsap.ticker.remove(animUpdate);
            }
        }
    }, [videoId, startPlay, isPlaying]);

    useLayoutEffect(() => {
        if (loadedData.length > 3) {
            if (!isPlaying) {
                videoRef.current[videoId].pause();
            } else {
                startPlay && videoRef.current[videoId].play();
            }
        }
    }, [startPlay, videoId, isPlaying, loadedData]);

    const handleProcess = (type: string, i: number) => {
        switch (type) {
        case 'video-end':
            setVideo((prev) => ({
                ...prev,
                videoId: (i + 1) % hightlightsSlides.length,
            }));
            break;
        case 'pause':
        case 'play':
            setVideo((prev) => ({ ...prev, isPlaying: !prev.isPlaying }));
            break;
        default:
            return video;
        }
    };

    const handleLoadedMetaData = (_i: number, e: React.SyntheticEvent<HTMLVideoElement, Event>) => {
        setLoadedData((prev) => [...prev, e.nativeEvent]);
    };

    const handleClickVideo = (i: number) => {
        if (videoId !== i) {
            setVideo((prev) => ({ ...prev, videoId: i, isPlaying: false }));
        } else {
            setVideo((prev) => ({ ...prev, isPlaying: !prev.isPlaying }));
        }
    };

    return (
        <section className='py-10 px-8 mt-10'>
            <h1 className='text-center justify-center mx-auto md:w-[60%] w-auto text-3xl md:text-5xl mb-14 italic'> Outstanding service enriches the overall experience.</h1>
            <div className="flex items-center">
                {hightlightsSlides.map((list, i) => (
                    <div key={list.id} id="slider" className="pr-2 md:pr-10 flex-shrink-0">
                        <div className="relative md:w-[68vw] w-[70vw] md:h-[80vh] h-[70vh] rounded-xl overflow-hidden">
                            <div className="w-full h-[70vh] flex-center rounded-xl overflow-hidden">
                                <video
                                    id="video"
                                    playsInline={true}
                                    // className={`${list.id === 2 ? 'translate-x-44' : ''} pointer-events-auto w-full h-full object-cover`}
                                    className='pointer-events-auto w-full h-full object-cover'
                                    preload="auto"
                                    muted
                                    ref={(el) => (videoRef.current[i] = el!)}
                                    onClick={() => handleClickVideo(i)}
                                    onEnded={() =>
                                        handleProcess('video-end', i)
                                    }
                                    onPlay={() => setVideo((prev) => ({ ...prev, isPlaying: true }))}
                                    onLoadedMetadata={(e) => handleLoadedMetaData(i, e)}
                                >
                                    <source src={list.video} type="video/mp4" />
                                </video>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="w-full text-center py-8 justify-center mx-auto">
                <h3 className="text-2xl md:text-4xl italic text-justify">
                "Experience the ultimate in hairstyling excellence as we connect you with
                a carefully curated selection of the industry's finest hairstylists. At
                our salon, your time and comfort are not just important; they are our top
                priorities. Our dedicated team goes above and beyond to ensure that every
                moment of your appointment is filled with personalized attention,
                luxurious pampering, and impeccable service. Sit back, relax, and let us
                transform your hair into a work of art while you enjoy a tranquil and
                indulgent experience tailored just for you."
                </h3>
            </div>
        </section>
    );
}
