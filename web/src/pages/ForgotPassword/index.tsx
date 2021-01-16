import React, { useCallback, useRef } from 'react';
import { FiLogIn, FiMail } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { Link } from 'react-router-dom';

import * as Yup from 'yup';
import { useToast } from '../../hooks/toast';

import Input from '../../components/Input';
import Button from '../../components/Button';

import logoImg from '../../assets/seuluisLogo.png';
import { Container, Content, AnimationContainer, Background } from './styles';

import getValidationErrors from '../../utils/getValidationErrors';

interface ForgotPasswordFormData {
  email: string;
}

const ForgotPassword: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const { addToast } = useToast();

  const handleSubmit = useCallback(
    async (data: ForgotPasswordFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          email: Yup.string()
            .required('Email obrigatório')
            .email('Digite email válido'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        // recover password

        // history.push('/dashboard');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          return;
        }

        addToast({
          type: 'error',
          title: 'Erro de na recuperação de senha',
          description:
            'Ocorreu um erro ao tentar recuperar a senha, tente novamente.',
        });
      }
    },
    [addToast],
  );

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <img src={logoImg} alt="Go Barber" />
          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Recuperar senha</h1>
            <Input name="email" icon={FiMail} placeholder="e-mail" />
            <Button type="submit">Recuperar</Button>
            <Link to="/">
              <FiLogIn />
              Voltar ao login
            </Link>
          </Form>
        </AnimationContainer>
      </Content>
      <Background />
    </Container>
  );
};

export default ForgotPassword;
