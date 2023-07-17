import React, { useEffect } from 'react';
import { useRef, useState } from 'react';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import  { SkeletonTheme } from 'react-loading-skeleton';


const App = () => {
  const [imagefile , setimagefile ] = useState(null)
  const  [info ,setinfo ]= useState()
  const  [islaoding , setlaoding ] = useState(false)
  const [activeButton, setActiveButton] = useState(null);
  const [fileExists , setfileExists] = useState()
  const  [original ,setoriginal] = useState(false)
  const  [imagedownload , setimagedownload] = useState()
  const imgin = useRef()
  const handleChange = (event) => {
    setimagefile(event.target.files[0]);
  };

  useEffect(() => {
    if (imagefile) {
      setfileExists(true);
    } else {
      setfileExists(false);
    }
  }, [imagefile]);



  useEffect(() => {
    if (fileExists) {
      fetchData();
    }
    else{

    }
  },[fileExists]);


    const fetchData = async () => {
      handleClick(2)
      setlaoding(true)
      const url = 'https://human-background-removal.p.rapidapi.com/cutout/portrait/body';
      const data = new FormData();
      data.append('image', imagefile);
      const options = {
        method: 'POST',
        headers: {
          'X-RapidAPI-Key': "d6470466c8mshd12f4758aad85a5p1635dajsnf915f5d7bd1e",
          'X-RapidAPI-Host': 'human-background-removal.p.rapidapi.com'
        },
        body: data
      };

      try {
        const response = await fetch(url, options);
        const result = await response.json();
        setinfo(result)
        console.log(result);
        setlaoding(false)
        setimagedownload(info.data.image_url)
        console.log(imagedownload)
        console.log(typeof(info.data.image_url))
      } catch (error) {
        console.error(error);
      }
    };
  const uplaod = ()=>{
    document.querySelector('input').click()
  }
  const handleClick = (buttonNumber) => {
    setActiveButton(buttonNumber);
  };

  const origine = () =>{
    setoriginal(true)
    console.log(original)
    handleClick(1)
    
  }
  const removed = ()=>{
    setoriginal(false)
    handleClick(2)
  }
  if(imagefile){
    var imageurl = URL.createObjectURL(imagefile)
  }
  
  const handleImageDownload = () => {
        const url = URL.createObjectURL(info.data.image_url)
        
        console.log(url)
      } 
  return (

    <>
    <div className='container'>
      <div className='title'>
      <svg width="51" height="61" viewBox="0 0 51 61" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect x="2.01933" y="2.4615" width="45.5275" height="56.3486" rx="8" transform="rotate(-0.55647 2.01933 2.4615)" fill="white" stroke="black" stroke-width="4"/>
<line x1="0.355072" y1="29.4542" x2="49.8825" y2="29.4542" stroke="black" stroke-width="4"/>
<line x1="1.59045" y1="44.5811" x2="16.4285" y2="29.8406" stroke="black" stroke-width="4"/>
<line x1="4.58756" y1="53.584" x2="28.0751" y2="30.1552" stroke="black" stroke-width="4"/>
<line x1="8.48681" y1="58.7057" x2="39.7955" y2="30.3994" stroke="black" stroke-width="4"/>
<line x1="22.0706" y1="59.1417" x2="47.5847" y2="33.5869" stroke="black" stroke-width="4"/>
<line y1="-2" x2="21.3107" y2="-2" transform="matrix(0.739536 -0.673117 0.614459 0.788949 33.7293 60.8289)" stroke="black" stroke-width="4"/>
</svg>

        <h1>background remover</h1>
      </div>
      <div className='image-upload'>
        <input type='file' ref={imgin} onChange={handleChange} hidden/>
        <div className='uploader'>
        <button id='upl-button' onClick={uplaod}>
        <svg xmlns="http://www.w3.org/2000/svg" width="27" height="27" viewBox="0 0 27 27" fill="none">
<path d="M14.3929 24.4163H1.80357C1.35977 24.4163 1 24.0669 1 23.6357V1.78054C1 1.34946 1.35977 1 1.80357 1H24.3036C24.7474 1 25.1071 1.34946 25.1071 1.78054V14.009" stroke="white" stroke-opacity="0.97" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M1 17.9118L10.375 14.009L17.7411 17.2613" stroke="white" stroke-opacity="0.97" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M18.4107 10.1063C16.9313 10.1063 15.7321 8.94146 15.7321 7.50452C15.7321 6.06758 16.9313 4.90271 18.4107 4.90271C19.8901 4.90271 21.0893 6.06758 21.0893 7.50452C21.0893 8.94146 19.8901 10.1063 18.4107 10.1063Z" stroke="white" stroke-opacity="0.97" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M17.9643 22.0973H21.9821M21.9821 22.0973H26M21.9821 22.0973V18.1946M21.9821 22.0973V26" stroke="white" stroke-opacity="0.97" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

          
          Uplaod your image</button>
          <p>Or Drop an image</p>
        </div>
      </div>
    </div>
     {imagefile  &&(
      <div className='ruselt-image'>
        <div className='toggel-button'>
          <button id='original-btn' className={`change-bg-button ${activeButton === 1 ? 'active' : ''}`}
        onClick={origine}
      >Original</button>
          <button id='removed-btn' className={`change-bg-button ${activeButton === 2 ? 'active' : ''}`}
        onClick={removed}
      >Removed Background</button>
        </div>
    <div className='image-prev'>
      {info && !islaoding && !original &&(
        <div className='image'>
        <img src={info.data.image_url}/>
        </div>
      )}
      {imagefile &&original &&(
        <div className="image">
          <img src={imageurl}/>
        </div>
      )}
        {islaoding &&(
          <div class="loader">
          <svg class="circular-loader"viewBox="25 25 50 50" >
            <circle class="loader-path" cx="50" cy="50" r="20" fill="none" stroke="black" stroke-width="2" />
          </svg>
        </div>
        )}

      <div className='line'></div>
          <div className='image-downlaod'>
            {islaoding&&(
              <>
              <SkeletonTheme baseColor="#e6e6e6" highlightColor="#c2c0c0">
              <Skeleton height={70} width={250}/>
              <Skeleton width={250} height={30}  style={{marginTop :"20px"}}/>
              </SkeletonTheme>
              </>
            )}
          {info && !islaoding && (
            <>
    <a
   href={info.data.image_url}
   download='Saidos.png'
   target='_blank'
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="27" height="20" viewBox="0 0 27 20" fill="none">
        <path d="M20.0104 10.3952L13.1817 15.4536M13.1817 15.4536L6.35294 10.3952M13.1817 15.4536V1.42856" stroke="white" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M6.35294 18.5714H21.1313" stroke="white" stroke-linecap="round"/>
      </svg>
      Download
    </a>
    <p>Preview Image 760 x 760</p>
    </>
  )}
      </div>
   
    </div>
      </div>
    )}
    </>
  )
}
export default App