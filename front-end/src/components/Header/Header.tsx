import { faHouse, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, NavLink } from "react-router-dom";
import "./Header.css";
import { useEffect, useRef, useState } from "react";

const Header = () => {
    const [position, setPosition] = useState<{ x: number; y: number }>({
        x: 0,
        y: 0,
    });
    const [search, setSearch] = useState<{ value: string; isFocus: boolean }>({
        value: "",
        isFocus: false,
    });
    const headerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setPosition({
                x: e.clientX,
                y: e.clientY,
            });
            const isInX = position.x >= 190 && position.x <= 1150;
            const isInY = position.y >= 0 && position.y <= 80;

            if ((isInX && isInY) || search.isFocus) {
                headerRef.current?.classList.add("mount");
            } else {
                headerRef.current?.classList.remove("mount");
            }
        };
        document.addEventListener("mousemove", handleMouseMove);
        return () => {
            document.removeEventListener("mousemove", handleMouseMove);
        };
    }, [position]);

    return (
        <div ref={headerRef} className="header-container">
            <div className="header-content">
                <Link to="/" className="logo">
                    <FontAwesomeIcon className="home-icon" icon={faHouse} />
                </Link>
                <div className="search-bar">
                    <input
                        onBlur={() =>
                            setSearch((prev) => ({
                                ...prev,
                                isFocus: false,
                            }))
                        }
                        onFocus={() =>
                            setSearch((prev) => ({
                                ...prev,
                                isFocus: true,
                            }))
                        }
                        value={search.value}
                        onChange={(e) =>
                            setSearch((prev) => ({
                                ...prev,
                                value: e.target.value,
                            }))
                        }
                        placeholder="Search for products"
                        type="search"
                    />
                    <FontAwesomeIcon className="search-icon" icon={faSearch} />
                </div>
                <nav className="nav-bar">
                    <NavLink to="/dashboard">Dashboard</NavLink>
                    <NavLink to="/products">Products</NavLink>
                </nav>
                <div className="user-section">
                    <div className="guest">
                        <button className="guest-btn sign-in-btn">
                            Sign-in
                        </button>
                        <button className="guest-btn sign-up-btn">
                            Sign-up
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;
