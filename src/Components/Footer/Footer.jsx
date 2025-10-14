import facebook from "../../assets/facebook.svg"
import instagram from "../../assets/instagram.svg"
import youtube from "../../assets/youtube.svg"
import twitter from "../../assets/twitter.svg"
import whatsapp from "../../assets/watsapp.svg"
import linkedin from "../../assets/linkedin.svg"
import appStore from "../../assets/appstore_3x.webp"
import playStore from "../../assets/playstore_3x.webp"

import cartradetech from "../../assets/cartradetech.svg"; 
import olxlogo from "../../assets/olxwhite.svg";
import carwale from "../../assets/carwale.svg";
import bikewale from "../../assets/bikewale.svg";
import cartrade from "../../assets/cartrade.svg";
import mobility from "../../assets/mobility.svg";

const Footer = () => {

    return (
        <footer className="bg-[#f8f8f8] text-gray-500 text-sm md:text-base">
            <div className="bg-[#f8f8f8] py-10">
                <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8">
                    <div>
                        <h3 className="font-bold text-black mb-3 uppercase text-sm">
                            Popular Locations
                        </h3>
                        <ul className="space-y-1">
                            <li className="hover:text-black cursor-pointer text-xs">Kolkata</li>
                            <li className="hover:text-black cursor-pointer text-xs">Mumbai</li>
                            <li className="hover:text-black cursor-pointer text-xs">Chennai</li>
                            <li className="hover:text-black cursor-pointer text-xs">Pune</li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-bold text-black mb-3 uppercase text-sm">
                            Trending Locations
                        </h3>
                        <ul className="space-y-1">
                            <li className="hover:text-black cursor-pointer text-xs">Bhubaneshwar</li>
                            <li className="hover:text-black cursor-pointer text-xs">Hyderabad</li>
                            <li className="hover:text-black cursor-pointer text-xs">Chandigarh</li>
                            <li className="hover:text-black cursor-pointer text-xs">Nashik</li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-bold text-black mb-3 uppercase text-sm">
                            About Us
                        </h3>
                        <ul className="space-y-1">
                            <li className="hover:text-black cursor-pointer text-xs">Tech@OLX</li>
                            <li className="hover:text-black cursor-pointer text-xs">Careers</li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-bold text-black mb-3 uppercase text-sm">OLX</h3>
                        <ul className="space-y-1">
                            <li className="hover:text-black cursor-pointer text-xs">Blog</li>
                            <li className="hover:text-black cursor-pointer text-xs">Help</li>
                            <li className="hover:text-black cursor-pointer text-xs">Sitemap</li>
                            <li className="hover:text-black cursor-pointer text-xs">
                                Legal & Privacy information
                            </li>
                            <li className="hover:text-black cursor-pointer text-xs">
                                Vulnerability Disclosure Program
                            </li>
                        </ul>
                    </div>
                    <div>
                            <h3 className="font-bold text-black mb-1 uppercase text-sm">
                                Follow Us
                            </h3>
                            <div className="flex space-x-2 mb-4">
                                <img src={facebook} alt="Facebook" className="w-6 h-6 cursor-pointer" />
                                <img src={instagram} alt="Instagram" className="w-6 h-6 cursor-pointer" />
                                <img src={youtube} alt="YouTube" className="w-6 h-6 cursor-pointer" />
                                <img src={twitter} alt="Twitter" className="w-6 h-6 cursor-pointer" />
                                <img src={whatsapp} alt="WhatsApp" className="w-6 h-6 cursor-pointer" />
                                <img src={linkedin} alt="LinkedIn" className="w-6 h-6 cursor-pointer" />
                            </div>
                            <div className="flex flex-col space-y-3">
                                <img src={playStore} alt="Google Play" className="w-[150px] cursor-pointer" />
                                <img src={appStore} alt="App Store" className="w-[150px] cursor-pointer" />
                            </div>
                    </div>
                </div>
            </div>

            <div className="bg-[#003f99] py-8">
                <div className="w-full flex flex-col text-white">
                    <div className="flex items-center justify-between w-full px-36">
                        <img src={cartradetech} alt="CarTrade Tech" className="w-[160px] h-[120px]" />
                        <div className="w-[1px] h-24 bg-white"></div>
                        <img src={olxlogo} alt="OLX" className="w-[70px] " />
                        <img src={carwale} alt="CarWale" className="w-[90px]" />
                        <img src={bikewale} alt="BikeWale" className="w-[100px]" />
                        <img src={cartrade} alt="CarTrade" className="w-[100px]" />
                        <img src={mobility} alt="Mobility Outlook" className="w-[130px]" />
                    </div>
                </div>
                <div className="flex justify-between w-full px-36 pt-4">
                    <div className="text-center text-xs text-white/80">
                        Help-Sitemap
                    </div>
                    <div className="text-center text-xs text-white/80">
                        All rights reserved © 2006–2025 OLX
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer