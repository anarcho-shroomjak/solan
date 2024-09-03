import {useCallback, useEffect, useState} from "react";
import {
  Box, Button, Collapse,
  FormControl, IconButton,
  InputLabel,
  MenuItem, Paper,
  Select, Table,
  TableBody, TableCell,
  TableContainer, TableFooter, TableHead, TablePagination, TableRow,
  TextField,
  Typography, useMediaQuery, useTheme
} from "@mui/material";
import {
  AddRoad,
  DeleteForever,
  Edit,
  EditAttributes,
  KeyboardArrowDown,
  KeyboardArrowUp,
  PlusOne, SaveAs
} from "@mui/icons-material";
import {useAppDispatch} from "../store/store.ts";
import {SpecsServices} from "../store/SpecsSlice.ts";
import SpecsService from "../services/SpecsService.ts";

function Row(props: { row: Side[], onRowChange: Function, onRowDelete: Function, index: number }) {
  const [row, setRow] = useState(props.row)
  const [open, setOpen] = useState(false)

  const [changed, setChanged] = useState(false)

  const change = (index: number, partial: Object) => {
    console.log(row)
    console.log(partial)
    if (partial.hasOwnProperty('length')) {
      console.log('Hello')
      if (partial.length !== '') {
        if (!isNaN(partial?.length) && !partial.length.toString().endsWith('.')){
          console.log('Hello 2')
          partial.length = parseFloat(partial.length)
        }
      }

    }
    console.log(partial)
    setRow(row.map((el, i) => i === index ? {...el, ...partial} : el))

    console.log(row)
  }

  useEffect(() => {
    props.onRowChange(row)
  }, [row])

  const specsService = new SpecsService()

  const formule = useCallback(() => {
    return specsService.totalArea([row])
  }, row)

  const closeOthers = (index: number) => {
    setRow(prev => prev.map((e, i) => i !== index ? {...e, isOpen: false} : e))
  }

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));
  // @ts-ignore
  return (
    <>
      <TableRow onClick={() => setOpen(!open)} sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {props.index+1}
        </TableCell>
        <TableCell>{formule()}</TableCell>
        <TableCell align="right"><IconButton onClick={props.onRowDelete} color={'error'}><DeleteForever/></IconButton></TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              {/*<Typography variant="h6" gutterBottom component="div">Sides</Typography>*/}
              <Table size="medium" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Number</TableCell>
                    <TableCell style={{width: '40%'}}>Type</TableCell>
                    <TableCell style={{width: '40%'}}>Length <span
                      style={{fontSize: '0.8em', color: '#9f9f9f'}}>(m)</span></TableCell>
                    {/*<TableCell align={'center'}>Actions</TableCell>*/}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.map((row, index) => (
                    <>
                      {row.isOpen ? (
                        <TableRow onClick={() => { change(index, {isOpen: false}); closeOthers(index) } }>
                          <TableCell component="th" scope="row">
                            {index+1}
                          </TableCell>
                          <TableCell>
                            <TextField
                              onClick={e => e.stopPropagation()}
                              variant={'outlined'}
                              select
                              defaultValue={10}
                              sx={{ minWidth: matches ? 200 : 0 }}
                              size={'small'}
                              // labelId="demo-simple-select-label"
                              id="demo-simple-select"
                              value={row.type}
                              label="Type"
                              onChange={(e) => change(index, { type: e.target.value as SideType })}
                            >
                              {/*<MenuItem value={10}>Ten</MenuItem>*/}
                              {/*<MenuItem value={20}>Twenty</MenuItem>*/}
                              {/*<MenuItem value={30}>Thirty</MenuItem>*/}
                              {(Object.keys(SideType).map(key => SideType[key]).filter(value => typeof value === 'string') as string[]).map((el) => (
                                <MenuItem value={el}>{el}</MenuItem>
                              ))}
                            </TextField>
                          </TableCell>
                          <TableCell >
                            <TextField
                              onClick={e => e.stopPropagation()}
                              onChange={(e) => { change(index, {length: e.target.value}) } }
                              value={row.length} label={'Length'} variant={'outlined'} size={'small'}/>
                          </TableCell>
                          {/*<TableCell align={'center'}>*/}
                          {/*  <IconButton onClick={() => { change(index, {isOpen: !row.isOpen}) } } color={'success'}><SaveAs/></IconButton>*/}
                          {/*</TableCell>*/}
                        </TableRow>
                      ) : (
                        <TableRow onClick={() => { change(index, {isOpen: true}); closeOthers(index) } }>
                          <TableCell component="th" scope="row">
                            {index+1}
                          </TableCell>
                          <TableCell>{row.type}</TableCell>
                          <TableCell >{row.length}</TableCell>
                          {/*<TableCell align={'center'}>*/}
                          {/*  <IconButton onClick={() => { change(index, {isOpen: !row.isOpen}) } } color={'primary'}><Edit/></IconButton>*/}
                          {/*</TableCell>*/}
                        </TableRow>
                      )}
                    </>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  )
}

// TODO: change to plain list || move to store
export enum SideType {
  Parapet = 'Парапет',
  PrimikDoStiny = 'Примик. до стіни',
  Karniz = 'Карниз',
  PrimikDoVentylyacii = 'Примик. до вентиляції',
  Krisha = 'Розмір'
}

export type Side = {
  type?: SideType,
  length?: string,
  isOpen?: boolean
}

export default function MaterialsPage() {
  // const [materials, setMaterials] = useState([]);
  const defaultSide = [
    {type: SideType.Karniz, length: 3, isOpen: false},
    {type: SideType.Karniz, length: 4, isOpen: false},
    {type: SideType.Karniz, length: 5, isOpen: false},
  ]
  const [triangles, setTriangles] = useState<Side[][]>([defaultSide]);

  const specsService = new SpecsService()

  const total = useCallback(() => {
    return specsService.totalArea(triangles)
  }, [triangles])

  const materials = useCallback(() => {
    return specsService.totalMaterials(triangles)
  }, [triangles])

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(SpecsServices.actions.setSides(triangles))
  }, [triangles])

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));

  return (
    <>
      <Box>
        <TableContainer elevation={0} component={Paper}>
          <Table size={'small'} aria-label="collapsible table">
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell>Number</TableCell>
                <TableCell>Square <span style={{fontSize: '0.8em', color: '#9f9f9f'}}>(m<sup>2</sup>)</span></TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {triangles.map((row, index) => (
                <Row
                  row={row}
                  index={index}
                  onRowChange={(newRow: Side[]) => setTriangles(triangles.map((el, i) => i === index ? newRow : el))}
                  onRowDelete={() => setTriangles(triangles.filter((_, i) => i !== index))}
                />
              ))}
            </TableBody>
            <TableFooter>
              <TableRow >
                <TableCell colSpan={3}>
                  {triangles.length > 0 && (
                    <>
                      <Typography variant={'body1'}><strong>Total square: </strong>{total()} <span
                        style={{fontSize: '0.8em', color: '#9f9f9f'}}>(m<sup>2</sup>)</span></Typography>
                      {Object.keys(materials()).map((key) => (
                        <Typography variant={'body1'}><strong>{key}: </strong>{materials()[key]} <span
                          style={{fontSize: '0.8em', color: '#9f9f9f'}}>(m)</span></Typography>
                      ))}
                    </>
                  )}
                </TableCell>
                <TableCell align={'right'}>
                <Button onClick={() => setTriangles([...triangles, defaultSide])} variant={'outlined'} startIcon={<AddRoad/>}>Add</Button>
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </Box>
      {/*<Box m={10} sx={{ display: "flex", flexDirection: "column", width: "100%" }}>*/}
      {/*  <Box*/}
      {/*    sx={{ display: "flex", flexDirection: "row", gap: 5, width: "100%" }}*/}
      {/*  >*/}
      {/*    <TextField label={'Side A'} variant={'outlined'} size={'small'}/>*/}
      {/*      <MenuItem value={10}>Ten</MenuItem>*/}
      {/*      <MenuItem value={20}>Twenty</MenuItem>*/}
      {/*      <MenuItem value={30}>Thirty</MenuItem>*/}
      {/*    </TextField>*/}
      {/*  </Box>*/}
      {/*</Box>*/}
    </>
  )
}