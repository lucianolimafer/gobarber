import React, { useState } from 'react';

import { FiClock, FiPower } from 'react-icons/fi';
import {
  Container,
  Header,
  HeaderContent,
  Profile,
  Content,
  Schedule,
  NextAppointment,
  Section,
  Appointment,
  Calendar,
} from './styles';

import logoImg from '../../assets/seuluisLogo.png';
import { useAuth } from '../../hooks/auth';

const Dashboard: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const { signOut, user } = useAuth();

  return (
    <Container>
      <Header>
        <HeaderContent>
          <img src={logoImg} alt="Seu Luis" />

          <Profile>
            <img src={user.avatar_url} alt={user.name} />
            <div>
              <span>Bem vindo,</span>
              <strong>{user.name}</strong>
            </div>
          </Profile>

          <button type="button" onClick={signOut}>
            <FiPower />
          </button>
        </HeaderContent>
      </Header>
      <Content>
        <Schedule>
          <h1>Horários agendados</h1>
          <p>
            <span>Hoje</span>
            <span>Dia 20</span>
            <span>Segunda-feira</span>
          </p>

          <NextAppointment>
            <strong>Atendimento a seguir:</strong>
            <div>
              <img
                src="https://i1.rgstatic.net/ii/profile.image/908178761981954-1593538098349_Q512/Thiago_Moraes26.jpg"
                alt="Avatar"
              />

              <strong>Thiago Moraes</strong>
              <span>
                <FiClock />
                09:00
              </span>
            </div>
          </NextAppointment>
          <Section>
            <strong>Manhã</strong>
            <Appointment>
              <span>
                <FiClock />
                10:00
              </span>
              <div>
                <img
                  src="https://i1.rgstatic.net/ii/profile.image/908178761981954-1593538098349_Q512/Thiago_Moraes26.jpg"
                  alt="Avatar"
                />

                <strong>Thiago Moraes</strong>
              </div>
            </Appointment>
            <Appointment>
              <span>
                <FiClock />
                10:00
              </span>
              <div>
                <img
                  src="https://i1.rgstatic.net/ii/profile.image/908178761981954-1593538098349_Q512/Thiago_Moraes26.jpg"
                  alt="Avatar"
                />

                <strong>Thiago Moraes</strong>
              </div>
            </Appointment>
          </Section>
          <Section>
            <strong>Tarde e Noite</strong>
            <Appointment>
              <span>
                <FiClock />
                10:00
              </span>
              <div>
                <img
                  src="https://i1.rgstatic.net/ii/profile.image/908178761981954-1593538098349_Q512/Thiago_Moraes26.jpg"
                  alt="Avatar"
                />

                <strong>Thiago Moraes</strong>
              </div>
            </Appointment>
          </Section>
        </Schedule>
        <Calendar />
      </Content>
    </Container>
  );
};

export default Dashboard;
