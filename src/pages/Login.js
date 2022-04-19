// material
import { styled } from '@material-ui/core/styles';
import { Card, Stack, Container, Typography } from '@material-ui/core';
// components
import Page from '../components/Page';
import { MHidden } from '../components/@material-extend';
import { LoginForm } from '../components/authentication/login';
import { Navigate } from 'react-router-dom';

// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex'
  }
}));

const SectionStyle = styled(Card)(({ theme }) => ({
  width: '100%',
  maxWidth: 464,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  margin: theme.spacing(2, 0, 2, 2)
}));

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  display: 'flex',
  minHeight: '100vh',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: theme.spacing(12, 0)
}));

// ----------------------------------------------------------------------

export default function Login() {
  if (localStorage.getItem('token')) {
    return <Navigate to={'/dashboard'} />;
  }
  
  return (
    <RootStyle title="Login | Shri-Agrahari">
      <MHidden width="mdDown">
        <SectionStyle>
          <Typography style={{textAlign : 'center'}} variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
            Hi, Welcome Back
          </Typography>
          <img src="/static/logo.png" alt="login" />
          <div style={{margin : '20px', textAlign:'center', color:'green'}}>
            <p>Shri Agrahari Sewa Sansthan, Naugarh, Siddharth Nagar</p>
            <p>Contact : +91 9839351250</p>
          </div>
        </SectionStyle>
      </MHidden>

      <Container maxWidth="sm">
        <ContentStyle>
          <Stack sx={{ mb: 5 }}>
            <Typography variant="h4" gutterBottom>
              Agrahari Management System
            </Typography>
            <Typography sx={{ color: 'text.secondary' }}>Enter your details below.</Typography>
          </Stack>
          {/* <AuthSocial /> */}
          <LoginForm />
        </ContentStyle>
      </Container>
    </RootStyle>
  );
}
