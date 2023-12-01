// RatingStars.js
import React from 'react';
import { FaStar } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";

// import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { FaStarHalfAlt } from "react-icons/fa";

function RatingStars({ rating }) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    const stars = [];
    for (let i = 0; i < fullStars; i++) {
        stars.push(<FaStar key={i} color='#ffb800' />);
    }

    if (hasHalfStar) {
        stars.push(<FaStarHalfAlt key="half" color='#ffb800' />);
    }

    const remainingStars = 5 - stars.length;
    for (let i = 0; i < remainingStars; i++) {
        stars.push(<FaRegStar key={`empty-${i}`} color='#ffb800' />);
    }

    return <div>{stars}</div>;
}

export default RatingStars;
