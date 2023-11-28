import React, { useState, useEffect } from 'react';

const ImageCarousel = ({ images }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const goToNextSlide = () => {
        setCurrentIndex((currentIndex + 1) % images.length);
    };

    const goToPrevSlide = () => {
        setCurrentIndex((currentIndex - 1 + images.length) % images.length);
    };



    useEffect(() => {
        // Function to advance to the next slide
        const nextSlide = () => {

            setCurrentIndex((currentIndex + 1) % images.length);

        };

        // Set an interval to change the slide automatically
        const intervalId = setInterval(nextSlide, 3000); // Change image every 3 seconds (adjust as needed)

        // Cleanup the interval when the component unmounts
        return () => {
            clearInterval(intervalId);
        };
    }, [currentIndex, images]);

    return (
        <div className="image-carousel">
            <button onClick={goToPrevSlide} className="carousel-button prev">
                &lt;
            </button>
            <img src={images[currentIndex]} alt={`source ${currentIndex}`} />
            <button onClick={goToNextSlide} className="carousel-button next">
                &gt;
            </button>
        </div>
    );
};

export default ImageCarousel;
