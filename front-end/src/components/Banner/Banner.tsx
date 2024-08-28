import { CSSProperties, useState } from "react";
import "./Banner.css";

const Banner = () => {
    const [bannerHeight, setBannerHeight] = useState<number>(
        window.innerHeight
    );

    window.onresize = () => setBannerHeight(window.innerHeight);

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
