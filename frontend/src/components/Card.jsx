import React from 'react'

const Card = ({ title, price, imageUrl, id}) => {
  return (
    <div className="bg-slate-100 p-5 rounded-lg border-2 border-lime-200 
    shadow-md space-y-5 mx-5">
      
      {/* Image Section */}
      {imageUrl && (
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-48 object-cover rounded-md"
        />
      )}

      {/* Content Section */}
      <div>
        <h1 className="text-3xl font-bold">{title}</h1>
        <p className="text-gray-700">{description}</p>
        <p className="text-gray-500"><strong>Breed:</strong> {breed}</p>
        
      </div>

      {/* Button Section */}
      <div className="flex gap-5">
        <a
          href={isLogging ? `/adoptionForm?petId=${id}&petTitle=${title}&petImage=${imageUrl}&petBreed=${breed}` : '/login'}
          className="py-2 px-3 inline-flex items-center gap-x-2 
        text-sm font-medium rounded-xl bg-white border
         border-gray-200 text-black hover:bg-gray-100 
        focus:outline-none focus:bg-gray-100 disabled:opacity-50 
        disabled:pointer-events-none dark:bg-neutral-900 
        dark:border-neutral-700 dark:hover:bg-white/10 
        dark:text-white dark:hover:text-white dark:focus:text-white"
          onClick={handleAdoptNow}
        >
          Buy Now
        </a>


        <a
          href={`/product-details/` + id}

          className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-xl border border-transparent bg-lime-400 text-black hover:bg-lime-500 
      focus:outline-none focus:bg-lime-500 transition
       disabled:opacity-50 disabled:pointer-events-none"
          aria-label="Primary Action"
        >
          <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
        </svg>
      </div>
      <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-sm dark:bg-blue-200 dark:text-blue-800 ms-3">
        5.0
      </span>
    </div>

    
    <div className="flex items-center justify-between">

       {/* Product Price */}
      <span className="text-3xl font-bold text-gray-900 dark:text-white">
        {price}
      </span>

      {/* Add to Cart Button */}
      <a
        href="#"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Add to cart
      </a>
    </div>
  </div>
</div>

    
  )
}

export default Card
