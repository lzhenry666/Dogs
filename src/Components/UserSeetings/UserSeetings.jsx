import React from 'react';
import { UserContext } from '../../UserContext';
import Input from '../Forms/Input';
import Button from '../Forms/Button';
import useForm from '../../Hooks/useForm';
import { USER_UPDATE } from '../../Api';
import useFetch from '../../Hooks/useFetch';
import Error from '../Helper/Error';
import { useNavigate } from 'react-router-dom';

const UserSeetings = () => {
  const navigateTo = useNavigate();
  const [img, setImg] = React.useState({});

  const {userLogin, userId ,login,updateUser, data} = React.useContext(UserContext);
  const { loading, error, request } = useFetch();
  const firstname = useForm();
  const lastname = useForm();
  const username = useForm();
  const email = useForm('email');
  const password = useForm('');

  function handleImgChange({ target }) {
    setImg({
      preview: URL.createObjectURL(target.files[0]),
      raw: target.files[0],
    });
  }

  async function toBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result.split(',')[1]);
      reader.onerror = (error) => reject(error);
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const imageBase64 = await toBase64(img.raw);

    const body = {
      user_id: userId,
      username: username.value,
      firstname: firstname.value,
      lastname: lastname.value,
      email: email.value,
      password: password.value,
      profile_pic: imageBase64,
    };
    const token = window.localStorage.getItem('token');

    const { url, options } = USER_UPDATE(body,token);

    const { response } = await request(url, options);
    if (response && response.ok) {
      console.log(`🚀 ~ file: userSeetings.jsx:60 ~ handleSubmit ~ data:`, response);

      updateUser(data);
      navigateTo('/conta');
    }
  }

  return (
    <>
      {login && (
        <div className="container">
          <h1 className="title">Configurações da conta</h1>
          <form onSubmit={handleSubmit}>
            <Input label="Usuário" type="text" name="username" {...username} readOnly={true} value={data.username}/>
            <Input label="Nome" type="text" name="firstname" {...firstname} />
            <Input label="Sobrenome" type="text" name="lastname" {...lastname} />
            <Input label="Email" type="email" name="email" {...email} />
            <Input label="Senha" type="password" name="password" {...password} />
            <input type="file" name="img" id="img" onChange={handleImgChange} />

            {loading ? (
              <Button disabled>Atualizando...</Button>
            ) : (
              <Button>Atualizar</Button>
            )}
            <Error error={error} />
          </form>
        </div>
      )}
    </>
  );
};

export default UserSeetings;
