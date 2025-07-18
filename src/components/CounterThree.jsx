import { useEffect, useRef, useState } from "react";

const CounterThree = () => {
    const data = [
        {
            icon: "asset/images/counter/home3/1.png",
            value: 5,
            label: " Reader ",
            delay: 100,
        },
        {
            icon: "asset/images/counter/home3/2.png",
            value: 3,
            label: " Writers",
            delay: 100,
        },
        {
            icon: "asset/images/counter/home3/3.png",
            value: 5,
            label: "Articles",
            delay: 100,
        },
        {
            icon: "asset/images/counter/home3/4.png",
            value: 25,
            label: " Total Reads ",
            delay: 100,
        },
    ];








    // --- Inline Counter Component ---
    const Counter = ({ className, start, end, delay }) => {
        const [count, setCount] = useState(start);
        const [isEnd, setIsEnd] = useState(false);
        const ref = useRef(null);

        const startCounter = () => {
            let current = start;
            const timer = setInterval(() => {
                if (current < end) {
                    current++;
                    setCount(current);
                } else {
                    clearInterval(timer);
                }
            }, delay);
        };

        useEffect(() => {
            const observer = new IntersectionObserver(
                (entries) => {
                    if (entries[0].isIntersecting && !isEnd) {
                        setIsEnd(true);
                        startCounter();
                    }
                },
                { rootMargin: "0px 0px -100px 0px" }
            );

            if (ref.current) {
                observer.observe(ref.current);
            }

            return () => observer.disconnect();
        }, []);

        useEffect(() => {
            setCount(start);
            setIsEnd(false);
        }, [start]);

        return (
            <span ref={ref} className={className}>
                {count}
            </span>
        );
    };

    return (
        <div className="overflow-hidden  md:py-10 xl:py-10 bg-[#269092]">
            <div className="container ml-32 ">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-48">
                    {data.map((item, index) => (
                        <div
                            key={index}
                            className="flex flex-col items-center text-center md:items-start md:text-left"
                            data-aos="fade-up"
                            data-aos-duration="800"
                            data-aos-delay={item.delay}
                        >
                            <div className="mb-5">
                                <img src={item.icon} alt="count-icon" className="w-[60px] xl:w-auto" />
                            </div>
                            <div>
                                <h3 className="text-white text-3xl font-bold mb-1">
                                    <Counter
                                        className="inline-block"
                                        start={0}
                                        end={item.value}
                                        delay={item.delay}
                                    />
                                    {index === 2 ? "Y+" : "K+"}
                                </h3>
                                <p className="text-white text-lg font-medium">{item.label}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CounterThree;
