import React from 'react';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';

import Input from '../../components/Input';
import Button from '../../components/Button';

import logoImg from '../../assets/logo.svg';
import { Container, Content, Background } from './styles';

const SignIn: React.FC = () => (
  <Container>
    <Content>
      <img src={logoImg} alt="Go Barber" />
      <form>
        <h1>Faça o seu logon</h1>
        <Input name="email" icon={FiMail} placeholder="e-mail" />
        <Input
          name="password"
          icon={FiLock}
          type="password"
          placeholder="Senha"
        />
        <Button type="submit">Entrar</Button>
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
