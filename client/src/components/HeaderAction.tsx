import {
  Box,
  InputLabel,
  FormControl,
  MenuItem,
  Select,
  TextField,
  Button,
  FormControlLabel,
  Checkbox,
} from '@material-ui/core'
import React, { useState } from 'react'
import makeStyles from '@material-ui/core/styles/makeStyles'
import { HeaderComponents } from '../types'
import { camelCase, startCase } from 'lodash'

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiBox-root': {
      marginTop: theme.spacing(2),
    },
  },
  warning: {
    padding: theme.spacing(1),
    backgroundColor: theme.palette.error.light,
    borderRadius: '10px',
    [theme.breakpoints.down('xs')]: {
      '& label': {
        width: '20%',
      },
    },
  },
  actionChoices: {
    display: 'flex',
    alignItems: 'flex-end',
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
      alignItems: 'center',
    },
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  button: {
    alignSelf: 'center',
    marginLeft: theme.spacing(1),
    [theme.breakpoints.down('xs')]: {
      marginTop: theme.spacing(1),
    },
  },
}))

const NONE = 'None'
const INSERT = 'Insert'
const UPDATE = 'Update'
const DELETE = 'Delete'

interface HeaderActionProps {
  headers: HeaderComponents[]
  content: string[][]
  handleUpdate: (headers, content) => void
}

const HeaderAction: React.FC<HeaderActionProps> = (props) => {
  const classes = useStyles()
  const { headers, content, handleUpdate } = props
  const [checked, setChecked] = useState(false)
  const [action, setAction] = useState(NONE)
  const [index, setIndex] = useState(null)
  const [newColumn, setNewColumn] = useState(null)
  const [columnOption, setColumnOption] = useState(null)

  const handleChangeAction = (event) => {
    setAction(event.target.value)
  }

  const handleChangeIndex = (event) => {
    setIndex(event.target.value)
  }

  const handleNewColumn = (event) => {
    setNewColumn(event.target.value)
  }
  const handleColumnOption = (event) => {
    setColumnOption(event.target.value)
  }

  const resetAllState = () => {
    setChecked(false)
    setAction(NONE)
    setIndex(null)
    setNewColumn(null)
    setColumnOption(null)
  }

  const handleConfirm = () => {
    switch (action) {
      case INSERT:
        if (newColumn !== null && index !== null) {
          const headerComponent: HeaderComponents = {
            title: startCase(newColumn),
            field: camelCase(newColumn),
            type: 'string',
          }
          const newHeaders = [...headers]
          const newContent = [...content]
          if (index == newHeaders.length) {
            newHeaders.push(headerComponent)
            newContent.map((eachContent) => eachContent.push(null))
          } else {
            newHeaders.splice(Number(index), 0, headerComponent)
            newContent.map((eachContent) =>
              eachContent.splice(Number(index), 0, null),
            )
          }
          resetAllState()
          handleUpdate(newHeaders, newContent)
        }
        break
      case UPDATE:
        if (newColumn !== null && columnOption !== null) {
          const newHeaders = [...headers]
          const newContent = [...content]
          newHeaders[columnOption] = {
            ...newHeaders[columnOption],
            title: startCase(newColumn),
            field: camelCase(newColumn),
          }
          resetAllState()
          handleUpdate(newHeaders, newContent)
        }
        break
      case DELETE:
        if (columnOption !== null) {
          const newHeaders = [...headers]
          const newContent = [...content]
          newHeaders.splice(Number(columnOption), 1)
          newContent.map((eachContent) =>
            eachContent.splice(Number(columnOption), 1),
          )
          resetAllState()
          handleUpdate(newHeaders, newContent)
        }
        break
      default:
    }
  }

  return (
    <Box className={classes.root}>
      <Box className={classes.warning}>
        <FormControlLabel
          control={
            <Checkbox
              checked={checked}
              onChange={() => setChecked(!checked)}
              color="primary"
            />
          }
          label="Make changes to table headers as Admin. Avoid using this feature unless necessary. Changes apply only to current merchant."
        />
      </Box>
      {checked && (
        <Box className={classes.actionChoices}>
          <FormControl className={classes.formControl}>
            <InputLabel id="action-select-label">Action</InputLabel>
            <Select
              labelId="action-select-label"
              id="action-select"
              value={action}
              onChange={handleChangeAction}
            >
              <MenuItem value={NONE}>{NONE}</MenuItem>

              <MenuItem value={INSERT}>{INSERT}</MenuItem>
              <MenuItem value={UPDATE}>{UPDATE}</MenuItem>
              <MenuItem value={DELETE}>{DELETE}</MenuItem>
            </Select>
          </FormControl>
          {/* Render components based on action */}
          {(action === UPDATE || action === DELETE) && (
            <FormControl className={classes.formControl}>
              <InputLabel id="column-select-label">Column</InputLabel>
              <Select
                labelId="column-select-label"
                id="column-select"
                value={columnOption}
                onChange={handleColumnOption}
              >
                {headers.map((header, index) => (
                  <MenuItem value={index}>{header.title}</MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
          {(action === UPDATE || action === INSERT) && (
            <TextField
              label="Column Name"
              margin="normal"
              value={newColumn}
              onChange={handleNewColumn}
            />
          )}
          {action === INSERT && (
            <FormControl className={classes.formControl}>
              <InputLabel id="index-select-label">Index</InputLabel>
              <Select
                labelId="index-select-label"
                id="index-select"
                value={index}
                onChange={handleChangeIndex}
              >
                {headers.map((header, index) => (
                  <MenuItem value={index}>{index}</MenuItem>
                ))}
                <MenuItem value={headers.length}>{headers.length}</MenuItem>
              </Select>
            </FormControl>
          )}
          {action !== NONE && (
            <>
              <Button
                className={classes.button}
                variant="contained"
                color="primary"
                onClick={handleConfirm}
              >
                Confirm
              </Button>
              <Button
                className={classes.button}
                variant="contained"
                color="primary"
                onClick={resetAllState}
              >
                Clear
              </Button>
            </>
          )}
        </Box>
      )}
    </Box>
  )
}

export default HeaderAction
