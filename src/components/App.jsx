import { useEffect, useState } from "react";
import { Searchbar } from "./Searchbar/Searchbar";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { Button } from "./Button/Button";
import { Loader } from "./Loader/Loader";
import { fetchImg } from "api";

let totalImages;

export const App = () => {

  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);

  useEffect(() => {
    async function getImages() {
      if(query === '') return
      
      try {
        setLoading(true);
        setError(null);

        const data = await fetchImg(query, page)
        
        totalImages = data.total;
        
        setImages(prevImages => [...prevImages, ...data.hits]);
        
        if (!data.hits.length) {
          setError('Ooops! Try again!')
        }
        
      } catch (error) {
        if (error.code !== 'ERR_CANCELED') {
          setError('We have some problems')
        }
      } finally {
        setLoading(false);
      }
    }
    getImages();
  },[query, page])

  

  const onSearch = value => {
    if( value === '' || value === query) {
      return 
    }
    setQuery(value);
    setPage(1);
    setImages([]);
    
  }

  const loadMoreBtn = () => {
    setPage(prevPage => prevPage + 1)
  };

  const quantityPages = Math.ceil(totalImages / 12);

  return (
    <div
        style={{
          height: '100vh',
          // display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: 40,
          color: '#010101'
        }}
      >
        <Searchbar onSearch={onSearch}/>
        <ImageGallery images={images}/>
        {loading && <Loader />}
        {quantityPages > 1 && quantityPages !== page && !loading && (
          <Button onClick={loadMoreBtn} />
        )}
        {error && (
          <h2
            
            style={{
              marginTop: 30,
              textAlign: 'center',
            }}
          >
            {error}
          </h2>
        )}
      </div>
  );
}