import './pricing.css';
import Typewriter from "typewriter-effect";
export function Pricing() {
    return (
        <div className="flex justify-center p-11">
            <div className="flex flex-col text-center w-full mt-10">
                        <h1 className="sm:text-5xl text-2xl font-medium title-font  text-gray-900">
                            <Typewriter onInit={(typewriter) => {
                                typewriter
                                    .typeString("Pricing")
                                    .pauseFor(1500)
                                    .start();
                            }} />
                        </h1>
                    </div>
            {/* First Card */}
            <div className="cards__inner w-1/3 mx-4 h-full p-10">
                <div className="cards__card card h-full">
                    <p className="card__heading">Free Tier</p>
                    <p className="card__price">₹0/Month</p>
                    <ul className="card_bullets flow" role="list">
                        <li>- Display of salon's profile on platform</li>
                    </ul>
                    <a className="card__cta cta" href="#basic">Get Started</a>
                </div>
                <div className="overlay cards__inner"></div>
            </div>

            {/* Second Card (Best Seller) */}
            <div className="cards__inner w-1/3 mx-4 h-full">
                <div className="cards__card card border-2 border-blue-500 shadow-lg h-full">
                    <p className="card__label bg-yellow-500 text-white font-bold px-2 py-1 rounded-full absolute  mt-2 mr-2 mb-6">Best Seller</p>
                    <div className='pt-12'>
                    <p className="card__heading">Standard Tier</p>
                    <p className="card__price">₹99/month</p>
                    <ul className="card_bullets flow" role="list">
                        <li>- Display of salon's profile on our platform</li>
                        <li>- Appointment and employee/business management system</li>
                    </ul>
                    <a className="card__cta cta mt-10" href="#standard">Get Started</a>
                    </div>
                </div>
                <div className="overlay cards__inner"></div>
            </div>

            {/* Third Card */}
            <div className="cards__inner w-1/3 mx-4 h-full p-10">
                <div className="cards__card card h-full">
                    <p className="card__heading">Premium Tier</p>
                    <p className="card__price">₹499/month</p>
                    <ul className="card_bullets flow" role="list">
                        <li>- Display of salon's profile on our platform</li>
                        <li>- Appointment and employee/business management system</li>
                        <li>- 'Boost' marketing feature</li>
                    </ul>
                    <a className="card__cta cta" href="#premium">Get Started</a>
                </div>
                <div className="overlay cards__inner"></div>
            </div>
        </div>
    );
}
