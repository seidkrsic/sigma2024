import { motion } from "framer-motion";

import React, {useEffect, useState } from "react";

import "./ImageSlider.css";

const ImageSlider = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const slides = [
        // {
        //   name: 'Sponzor 1',
        //   logo: require('../../images/sponsor1.jpeg'),
        // //   link: 'https://www.sponzor1.com',
        // },
        // {
        //   name: 'Sponzor 2',
        //   logo: require('../../images/sponsor2.png'),
        // //   link: 'https://www.sponzor2.com',
        // },
        {
          name: 'Sponzor 3',
          logo: require('../../images/sponsor3.jpg'),
        //   link: 'https://www.sponzor3.com',
        },
        // {
        //     name: 'Barber Miloš',
        //     logo: require('../../images/sponsor4.JPG'),
        //   //   link: 'https://www.sponzor3.com',
        //   }, 
          {
            name: 'Art Beton',
            logo: require('../../images/sponsor5.JPG'),
          //   link: 'https://www.sponzor3.com',
          },
          {
            name: 'Firenet',
            logo: require('../../images/sponsor7.png'),
          //   link: 'https://www.sponzor3.com',
          },
          {
            name: 'Studio Abarh',
            logo: require('../../images/sponsor6.jpg'),
          //   link: 'https://www.sponzor3.com',
          },
     
      ];


    const onToNext = () => {
        const isLastIndex = currentIndex === slides.length - 1;
        const newIndex = isLastIndex ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    };

    useEffect(() => {
        // Auto slide every 5 seconds
        const intervalId = setInterval(() => {
            onToNext();
        }, 3000);

        return () => {
            clearInterval(intervalId);
        };
    }, [currentIndex]);

    return (
        <motion.div className="ImageSlider__container">
            <motion.div className={"ImageSlider__container-Image"}
                key={currentIndex}
                initial={{
                    offsetX: currentIndex % 2 === 0 ? -100 : 100,
                    opacity: 0.8,
                }}
                animate={{ x: 0, opacity: 1, animationDuration: 2 }}
                transition={{ duration: 3 }}
            >
                <img
                    src={`${slides[currentIndex]?.logo}`}
                    alt=""
                />

            </motion.div>
        </motion.div>
    );
};

export default ImageSlider;
