import { useEffect, useState } from "react";

const useInfiniteScroll = (elementRef, initial) => {
    const [page, setPage] = useState(0);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                setPage(prevPage => prevPage + 1);
                initial && initial();
            }
        }, { threshold: 0.5 });

        if (elementRef.current) {
            observer.observe(elementRef.current);
        }

        return () => {
            if (elementRef.current) {
                observer.unobserve(elementRef.current);
            }
        };

    }, []);

    return { page };
};

export { useInfiniteScroll };