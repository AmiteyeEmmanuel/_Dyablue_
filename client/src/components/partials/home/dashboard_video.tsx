import { useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import { dashboadVid, dashboadVid1, dashboadVidSmall, dashboadVidSmall1 } from '../../../assets';

gsap.registerPlugin(ScrollTrigger);

export default function DashboardVideo() {
    const largeScreenVideos = [dashboadVid, dashboadVid1];
    const smallScreenVideos = [dashboadVidSmall, dashboadVidSmall1];
    
    const [videoSrc, setVideoSrc] = useState(window.innerWidth < 760 ? smallScreenVideos : largeScreenVideos);
    const [currentTitle, setCurrentTitle] = useState('User Dashboard');
    const [currentBgColor, setCurrentBgColor] = useState('#ffffff');
    
    const titles = ['User Dashboard', 'Hairstylist Dashboard'];
    const backgroundColors = ['#f3f4f6', '#f3f4f6'];

    const handleVideoSrcSet = () => {
        if(window.innerWidth < 760) {
            setVideoSrc(smallScreenVideos);
        } else {
            setVideoSrc(largeScreenVideos);
        }
    }
  
    useLayoutEffect(() => {
        window.addEventListener('resize', handleVideoSrcSet);
  
        return () => {
            window.removeEventListener('resize', handleVideoSrcSet);
        }
    }, []);

    useLayoutEffect(() => {
        const videos = document.querySelectorAll('video');

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: '#cards',
            
                start: 'left-=120px left',
                end: '+=1200',
                scrub: 1,
                onUpdate: self => {
                    const progress = self.progress;

                    videos.forEach((video, index) => {
                        if (progress >= index / 2 && progress < (index + 1) / 2) {
                            video.play();
                            setCurrentTitle(titles[index]);
                            setCurrentBgColor(backgroundColors[index]);
                        } else {
                            video.pause();
                        }
                    });
                }
            }
        });

        tl.from('.text-transition', {
            opacity: 0,
            y: 50,
            duration: 1,
            ease: 'power2.out'
        });

        tl.to('.card-1', {
            xPercent: 0,
            opacity: 1
        });

        tl.from('.card-2', {
            xPercent: 75,
            opacity: 0
        });

        tl.to('.card-1', {
            scale: 0.98,
            xPercent: -0.4,
            opacity: 0.6
        }, '-=0.3');

        tl.to('.card-2', {
            xPercent: 0,
            opacity: 1
        });

        // tl.from('.card-3', {
        //     xPercent: 75,
        //     opacity: 0
        // });

        tl.to('.card-2', {
            scale: 0.98,
            xPercent: -0.4,
            opacity: 1,
        }, '-=0.3');

        // tl.to('.card-3', {
        //     xPercent: 0,
        //     opacity: 1
        // });
    }, []);

    return (
        <section id='cards' className='relative h-[35rem] lg:h-[80vh] md:h-[50vh] py-10' style={{ backgroundColor: currentBgColor }}>
            <div className="text-center xl:mb-6 mb-6 md:mb-0">
                <h1 className="relative xl:block xl:top-[-1rem] top-[0.5rem] md:top-[5rem] xl:text-5xl text-3xl font-bold italic">{currentTitle}</h1>
            </div>
            <div className="cards relative">
                <div className="absolute bottom-[-18rem] left-0 transform -translate-x-1/2 translate-y-1/2 text-green">
                    <svg width="150" height="100" viewBox="0 0 24 24"><path d="M12 2l10 10-10 10-10-10z"/></svg>
                </div>
                <div className="absolute bottom-0 right-0 transform translate-x-1/2 translate-y-1/2 text-brown">
                    <svg width="150" height="100" viewBox="0 0 24 24"><path d="M12 2l10 10-10 10-10-10z"/></svg>
                </div>
                <video
                    id="video1"
                    playsInline={true}
                    className='card card-1 w-full left-0 top-0 md:px-20 px-10 xl:h-[75vh] h-[50vh] rounded-2xl'
                    preload="auto"
                    muted
                    loop
                >
                    <source src={videoSrc[0]} type="video/mp4" />
                </video>

                <video
                    id="video2"
                    playsInline={true}
                    className='card card-2 w-full lg:left-[20px] top-[-20px] md:px-20 px-10 xl:h-[75vh] h-[50vh] rounded-2xl'
                    preload="auto"
                    muted
                    loop
                >
                    <source src={videoSrc[1]} type="video/mp4" />
                </video>
            </div>
        </section>
    );
}

