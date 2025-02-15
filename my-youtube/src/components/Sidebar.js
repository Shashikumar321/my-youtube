import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Sidebar = () => {

    const isMenuOpen = useSelector(store => store.app.isMenuOpen);

    if(!isMenuOpen) return null;

    return (
        <div className="mt-16 col-span-1 p-4 shadow-md">
            
            <div>
                <ul>
                    <Link to="/"> <li>Home</li></Link>
                    <li>Shorts</li>
                    <li>Videos</li>
                    <li>Live</li>
                </ul>
            </div>

            <div>
                <h1 className="pt-6 font-bold ">Subscriptions</h1>
                <ul>
                    <li>Music</li>
                    <li>Sports</li>
                    <li>Gaming</li>
                    <li>Movies</li>
                    <li>Cars</li>
                    <li>Nature</li>
                </ul>
            </div>

            <div>
                <h1 className="pt-6 font-bold ">Watch Later</h1>
                <ul>
                    <li>Trending</li>
                    <li>Shopping</li>
                    <li>Gaming</li>
                    <li>News</li>
                    <li>Sports</li>
                    <li>Fashion</li>
                </ul>
            </div>
            <ul>

            </ul>
        </div>
    )
}


export default Sidebar;