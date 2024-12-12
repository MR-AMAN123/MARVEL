import React from 'react'
import { useNavigate } from 'react-router-dom'

export const Card = ({data}) => {
  let navigate = useNavigate();
  const isValidImage = (thumbnail) => {
    return thumbnail && 
           thumbnail.path && 
           thumbnail.extension && 
    
           !thumbnail.path.includes('image_not_available');
  };

  return (
    <>
    {
      (data)?(
        data
          .filter(item => isValidImage(item.thumbnail)) 
          .map(item => {
            return(
              <div className="card" key={item.id}
              onClick={() => navigate(`/${item.id}`)}>
                <img 
                  src={`${item.thumbnail.path}.${item.thumbnail.extension}`} 
                  alt={item.name || "Marvel Character"} 
                  
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />                      
              <div className="title">
                  <h3>{item.name}</h3>
              </div>
             </div>
            )
          })
      ):""
    }
   
    </>
  )
}