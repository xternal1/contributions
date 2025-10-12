import shape01 from '../../assets/shape/breadcrumb_shape01.svg.png';
import shape02 from '../../assets/shape/breadcrumb_shape02.svg.png';
import shape03 from '../../assets/shape/breadcrumb_shape03.svg.png';
import shape04 from '../../assets/shape/breadcrumb_shape04.svg.png';
import shape05 from '../../assets/shape/breadcrumb_shape05.svg.png';

const BackgroundShapes = () => {
    return (
        <>
            {/* Shape 01 - Kiri Atas */}
            <img
                src={shape01}
                alt="Shape 1"
                className="absolute top-5 sm:top-13 left-7 sm:left-20 w-12 sm:w-13 h-auto animate-slide-in-left animate-up-down"
            />

            {/* Shape 02 - Kanan Atas */}
            <img
                src={shape02}
                alt="Shape 2"
                className="absolute top-10 right-50 2xl:right-120 xl:right-120 md:right-110 sm:right-120 w-10 2xl:w-12 xl:w-12 md:w-11 sm:w-12 h-auto animate-slide-in-top"
            />

            {/* Shape 03 - Kanan Tengah */}
            <img
                src={shape03}
                alt="Shape 3"
                className="absolute top-20 right-25 2xl:right-80 xl:right-80 md:right-70 sm:right-70 w-8 2xl:w-12 xl:w-12 md:w-11 sm:w-12 h-auto animate-slide-in-bottom"
            />

            {/* Shape 04 - Kanan Atas Kecil */}
            <img
                src={shape04}
                alt="Shape 4"
                className="absolute top-7 right-25 2xl:right-35 md:right-30 sm:right-30 w-6 2xl:w-10 xl:w-10 md:w-10 sm:w-9 h-auto animate-slide-in-left"
            />

            {/* Shape 05 - Kanan Pojok */}
            <img
                src={shape05}
                alt="Shape 5"
                className="absolute top-2 right-2 2xl:right-5 md:right-1 sm:right-0 w-90 2xl:w-105 md:w-100 sm:w-100 h-auto animate-slide-in-right max-md:hidden"
            />
        </>
    );
};

export default BackgroundShapes;
