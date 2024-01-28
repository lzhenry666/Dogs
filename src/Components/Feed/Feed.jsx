import React from 'react';
import FeedModal from './FeedModal';
import FeedPhotos from './FeedPhotos';
import PropTypes from 'prop-types';
import Input from '../Forms/Input';
import Button from '../Forms/Button';
import { UserContext } from '../../UserContext';
const Feed = ({ user }) => {
  const [modalPhoto, setModalPhoto] = React.useState(null);
  const [pages, setPages] = React.useState([1]);
  const [infinite, setInfinite] = React.useState(true);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [autoCompleteOptions, setAutoCompleteOptions] = React.useState([]);
  const [searchByButton, setSearchByButton] = React.useState(false);
  const { login } = React.useContext(UserContext);

  React.useEffect(() => {
    let wait = false;
    function infiniteScroll() {
      if (infinite) {
        const scroll = window.scrollY;
        const height = document.body.offsetHeight - window.innerHeight;
        if (scroll > height * 0.75 && !wait) {
          setPages((pages) => [...pages, pages.length + 1]);
          wait = true;
          setTimeout(() => {
            wait = false;
          }, 500);
        }
      }
    }


    window.addEventListener('wheel', infiniteScroll);
    window.addEventListener('scroll', infiniteScroll);
    return () => {
      window.removeEventListener('wheel', infiniteScroll);
      window.removeEventListener('scroll', infiniteScroll);
    };
  }, [infinite]);


  function saveSearch(term) {
    let searches = JSON.parse(localStorage.getItem('searches')) || [];

    // Verifique se o termo já existe
    if (!searches.includes(term)) {
      searches.push(term);
    }

    // Salva no localStorage como string separada por vírgulas
    localStorage.setItem('searches', JSON.stringify(searches));
  }


  function handleSearch(event) {
    if (event.type === 'click' || (event.type === 'keypress' && event.key === 'Enter')) {
      saveSearch(searchTerm);
      setSearchByButton(true);  // indica que a pesquisa foi disparada pelo botão
      console.log('dentro do feed',  searchByButton, setSearchByButton)
    }
  }


React.useEffect(() => {
  const searches = JSON.parse(localStorage.getItem('searches')) || [];
  const filtered = searches.filter(term => term.includes(searchTerm));
  setAutoCompleteOptions(filtered); // mantém como um array
}, [searchTerm]);

function handleCleanSearch() {
  localStorage.removeItem('searches');
  setAutoCompleteOptions([]);
}
  return (

    <section>
   {!user && login &&  <div style={{ position: 'relative' }}>
   <Input
  label="Search Trends..."
  value={searchTerm}
  onChange={(e) => setSearchTerm(e.target.value)}
  onKeyPress={handleSearch}  // Adicione isso
/>  {searchTerm && (
    <button
      style={{ position: 'absolute', right: 10, top: '43%', transform: 'translateY(-50%)', cursor: 'pointer', color:  'red',  borderRadius
      : '50%', border: 'none', backgroundColor: 'transparent', fontSize: '1.5rem', fontWeight: 'bold' }}
      onClick={() => setSearchTerm('')}
    >
      x
    </button>
  )}
{searchTerm && (<ul>
  {autoCompleteOptions.map((option, index) => (
    <li key={index} onClick={() => setSearchTerm(option)}>
      {option}
    </li>
  ))}
</ul>)}
<p>Últimos itens buscados: {autoCompleteOptions.join(', ')}...</p>
<a style={{ position: 'absolute', right: 5, top: '70%', transform: 'translateY(-50%)', cursor: 'pointer', color:  'red',  backgroundColor: 'transparent', fontSize: '0.7rem', fontWeight: 'bold' }}onClick={handleCleanSearch}>Limpar ultimas buscas</a>

</div>} {searchTerm && (<Button onClick={handleSearch}  style={{marginBottom:'1rem'}}>Pesquisar</Button>)}

        {modalPhoto && (
        <FeedModal photo={modalPhoto} setModalPhoto={setModalPhoto} />
      )}
      {pages.map((page) => (
        <FeedPhotos
          key={page}
          user={user}
          page={page}
          setModalPhoto={setModalPhoto}
          setInfinite={setInfinite}
          searchTerm={searchTerm}
          searchByButton={searchByButton}
          setSearchByButton={setSearchByButton}        />
      ))}
      {!infinite && !user && (
        <p
          style={{
            textAlign: 'center',
            padding: '2rem 0 4rem 0',
            color: '#888',
          }}
        >
          Não existem mais postagens.
        </p>
      )}
    </section>
  );
};

Feed.defaultProps = {
  user: 0,
};

Feed.propTypes = {
  user: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.number.isRequired,
  ]),
};

export default Feed;
