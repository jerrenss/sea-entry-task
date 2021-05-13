import React, { ReactComponentElement, ReactNode, useState } from 'react'
import {
  Theme,
  Dialog,
  DialogTitle,
  WithStyles,
  createStyles,
  Typography,
  IconButton,
  Button,
  withStyles,
  makeStyles,
  Box,
} from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
import HelpIcon from '@material-ui/icons/Help'

const titleStyles = (theme: Theme) =>
  createStyles({
    root: {
      marginRight: theme.spacing(4),
      padding: theme.spacing(2),
      display: 'inline-flex',
    },
    title: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
    },
    closeButton: {
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
    },
    content: {
      padding: theme.spacing(2),
    },
    actions: {
      margin: 0,
      padding: theme.spacing(1),
    },
  })

interface ModalTitleProps extends WithStyles<typeof titleStyles> {
  id: string
  hasCloseButton: boolean
  children?: ReactNode
  onClose?: () => void
}

/**
 * Renders the title section of the Modal.
 * The title of the modal is to be passed in as the children prop
 * @param props props to pass into the Modal Title
 */
const ModalTitle = withStyles(titleStyles)((props: ModalTitleProps) => {
  const { children, classes, onClose, hasCloseButton, ...other } = props
  return (
    <DialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="subtitle2" className={classes.title}>
        {children}
      </Typography>
      {hasCloseButton && (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      )}
    </DialogTitle>
  )
})

export interface ModalTemplateProps {
  hasCloseButton: boolean
  open: boolean
  handleClose: () => void
  modalTitle?: string
  children: ReactNode
  toggleButton?: ReactNode
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'inline-block',
    },
    '& :hover': {
      color: theme.palette.secondary.main,
    },
    modalButton: {
      position: 'static',
    },
  }),
)
/**
 * Wrapper modal template component that renders a modal.
 * openButtonTitle specifies the wording that appears on the button that opens the modal
 * modalTitle specifies the title of the modal when opened, if applicable
 * children specifies the components to be rendered as the content of the modal
 * an optional toggleButton if a custom button is to be rendered to toggle the Modal
 * For every component that implements this template, the state and onClickHandlers must be lifted to the highest
 * possible parent and passed in as props.
 * @param props props passed into the Modal Template
 */
const ModalTemplate: React.FC<ModalTemplateProps> = (
  props: ModalTemplateProps,
) => {
  const {
    open,
    modalTitle,
    hasCloseButton,
    toggleButton,
    handleClose,
    children,
  } = props
  const classes = useStyles()

  return (
    <div className={classes.root}>
      {toggleButton && (
        <Box className={classes.modalButton}>{toggleButton}</Box>
      )}
      <Dialog onClose={handleClose} open={open}>
        {modalTitle && (
          <ModalTitle
            id="modal-title"
            hasCloseButton={hasCloseButton}
            onClose={handleClose}
          >
            {modalTitle}
          </ModalTitle>
        )}
        {children}
      </Dialog>
    </div>
  )
}

export default ModalTemplate
