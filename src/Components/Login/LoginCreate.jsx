import React from 'react';
import Input from '../Forms/Input';
import Button from '../Forms/Button';
import Error from '../Helper/Error';
import useForm from '../../Hooks/useForm';
import { USER_POST } from '../../Api';
import { UserContext } from '../../UserContext';
import useFetch from '../../Hooks/useFetch';
import Head from '../Helper/Head';

const LoginCreate = () => {
  const [img, setImg] = React.useState({});
  const username = useForm();
  const email = useForm('email');
  const password = useForm('');
  const firstname = useForm();
  const lastname = useForm();

  const { userLogin } = React.useContext(UserContext);
  const { loading, error, request } = useFetch();
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
      username: username.value,
      firstname: firstname.value,
      lastname: lastname.value,
      email: email.value,
      password: password.value,
      profile_pic: imageBase64,
    };

    console.log(`🚀 ~ file: LoginCreate.jsx:42 ~ handleSubmit ~ body:`, body);
    const { url, options } = USER_POST(body);

    const { response } = await request(url, options);
    console.log(`🚀 ~ file: LoginCreate.jsx:42 ~ handleSubmit ~ response:`, response);
    if (response && response.ok) userLogin(username.value, password.value);
  }


  return (
    <section className="animeLeft">
      <Head title="Crie sua conta" />
      <h1 className="title">Cadastre-se</h1>
      <form onSubmit={handleSubmit}>
        <Input label="Usuário" type="text" name="username" {...username} />
        <Input label="Nome" type="text" name="name" {...firstname} />
        <Input label="Sobrenome" type="text" name="name" {...lastname} />
        <Input label="Email" type="email" name="email" {...email} />
        <Input label="Senha" type="password" name="password" {...password} />
        <input
          type="file"
          name="img"
          id="img"
          onChange={handleImgChange}

        />

        {loading ? (
          <Button disabled>Cadastrando...</Button>
        ) : (
          <Button>Cadastrar</Button>
        )}
        <Error error={error} />
      </form>
    </section>
  );
};

export default LoginCreate;
