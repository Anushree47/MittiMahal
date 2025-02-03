import React from 'react'
import Star from 'star-rating-react-component';

const page  = () => {
  let options = {
    name: 'custom',
    numOfStars: 5,
    starsWidth: 40,
    color: "#ffffff",
    bgColor: " #e6e6e6",
    borderColor: "orange",
    scoreColor: "inherit"
  }
  
   function App(){ 
  
     const handleScore = (score) => {
      console.log(score);
   }
  
  return (
      <>
       <Star options={options} handleScore={handleScore}/> 
      </>
       )
  }
}
 

export default page