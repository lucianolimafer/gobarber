import React from 'react';
import { FiLogIn } from 'react-icons/fi';

import logoImg from '../../assets/logo.svg';
import { Container, Content, Background } from './styles';

const SignIn: React.FC = () => (
  <Container>
    <Content>
      <img src={logoImg} alt="Go Barber" />
      <form>
        <h1>Faça o seu logon</h1>
        <input placeholder="e-mail" />
        <input type="password" placeholder="Senha" />
        <button type="submit">Entrar</button>
        <a href="forgot">Esqueci minha senha</a>
        <a href="df">
          <FiLogIn />
          Criar conta
        </a>
      </form>
    </Content>
    <Background />
  </Container>
);

export default SignIn;
