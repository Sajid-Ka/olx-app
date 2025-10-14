import phoneApp from "../../assets/phone-app.webp"
import appStore from "../../assets/appstore_2x.webp"
import playStore from "../../assets/playstore_2x.webp"

const PhoneCard = () => {
    return (
        <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-6xl mx-auto pt-32 pb-96 bg-white rounded-lg shadow-sm ">
            
            <div className="w-full md:w-1/3 mb-6 md:mb-0 flex items-center justify-center">
                <img src={phoneApp} alt="OLX App" className="w-3/4 sm:w-2/3 md:w-full max-w-sm" />
            </div>

            <div className="w-full md:w-1/3 flex flex-col justify-center text-center md:text-left px-4 md:px-6">
                <p className="text-2xl sm:text-3xl font-bold text-black">TRY THE OLX APP</p>
                <p className="text-base sm:text-lg md:text-xl text-black mt-3">
                    Buy, sell and find just about anything using the app on your mobile.
                </p>
            </div>

            <div className="hidden md:block w-[1px] h-24 bg-gray-400 mx-4" ></div>

            <div className="w-full md:w-1/3 text-center md:text-left flex flex-col justify-center mt-6 md:mt-0">
                <p className="text-black mb-4 text-base md:text-lg font-medium">GET YOUR APP TODAY</p>
                <div className="flex justify-center md:justify-start space-x-4">
                    <a 
                        href="https://apps.apple.com/in/app/olx-buy-sell/id913492792" 
                        target="_blank" 
                        rel="noopener noreferrer"
                    >
                        <img src={appStore} alt="App Store" className="w-32 sm:w-36 hover:scale-105 transition-transform duration-200" />
                    </a>

                    <a 
                        href="https://play.google.com/store/apps/details?id=com.olx.southasia" 
                        target="_blank" 
                        rel="noopener noreferrer"
                    >
                        <img src={playStore} alt="Google Play" className="w-32 sm:w-36 hover:scale-105 transition-transform duration-200" />
                    </a>
                </div>
            </div>
        </div>
    )
}

export default PhoneCard
