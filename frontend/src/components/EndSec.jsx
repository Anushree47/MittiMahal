import Link from "next/link";
import React from "react";

const EndSec = () => {
  return (
    <main>
      {/* end Section */}
      <section className="min-h-[60vh]">
  <div className="grid lg:grid-cols-2 w-[80%] mx-auto h-full">
    <div className="my-auto space-y-5">
      <h1 className="text-4xl font-bold text-center lg:text-left">
        Mitti Mahal 
      </h1>
      <p className="text-gray-700 italic text-lg ">Handcrafted Clay Creations</p>
      <p className="text-center lg:text-left">
        Discover the artistry of handmade clay products, crafted with passion and tradition. Each piece tells a unique story, connecting you to 
      </p>the beauty of earthy craftsmanship.
      <p className="text-center lg:text-left">
        Experience the warmth of tradition in every creation!
      </p>
      <div className="space-x-5 flex justify-center lg:justify-start">
        <a href="/loginForm" className="bg-yellow-900 py-2.5 px-4 text-white rounded-lg border border-yellow-500 transition-all duration-300 ease-in-out transform hover:scale-110 hover:shadow-lg">
          Get Started
        </a>
        <a href="/about" className="py-2.5 px-4 text-yellow-900 rounded-lg border border-yellow-900 transition-all duration-300 ease-in-out transform hover:scale-110 hover:shadow-lg">
          Explore
        </a>
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

      
      {/* Platform review Section */}
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
              <h2 className="text-xl font-bold my-3">
              At Mitti Mahal, sustainability is at the heart of everything we create.
              Our clay products are made using eco-friendly, biodegradable materials that
                leave no harmful impact on the environment. Unlike plastic or metal alternatives, 
                clay decomposes naturally, making it a responsible choice for those who care about the planet. 
                By choosing our products, customers contribute to reducing carbon footprints and supporting a 
                more sustainable future.
              </h2>
              <p>
              Beyond just materials, our production process follows eco-conscious practices.
                We work closely with artisans who use traditional techniques, eliminating the need for industrial machinery that consumes excessive energy.
                  Our commitment to sustainability extends to packaging as well, ensuring minimal waste while delivering beautifully crafted, nature-friendly
                    products to our customers.
              </p>
              <Link href="/about">
              <button className="bg-yellow-900 py-2.5 px-4 text-white rounded-lg border mx-8 my-8  border-yellow-500 transition-all duration-300 ease-in-out transform hover:scale-110 hover:shadow-lg">
                Learn More
              </button>
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-12 w-[80%] mx-auto">
            <div className="col-span-12 lg:col-span-8">
              <h2 className="text-xl font-bold my-3">
              Every space and personality deserves a unique touch, which is why Mitti Mahal offers a diverse range of clay products.
                From classic terracotta pieces that carry the charm of tradition to modern, sleek designs that suit contemporary spaces, 
                we cater to all aesthetics. Whether you are looking for intricate hand-painted pottery, minimalist kitchenware, or sculpted decor,
                  our collection ensures that every customer finds something that resonates with their style.
              </h2>
              <p>
              Our artisans take inspiration from different 
              cultures and artistic expressions, making each product a blend of heritage and creativity.
                Customers can also request customized designs, ensuring that their purchases align with personal preferences. 
                With a variety of textures, shapes, and patterns, Mitti Mahal transforms clay into stunning art 
              that complements both traditional and modern lifestyles.
              </p>
              <Link href="/about">
              <button className="bg-yellow-900 py-2.5 px-4 text-white rounded-lg border mx-8 my-8  border-yellow-500 transition-all duration-300 ease-in-out transform hover:scale-110 hover:shadow-lg">
                Learn More
              </button>
              </Link>
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
                src="undraw_website.png"
                alt=""
              />
            </div>

            <div className="col-span-12 lg:col-span-8">
              <h2 className="text-xl font-bold my-3">
              Shopping for handcrafted clay products has never been easier, 
              thanks to our intuitive and user-friendly website. Mitti Mahal provides a seamless browsing experience 
              where customers can explore different product categories, read detailed descriptions, 
              and view high-quality images of every item. With easy navigation and a clean interface, finding the
                perfect clay creation is just a few clicks away.
              </h2>
              <p>
              Our website also offers secure payment options, real-time order tracking, 
              and customer reviews to help buyers make informed decisions. Additionally, our dedicated support team is always available to assist with queries,
                ensuring a smooth and enjoyable shopping experience. Whether on a desktop or mobile device,
                  our platform guarantees convenience and satisfaction at every step.
              </p>
              <Link href="/about">
              <button className="bg-yellow-900 py-2.5 px-4 text-white rounded-lg border  mx-8 my-8 border-yellow-500 transition-all duration-300 ease-in-out transform hover:scale-110 hover:shadow-lg">
                Learn More
              </button>
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-12 w-[80%] mx-auto">
            <div className="col-span-12 lg:col-span-8">
              <h2 className="text-xl font-bold my-3">
              At Mitti Mahal, we believe that handcrafted art is more than just a 
              product—it’s a story meant to be shared. Our platform allows customers to showcase 
              how they use our clay creations in their homes, inspiring others to embrace eco-friendly 
              and artistic living. Through our social media channels, we encourage a community of 
              craft lovers to connect, exchange ideas, and appreciate the beauty of handmade products.
              </h2>
              <p>
              We also collaborate with artists, designers, and enthusiasts to highlight 
              the significance of clay craftsmanship. Customers can share their experiences, 
              participate in creative workshops, and contribute to the growing appreciation of sustainable, 
              handcrafted goods. Through this shared love for artistry, Mitti Mahal becomes more than a brand—it becomes 
              a movement that celebrates culture, creativity, and conscious living.
              </p>
              <Link href="/about">
              <button className="bg-yellow-900 py-2.5 px-4 text-white rounded-lg border mx-8 my-8  border-yellow-500 transition-all duration-300 ease-in-out transform hover:scale-110 hover:shadow-lg">
                Learn More
              </button>
              </Link>
            </div>

            <div className="col-span-12 lg:col-span-4 order-first lg:order-last">
              <img
                src="undraw_share.png"
                alt=""
              />
            </div>
          </div>
      </section>
    </main>
  );
};

export default EndSec;
