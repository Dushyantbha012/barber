import './pricing.css';

export function Pricing() {
    return (
        <div className="flex justify-center p-11">
            {/* First Card */}
            <div className="cards__inner w-1/3 mx-4 h-full p-10">
                <div className="cards__card card h-full">
                    <p className="card__heading">Free Plan</p>
                    <p className="card__price">$0/month</p>
                    <ul className="card_bullets flow" role="list">
                        <li>Access to all features</li>
                        <li>Unlimited storage</li>
                        <li>No ads</li>
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
                    <p className="card__heading">Standard Plan</p>
                    <p className="card__price">$10/month</p>
                    <ul className="card_bullets flow" role="list">
                        <li>Access to all features</li>
                        <li>10GB storage</li>
                        <li>No ads</li>
                    </ul>
                    <a className="card__cta cta" href="#standard">Get Started</a>
                    </div>
                </div>
                <div className="overlay cards__inner"></div>
            </div>

            {/* Third Card */}
            <div className="cards__inner w-1/3 mx-4 h-full p-10">
                <div className="cards__card card h-full">
                    <p className="card__heading">Premium Plan</p>
                    <p className="card__price">$20/month</p>
                    <ul className="card_bullets flow" role="list">
                        <li>Access to all features</li>
                        <li>Unlimited storage</li>
                        <li>No ads</li>
                        <li>24/7 Support</li>
                    </ul>
                    <a className="card__cta cta" href="#premium">Get Started</a>
                </div>
                <div className="overlay cards__inner"></div>
            </div>
        </div>
    );
}
