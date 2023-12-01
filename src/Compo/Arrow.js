import React, { useState } from 'react'

function Arrow() {
    const [isHovered, setIsHovered] = useState(null);

    const handleContainerHover = (index) => {
        setIsHovered(index);
    };

    const handleContainerLeave = () => {
        setIsHovered(null);
    };
    return (
        <div className="container-row">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((item, index) => (
                <div
                    key={index}
                    className={`container ${isHovered === index ? 'hovered' : ''}`}
                    onMouseEnter={() => handleContainerHover(index)}
                    onMouseLeave={handleContainerLeave}
                >
                    Container {item}
                    {isHovered === index && (
                        <div className="arrow-container">
                            <div className="arrow"></div>
                            <div className="additional-content">
                                Additional Content for Container {item}
                            </div>
                        </div>
                    )}
                </div>
            ))}
        </div>
    )

}

export default Arrow