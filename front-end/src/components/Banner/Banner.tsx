import { CSSProperties, useState } from "react";
import "./Banner.css";

const Banner = () => {
    const [bannerHeight, setBannerHeight] = useState<number>(
        window.outerHeight
    );

    window.onresize = () => setBannerHeight(window.outerHeight);

    return (
        <div
            style={{ "--height": `${bannerHeight}px` } as CSSProperties}
            className="banner-container"
        >
            <div className="banner-content">
                <h2>Lua</h2>
            </div>
        </div>
    );
};

export default Banner;
