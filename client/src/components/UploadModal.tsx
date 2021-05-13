import React, { useState, ReactNode } from 'react'
import {
  Box,
  Button,
  DialogContent,
  Grid,
  Typography,
  Theme,
  makeStyles,
  MenuItem,
  Select,
} from '@material-ui/core'
import ModalTemplate from './ModalTemplate'
import { HeaderComponents } from '../types'
import { Controller, useForm } from 'react-hook-form'
import CloudUploadIcon from '@material-ui/icons/CloudUpload'
import { getHotelName } from '../services/authentication'
import utilServices from '../services/utils'
import Notification from '../components/Notification'
import { handleDeleteS3Item } from './Table'

interface UploadModalProps {
  toggleButton?: ReactNode
  options?: string[]
  uploadRef?: string
  tableHeaders: HeaderComponents[]
  tableInfo: any[]
  tableTitle: string
  open: boolean
  onClickHandler: () => void
  updateTableInfo: (data) => void
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(2),
    width: 500,
    borderTop: `2px dotted ${theme.palette.text.light}`,
    borderBottom: 'none',
    '& .MuiSelect-select': {
      minWidth: 100,
    },
    '& .MuiSelect-select:focus': {
      backgroundColor: theme.palette.background.default,
    },
  },
  sectionTitle: {
    display: 'flex',
    alignItems: 'center',
    '& .MuiTypography-root': {
      fontSize: theme.typography.pxToRem(15),
    },
  },
  uploadSection: {
    marginTop: theme.spacing(1.5),
    display: 'flex',
  },
  uploadedImage: {
    display: 'flex',
    marginLeft: theme.spacing(1),
    alignItems: 'center',
    '& img': {
      height: '35px',
      width: '35px',
      objectFit: 'cover',
      borderRadius: 3,
    },
    '& .MuiSvgIcon-root': {
      height: '15px',
      marginLeft: theme.spacing(0.25),
      cursor: 'pointer',
    },
  },
  submit: {
    marginTop: theme.spacing(3),
  },
  notification: {
    marginTop: theme.spacing(2),
  },
}))

const UploadModal: React.FC<UploadModalProps> = (props: UploadModalProps) => {
  const classes = useStyles()
  const {
    toggleButton,
    uploadRef,
    options,
    tableInfo,
    tableTitle,
    updateTableInfo,
    open,
    onClickHandler,
  } = props
  const [image, setImage] = useState('/null_image.png')
  const [status, setStatus] = useState('')
  const [notificationMessage, setNotificationMessage] = useState(null)
  const { register, handleSubmit, control } = useForm()

  const onSubmit = (data) => {
    const formData = new FormData()
    for (const key in data) {
      if (key == 'uploadImage') {
        if (data.uploadImage.length > 0) {
          formData.set(key, data[key][0])
        }
      } else {
        formData.set(key, data[key])
      }
    }
    formData.set('hotelName', getHotelName())
    formData.set('table', tableTitle)
    utilServices
      .uploadImageTable(formData)
      .then((response) => {
        // Logic to update table
        const rowIndex = data.selectRow.split('.')[0] - 1
        const newTableInfo = [...tableInfo]
        if (newTableInfo[rowIndex].image) {
          handleDeleteS3Item(newTableInfo[rowIndex].image)
        }
        newTableInfo[rowIndex].image = response.objectURL
        updateTableInfo(newTableInfo)

        // Notify success
        setStatus('success')
        setNotificationMessage('Image uploaded!')
        setTimeout(() => {
          setStatus('')
          setNotificationMessage(null)
        }, 3500)
      })
      .catch((err) => alert(err))
  }

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImage(URL.createObjectURL(event.target.files[0]))
    }
  }

  const editUploadRefDisplay = (uploadRef: string) => {
    const split = uploadRef.split(/(?=[A-Z])/)
    //uppercase first letter of first word
    split[0] = split[0].charAt(0).toUpperCase() + split[0].slice(1)
    //join all the words
    return split.join(' ')
  }

  return (
    <ModalTemplate
      open={open}
      toggleButton={toggleButton}
      modalTitle={`${tableTitle} - Image Upload`}
      hasCloseButton={true}
      handleClose={onClickHandler}
    >
      <DialogContent dividers className={classes.root}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={1} alignItems="center">
            <Grid item xs={3} className={classes.sectionTitle}>
              <Typography>{`Choose ${editUploadRefDisplay(
                uploadRef,
              )}:`}</Typography>
            </Grid>
            <Grid item xs={9}>
              <Controller
                as={
                  <Select>
                    <MenuItem value="">None</MenuItem>
                    {options.map((option) => (
                      <MenuItem value={option}>{option}</MenuItem>
                    ))}
                  </Select>
                }
                name="selectRow"
                rules={{ required: 'Required' }}
                control={control}
                defaultValue=""
              />
            </Grid>
            <Grid item xs={3} className={classes.sectionTitle}>
              <Typography>Choose Image:</Typography>
            </Grid>
            <Grid item xs={9}>
              <Box className={classes.uploadSection}>
                <input
                  accept="image/*"
                  name="uploadImage"
                  id="uploadImage"
                  ref={register}
                  onChange={onImageChange}
                  type="file"
                  style={{ display: 'none' }}
                />
                <label htmlFor="uploadImage">
                  <Button
                    variant="contained"
                    color="primary"
                    component="span"
                    startIcon={<CloudUploadIcon />}
                  >
                    Upload
                  </Button>
                </label>
                {image && (
                  <Box className={classes.uploadedImage}>
                    <img src={image} />
                  </Box>
                )}
              </Box>
            </Grid>
          </Grid>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Submit
          </Button>
        </form>
        <Box className={classes.notification}>
          <Notification message={notificationMessage} status={status} />
        </Box>
      </DialogContent>
    </ModalTemplate>
  )
}

export default UploadModal
