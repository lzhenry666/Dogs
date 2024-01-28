import React from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { UserContext } from '../../UserContext';
import { ReactComponent as MinhasFotos } from '../../Assets/feed.svg';
import { ReactComponent as Estatisticas } from '../../Assets/estatisticas.svg';
import { ReactComponent as AdicionarFoto } from '../../Assets/adicionar.svg';
import { ReactComponent as Sair } from '../../Assets/sair.svg';
import styles from './UserHeaderNav.module.css';
import useMedia from '../../Hooks/useMedia';

const UserHeaderNav = () => {
  const { userLogout } = React.useContext(UserContext);
  const mobile = useMedia('(max-width: 40rem)');
  const [mobileMenu, setMobileMenu] = React.useState(false);
  const navigate = useNavigate();

  const { pathname } = useLocation();
  React.useEffect(() => {
    setMobileMenu(false);
  }, [pathname]);

  function handleLogout() {
    userLogout();
    navigate('/login');
  }
  const [tooltip, setTooltip] = React.useState('');
  const [tooltipPosition, setTooltipPosition] = React.useState({ top: 0, left: 0 });
  const tooltipRef = React.useRef();
  function handle_onHover(label, event) {
    const rect = event.currentTarget.getBoundingClientRect();
    setTooltipPosition({
      top: rect.top + window.scrollY - 100,  // 20 é a altura da tooltip, você pode ajustar
    });
    setTooltip(label);
  }
  function handle_onMouseOut() {
    setTooltip('');
  }


  return (
    <>

            <div ref={tooltipRef} className={styles.tooltip} style={{
            top: `${tooltipPosition.top}px`,
            visibility: tooltip ? 'visible' : 'hidden',
            fontWeight: 'bold',
            borderRadius:' 12px'
          }}>
          {tooltip}
        </div>

      {mobile && (
        <button
          aria-label="Menu"
          className={`${styles.mobileButton} ${
            mobileMenu && styles.mobileButtonActive
          }`}
          onClick={() => setMobileMenu(!mobileMenu)}
        ></button>
      )}

      <nav
        className={`${mobile ? styles.navMobile : styles.nav} ${
          mobileMenu && styles.navMobileActive
        }`}
      >
   <NavLink
                to="/conta"
                end
                onMouseOver={(e) => handle_onHover('Minhas Fotos', e)} // Adicionado evento 'e'
                onMouseOut={handle_onMouseOut}
            >
                <MinhasFotos />
                {mobile && 'Minhas Fotos'}
            </NavLink>


       <NavLink
          to="/conta/estatisticas"
          onMouseOver={(e) => handle_onHover('Estatísticas',e)} // Adicionado
          onMouseOut={handle_onMouseOut} // Adicionado
        >
          <Estatisticas />
          {mobile && 'Estatísticas'}
        </NavLink>


        <NavLink
          to="/conta/postar"
          onMouseOver={(e) => handle_onHover('Adicionar Foto',e)} // Adicionado
          onMouseOut={handle_onMouseOut} // Adicionado
        >
          <AdicionarFoto />
          {mobile && 'Adicionar Foto'}
        </NavLink>
        <button
          onClick={handleLogout}
          onMouseOver={(e) => handle_onHover('Sair da Conta',e)} // Adicionado
          onMouseOut={handle_onMouseOut} // Adicionado
        >
          <Sair />
          {mobile && 'Sair'}
        </button>
      </nav>
    </>
  );
};

export default UserHeaderNav;
