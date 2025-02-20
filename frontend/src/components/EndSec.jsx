import React from "react";

const EndSec = () => {
  return (
    <main>
      {/* end Section */}
      <section className="min-h-[60vh]">
  <div className="grid lg:grid-cols-2 w-[80%] mx-auto h-full">
    <div className="my-auto space-y-5">
      <h1 className="text-4xl font-bold text-center lg:text-left">
        Some Website Title
      </h1>
      <p className="text-center lg:text-left">
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Atque, officiis?
        Lorem ipsum dolor sit, amet consectetur adipisicing elit.
      </p>
      <p className="text-center lg:text-left">
        Reiciendis consequuntur quibusdam consequatur dignissimos nam ab
        beatae saepe numquam iste veniam.
      </p>
      <div className="space-x-5 flex justify-center lg:justify-start">
        <button className="bg-yellow-900 py-2.5 px-4 text-white rounded-lg border border-yellow-500 transition-all duration-300 ease-in-out transform hover:scale-110 hover:shadow-lg">
          Get Started
        </button>
        <button className="py-2.5 px-4 text-yellow-900 rounded-lg border border-yellow-900 transition-all duration-300 ease-in-out transform hover:scale-110 hover:shadow-lg">
          Explore
        </button>
      </div>
    </div>
    <div className="my-auto order-first lg:order-last">
      <img
        className="w-full transition-all duration-500 ease-in-out transform hover:scale-105 hover:-translate-y-2"
        src="illustrationMan.png"
        alt="end1"
      />
    </div>
  </div>
</section>

      
      {/* Product Cards Section */}
      <section className="py-6">
  <h2 className="text-center text-3xl font-bold mb-6">Customer Reviews</h2>
  <div className="grid grid-cols-2 lg:grid-cols-4 w-[80%] mx-auto gap-4">
    {[
      { name: "Ananya Sharma", designation: "Home Decor Enthusiast", rating: 5, review: "The handcrafted pots are simply beautiful! Perfect for my home." },
      { name: "Vikram Patel", designation: "Art Collector", rating: 4, review: "The detailing on the clay sculptures is amazing. Truly a masterpiece!" },
      { name: "Meera Joshi", designation: "Cafe Owner", rating: 5, review: "Loved the earthen cups! They add a rustic charm to my cafe." },
      { name: "Rohan Verma", designation: "Interior Designer", rating: 4, review: "Great quality and design! Perfect for sustainable home decor." },
      { name: "Sonia Kapoor", designation: "Gift Shop Owner", rating: 5, review: "Unique clay items that my customers love! Will order again." },
      { name: "Arjun Singh", designation: "Eco-friendly Advocate", rating: 4, review: "Loved the biodegradable clay utensils! Perfect for a green lifestyle." },
      { name: "Priya Das", designation: "Handmade Crafts Lover", rating: 5, review: "The clay diyas were stunning! Perfect for festive decor." },
      { name: "Deepak Malhotra", designation: "Terracotta Artist", rating: 4, review: "Authentic and well-crafted pieces. Great for inspiration!" },
    ].map((item, index) => (
      <div key={index} className="border-2 rounded-xl overflow-hidden bg-white p-6 shadow-md hover:scale-105 transition-transform duration-300">
        <h3 className="text-lg font-bold">{item.name}</h3>
        <p className="text-sm text-gray-500">{item.designation}</p>
        <p className="text-yellow-500 text-xl my-2">{"★".repeat(item.rating)}{"☆".repeat(5 - item.rating)}</p>
        <p className="text-gray-700 italic">"{item.review}"</p>
      </div>
    ))}
  </div>
</section>
      
      {/* Features Section */}
      <section className="py-6 space-y-10">
        <h2 className="text-center text-3xl font-bold mb-6">Our Features</h2>
        <div className="grid grid-cols-12 w-[80%] mx-auto">
            <div className="col-span-12 lg:col-span-4 order-first">
              <img src="undraw_love-it_8pc0.png" alt="" />
            </div>

            <div className="col-span-12 lg:col-span-8">
              <h2 className="text-2xl font-bold my-3">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Pariatur, rerum quia eligendi ab quod recusandae debitis aperiam
                earum molestias voluptatibus?
              </h2>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi
                at pariatur rerum laborum facere. Velit quod ut rerum illum vel
                sapiente numquam voluptatem, obcaecati delectus officiis.
                Debitis exercitationem eos eius.
              </p>
              <button className="bg-yellow-900 py-2.5 px-4 text-white rounded-lg border mx-8 my-8  border-yellow-500 transition-all duration-300 ease-in-out transform hover:scale-110 hover:shadow-lg">
                Learn More
              </button>
            </div>
          </div>

          <div className="grid grid-cols-12 w-[80%] mx-auto">
            <div className="col-span-12 lg:col-span-8">
              <h2 className="text-2xl font-bold my-3">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Pariatur, rerum quia eligendi ab quod recusandae debitis aperiam
                earum molestias voluptatibus?
              </h2>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi
                at pariatur rerum laborum facere. Velit quod ut rerum illum vel
                sapiente numquam voluptatem, obcaecati delectus officiis.
                Debitis exercitationem eos eius.
              </p>
              <button className="bg-yellow-900 py-2.5 px-4 text-white rounded-lg border mx-8 my-8  border-yellow-500 transition-all duration-300 ease-in-out transform hover:scale-110 hover:shadow-lg">
                Learn More
              </button>
            </div>

            <div className="col-span-12 lg:col-span-4 order-first lg:order-last">
              <img
                src="undraw_choose-card_es1o.png"
                alt=""
              />
            </div>
          </div>

          <div className="grid grid-cols-12 w-[80%] mx-auto">
            <div className="col-span-12 lg:col-span-4 order-first">
              <img
                src="undraw_undraw_undraw_undraw_undraw_undraw_undraw_shopping_bags_2ude_-1-_mnw3_-2-_q7y0_muk6_-2-_l1mh_-2-_m4xj_wqq4.svg"
                alt=""
              />
            </div>

            <div className="col-span-12 lg:col-span-8">
              <h2 className="text-2xl font-bold my-3">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Pariatur, rerum quia eligendi ab quod recusandae debitis aperiam
                earum molestias voluptatibus?
              </h2>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi
                at pariatur rerum laborum facere. Velit quod ut rerum illum vel
                sapiente numquam voluptatem, obcaecati delectus officiis.
                Debitis exercitationem eos eius.
              </p>
              <button className="bg-yellow-900 py-2.5 px-4 text-white rounded-lg border  mx-8 my-8 border-yellow-500 transition-all duration-300 ease-in-out transform hover:scale-110 hover:shadow-lg">
                Learn More
              </button>
            </div>
          </div>

          <div className="grid grid-cols-12 w-[80%] mx-auto">
            <div className="col-span-12 lg:col-span-8">
              <h2 className="text-2xl font-bold my-3">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Pariatur, rerum quia eligendi ab quod recusandae debitis aperiam
                earum molestias voluptatibus?
              </h2>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi
                at pariatur rerum laborum facere. Velit quod ut rerum illum vel
                sapiente numquam voluptatem, obcaecati delectus officiis.
                Debitis exercitationem eos eius.
              </p>
              <button className="bg-yellow-900 py-2.5 px-4 text-white rounded-lg border mx-8 my-8  border-yellow-500 transition-all duration-300 ease-in-out transform hover:scale-110 hover:shadow-lg">
                Learn More
              </button>
            </div>

            <div className="col-span-12 lg:col-span-4 order-first lg:order-last">
              <img
                src="undraw_undraw_undraw_undraw_businessman_e7v0_qrld_-1-_hvmv_(1)_ik9c.png"
                alt=""
              />
            </div>
          </div>
      </section>
    </main>
  );
};

export default EndSec;
