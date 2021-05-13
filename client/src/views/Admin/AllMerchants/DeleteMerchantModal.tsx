import React, { ReactNode } from 'react'
import {
  Button,
  DialogContent,
  Typography,
  Theme,
  makeStyles,
} from '@material-ui/core'
import ModalTemplate from '../../../components/ModalTemplate'
import WarningIcon from '@material-ui/icons/Warning'

interface DeleteMerchantModalProps {
  toggleButton?: ReactNode
  open: boolean
  onClickHandler: () => void
  handleDeleteMerchant?: (_id: string) => void
  targetMerchant?: string
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
  text: {
    textAlign: 'center',
    fontSize: theme.typography.pxToRem(18),
    fontWeight: 600,
  },
  submit: {
    fontSize: theme.typography.pxToRem(16),
    backgroundColor: theme.palette.error.main,
    margin: theme.spacing(3, 0, 2),
  },
}))

const DeleteMerchantModal: React.FC<DeleteMerchantModalProps> = (props) => {
  const classes = useStyles()
  const {
    toggleButton,
    open,
    onClickHandler,
    handleDeleteMerchant,
    targetMerchant,
  } = props

  return (
    <ModalTemplate
      open={open}
      toggleButton={toggleButton}
      modalTitle="Delete Merchant"
      hasCloseButton={true}
      handleClose={onClickHandler}
    >
      <DialogContent dividers className={classes.root}>
        <Typography className={classes.text}>
          WARNING! You are about to delete a Merchant account. If this is not
          deliberate, cancel now.
        </Typography>
        <Button
          fullWidth
          variant="contained"
          color="primary"
          startIcon={<WarningIcon />}
          onClick={() => {
            handleDeleteMerchant(targetMerchant)
            onClickHandler()
          }}
          className={classes.submit}
        >
          Confirm
        </Button>
      </DialogContent>
    </ModalTemplate>
  )
}

export default DeleteMerchantModal
