import {useEffect, useState} from 'react'
import '../App.css'
import MaterialsPage from "./MaterialsPage.tsx";
import {
  AppBar,
  Box,
  Button,
  Divider, IconButton,
  Slide,
  Step,
  StepLabel,
  Stepper, Toolbar,
  Typography,
  useMediaQuery,
  useTheme
} from "@mui/material";
import {
  CheckBoxTwoTone,
  CheckCircle,
  Checklist,
  Checkroom, DoneAll, HistoryEdu,
  IndeterminateCheckBox, Menu, NavigateBefore,
  NavigateNext, ReceiptLong, RequestPage, RestartAlt, Settings
} from "@mui/icons-material";
import {useTypedSelector} from "../store/store.ts";

function OfferPage() {
  // const [count, setCount] = useState(0)
  const sides = useTypedSelector((state) => state.Specs.sides)

  const steps = ['Specify specs', 'Specify costs', 'Form offer']
  const [step, setStep] = useState(0)

  const handleNext = () => setStep(step + 1)
  const handleBack = () => setStep(step - 1)
  const handleReset = () => setStep(0)

  // useEffect(() => {
  //   console.log(step)}, [step])

  const stepNodes = [
    <MaterialsPage/>,
    <Slide unmountOnExit mountOnEnter in={step === 1} direction={'up'}><Typography variant={'body1'}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam dignissimos dolorum ducimus, excepturi expedita explicabo illum laboriosam libero nam odit quam, quos recusandae reiciendis repellendus, temporibus ullam veniam vitae voluptas? Culpa deleniti doloremque dolores ea eligendi fuga itaque odit praesentium vero vitae! Culpa dignissimos excepturi harum impedit, nesciunt odio sapiente.</Typography></Slide>,
    <Slide  unmountOnExit mountOnEnter in={step === 2} direction={'up'}><Typography variant={'body1'}>Some random text</Typography></Slide>,
    <Box alignItems={'center'} justifyContent={'center'} gap={2} flexDirection={'row'} display={'flex'}><Checklist/><Typography variant={'button'}>Finished</Typography></Box>
  ]

  return (
    <>
      <Box>
        <Stepper activeStep={step}>
          {steps.map((label, _) => {
            const stepProps: { completed?: boolean } = {};
            const labelProps: {
              optional?: React.ReactNode;
            } = {};
            // if (isStepOptional(index)) {
            //   labelProps.optional = (
            //     <Typography variant="caption">Optional</Typography>
            //   );
            // }
            // if (isStepSkipped(index)) {
            //   stepProps.completed = false;
            // }
            return (
              <Step key={label} {...stepProps}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
        <Box mt={5} mb={3}>
          {stepNodes[step]}
        </Box>
        {/*<Divider/>*/}
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Button startIcon={<NavigateBefore/>} onClick={handleBack} disabled={step === 0} variant={'outlined'} color={'secondary'}>Back</Button>
          {step < steps.length-1 && <Button startIcon={<NavigateNext/>} onClick={handleNext} color={'primary'} variant={'contained'} disableElevation>Next</Button>}
          {steps.length-1 === step && <Button startIcon={<DoneAll/>} onClick={handleNext} color={'primary'} variant={'contained'} disableElevation>Finish</Button>}
          {steps.length === step && <Button startIcon={<RestartAlt/>} onClick={handleReset} color={'secondary'} variant={'contained'} disableElevation>Reset</Button>}
        </Box>
      </Box>
      {/*<Typography variant={'body1'}>{sides.flat().map(e => <span>{e.length}</span>)}</Typography>*/}
    </>
  )
}

export default OfferPage
