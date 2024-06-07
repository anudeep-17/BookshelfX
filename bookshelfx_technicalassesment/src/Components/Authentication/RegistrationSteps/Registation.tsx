import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
const RegistrationStep1 = dynamic(() => import('@/Components/Authentication/RegistrationSteps/RegistationStep1'), { 
  loading: () => 
  <Box sx={{
    position: 'absolute',
    top: '50%',
    left: '75%',
    transform: 'translate(-50%, -50%)',
  }}>
    <CircularProgress color="primary" />
  </Box>
});

const RegistrationStep2 = dynamic(() => import('@/Components/Authentication/RegistrationSteps/RegistrationStep2'), { 
  loading: () => 
  <Box sx={{
    position: 'absolute',
    top: '50%',
    left: '75%',
    transform: 'translate(-50%, -50%)',
  }}>
    <CircularProgress color="primary" />
  </Box>
});

const RegistrationStep3 = dynamic(() => import('@/Components/Authentication/RegistrationSteps/RegistrationStep3'), { 
  loading: () => 
  <Box sx={{
    position: 'absolute',
    top: '50%',
    left: '75%',
    transform: 'translate(-50%, -50%)',
  }}>
    <CircularProgress color="primary" />
  </Box>
});

import { User } from '@/Components/interfaceModels';
import { AuthContext } from '@/Components/Context/AuthContext';
import { Alert, Snackbar } from '@mui/material';
import { SnackbarCloseReason } from '@mui/material';
import dynamic from 'next/dynamic';
import CircularProgress from '@mui/material/CircularProgress';

const steps = [
    'Personal Information',
    'add Customization',
    'Review & Confirm'
];

export default function Registration() 
{
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState<{
    [k: number]: boolean;
  }>({});
  const [alertopener, setAlertopener] = React.useState(false);

  const [Email, setEmail] = React.useState('');
  const [Password, setPassword] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(false);
  const [Name, setName] = React.useState('');
  const [ConfirmPassword, setConfirmPassword] = React.useState('');
  const [passwordMatch, setpasswordMatch] = React.useState(false);
  const [Role, setRole] = React.useState('');
  const [selectedCategories, setSelectedCategories] = React.useState<string[]>([]);

  const [showAuthenticationFailed, setShowAuthenticationFailed] = React.useState(false);
  const { setIsAuthenticated } = React.useContext(AuthContext);
  const [alert, setalert] = React.useState<{severity: 'success' | 'error' | 'warning', message: string}>({severity: 'error', message: ''});
  
  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    let isError = false;

    if (activeStep+1 === 1) {
        if (!Email || !Password || !ConfirmPassword || !Role || Password !== ConfirmPassword) {
            setAlertopener(true);  
            setalert({severity: 'error', message: 'Please fill in all fields and ensure passwords match'});
            isError = true;
            return;
        } else {
            setAlertopener(true);
            setalert({severity: 'success', message: 'Step 1 Completed, account created'});
        }
    }
    else if(activeStep+1 === 2) 
    {
        setAlertopener(true);
        if (selectedCategories.length > 1) {
            setalert({severity: 'success', message: 'Step 2 Completed, Favourite categories added'});
        } else {
            setalert({severity: 'success', message: 'Step 2 Skipped, no favourite categories selected'});
        }
    }

    if (!isError) {
        const newActiveStep =
            isLastStep() && !allStepsCompleted()
                ? 
                steps.findIndex((step, i) => !(i in completed))
                : activeStep + 1;
        setActiveStep(newActiveStep);
    }
  };

  const handleSkip = () => {
    if (activeStep === 1) {
        setAlertopener(true);
        setalert({severity: 'success', message: 'Step 2 Skipped, no favourite categories selected'});
        setActiveStep(2);
    }
  };
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step: number) => () => {
    setActiveStep(step);
  };
 
  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };

  const handleAlertClose = (event: React.SyntheticEvent<any, Event> | Event, reason?: SnackbarCloseReason) => {
    if (reason === 'clickaway') {
        return;
    }

    setAlertopener(false);
  };

  return (
    <Box sx={{ p:1.5, width: '45vw'}}>
        <Typography variant="h4" letterSpacing={2}>
            Signup
        </Typography>
        <Typography variant="body2" letterSpacing={0} sx={{ mt: 1, mb:3 }}>
            Discover, Explore, Read: Your Personal Gateway to Infinite Worlds
        </Typography>

      <Stepper nonLinear activeStep={activeStep}>
        {steps.map((label, index) => (
          <Step key={label} completed={completed[index]}>
            <StepButton color="inherit" onClick={handleStep(index)}>
              {label}
            </StepButton>
          </Step>
        ))}
      </Stepper>
      
      <Box sx={{
        mb:2,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <React.Fragment>
            {
                activeStep === 0 ?    <RegistrationStep1
                                          Email={Email} 
                                          setEmail={setEmail} 
                                          Password={Password} 
                                          setPassword={setPassword} 
                                          name={Name}
                                          setName={setName}
                                          ConfirmPassword={ConfirmPassword} 
                                          setConfirmPassword={setConfirmPassword} 
                                          passwordMatch={passwordMatch} 
                                          setpasswordMatch={setpasswordMatch} 
                                          Role={Role} 
                                          setRole={setRole} 
                                          showPassword={showPassword} 
                                          setShowPassword={setShowPassword} 
                                      /> :
                activeStep === 1 ?  <RegistrationStep2
                                        setAlertopener={setAlertopener} 
                                        setAlert={setalert}
                                        selectedCategories={selectedCategories}
                                        setSelectedCategories={setSelectedCategories}
                                      /> :
                activeStep === 2 ?  <RegistrationStep3 /> : null
            }
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2, mt:1}}>
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Back
              </Button>
              <Box sx={{ flex: '1 1 auto' }} />
                  {activeStep === 1 && (
                      <Button onClick={handleSkip} sx={{ mr: 1 }}>
                          Skip
                      </Button>
                  )}
                  <Button onClick={handleNext} sx={{ mr: 1 }}>
                      {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                  </Button>
              </Box>
        </React.Fragment>
      </Box>
      <Snackbar 
          open={alertopener} 
          autoHideDuration={2000} 
          onClose={handleAlertClose}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
          <Alert onClose={handleAlertClose} severity={alert?.severity} sx={{ width: '100%' }}>
              {alert?.message}
          </Alert>
</Snackbar>
    </Box>
  );
}