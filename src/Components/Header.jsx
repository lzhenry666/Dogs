import React from 'react';
import styles from './Header.module.css';
import { Link } from 'react-router-dom';
import { ReactComponent as Dogs } from '../Assets/dogs.svg';
import { UserContext } from '../UserContext';

const Header = () => {
  const { data,userLogout } = React.useContext(UserContext);
  console.log(`🚀 ~ file: Header.jsx:9 ~ Header ~ data:`, data);
  const [showDropdown, setShowDropdown] = React.useState(false); // Estado para controlar o dropdown

  function handleSeetings(){
    console.log("handleSeetings chamado"); // Para debug
    setShowDropdown(!showDropdown);
  }
  function logout() {
    userLogout();
  }

  React.useEffect(() => {
    function handleDocumentClick(event) {
      const dropdownElement = document.querySelector('.' + styles.dropdown);
      const toggleElement = document.querySelector('.' + styles.login); // O elemento que abre o dropdown

      if (dropdownElement && !dropdownElement.contains(event.target) && event.target !== toggleElement) {
        setShowDropdown(false);
      }
    }

    if (showDropdown) {
      // Adicione um pequeno atraso para evitar que o dropdown seja fechado imediatamente.
      const timer = setTimeout(() => {
        document.addEventListener('click', handleDocumentClick);
      }, 10);

      return () => {
        clearTimeout(timer);
        document.removeEventListener('click', handleDocumentClick);
      };
    }
  }, [showDropdown, styles.dropdown]);


  const dropdownClass = showDropdown ? `${styles.dropdown} ${styles.show}` : styles.dropdown;

  console.log("Estado do dropdown:", showDropdown); // Para debug

  const [fullName, setFullName] = React.useState('');

  React.useEffect(() => {
    if (data) {
      const newFullName = data.first_name + ' ' + data.last_name;
      if (newFullName !== fullName) {
        setFullName(newFullName);
      }
    }
  }, [data, fullName]);
  return (
    <header className={styles.header}>
      <nav className={`${styles.nav} container`}>
        <Link className={styles.logo} to="/" aria-label="Dogs - Home">
          <Dogs />
        </Link>
        {data ? (
          <Link className={styles.login} to="/conta"  onClick={handleSeetings}>
           <div className={styles.user_menu}>

   <img className={styles.user_profile} src={data.profile_pic} alt=""/>
   <div className={styles.user_name}> {fullName}</div>

   </div>
{showDropdown && (   <ul className={dropdownClass}>
  <li><Link to="/settings">Configurações</Link></li>
                <li onClick={logout}>Log out</li>
              </ul>)}






 </Link>         ) : (
          <Link className={styles.login} to="/login">
            Login / Criar
          </Link>
        )}
      </nav>
    </header>
  );
};

export default Header;
