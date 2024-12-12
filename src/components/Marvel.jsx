import axios from 'axios'; 
import { useState, useEffect } from 'react'; 
import { useParams } from 'react-router-dom'  

export const Marvel = () => {     
  const {id} = useParams();     
  const [item, setitem] = useState();

  const isValidImage = (thumbnail) => {
    return thumbnail && 
           thumbnail.path && 
           thumbnail.extension && 
           !thumbnail.path.includes('image_not_available');
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axios.get(`https://gateway.marvel.com:443/v1/public/characters/${id}?ts=1&apikey=378fc229668545804f19dfc2de4c33e8&hash=371d1b33b05670978e46be0629db05b0`)
        setitem(res.data.data.results[0])
      } catch (error) {
        console.error("API Error:", error);
      }
    }
    fetch();
  }, [id]);

  return (
    <>
    {
      (!item) ? "" : (
        <div className="box-content">
          {isValidImage(item.thumbnail) && (
            <div className="right-box">
              <img 
                src={`${item.thumbnail.path}.${item.thumbnail.extension}`} 
                alt={item.name || "Marvel Character"}
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            </div>
          )}
          <div className="left-box">
            <h1>{item.name}</h1>
            <h4>{item.description}</h4>
          </div>
        </div>
      )
    }
    </>
  ) 
}