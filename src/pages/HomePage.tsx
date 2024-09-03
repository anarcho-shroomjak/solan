import {Box, Button} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {
  AddCircle,
  FileUpload,
  GetApp,
  IosShare,
  LocalOffer,
  LocalOfferSharp,
  NoteAdd,
  PlusOne
} from "@mui/icons-material";

export default function HomePage() {
  const navigate = useNavigate();

  const createID = () => {
    return 0
  }

  return (
    <Box display={'flex'} gap={5} flexDirection={'row'} justifyContent='center' alignItems="center">
      <Button startIcon={<FileUpload/>} onClick={() => {navigate('/offers/0')}} variant={'outlined'}>Import</Button>
      <div style={{width: 1, height: 60, backgroundColor: 'rgba(0,0,0,0.12)'}}>

      </div>
      {/*<Typography sx={{p: .5, pr: 2, pl: 2,  border: '1px solid #fff', borderColor: '#cfcfcf', borderRadius: 1, color: '#555555'}}>or</Typography>*/}
      {/*<Button variant={'outlined'} sx={{textTransform: 'lowercase'}} disabled>or</Button>*/}
      <Button startIcon={<NoteAdd/>} onClick={() => {navigate('/offers/1')}} variant={'outlined'}>Create</Button>
    </Box>
  )
}