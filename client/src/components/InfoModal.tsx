import React, { ReactNode } from 'react'
import {
  DialogContent,
  DialogActions,
  Typography,
  Button,
  Theme,
  makeStyles,
  Grid,
  List,
  ListItem,
} from '@material-ui/core'
import ModalTemplate from './ModalTemplate'
import { HeaderDescription } from '../types'

interface InfoModalProps {
  openButtonTitle: string
  modalTitle: string
  toggleButton?: ReactNode
  content: HeaderDescription[]
  open: boolean
  onClickHandler: () => void
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(2),
    borderTop: `2px dotted ${theme.palette.text.light}`,
    borderBottom: 'none',
  },
  listHeader: {
    wordBreak: 'break-all',
  },
  detailHeader: {
    fontWeight: 600,
    textDecoration: 'underline',
  },
  description: {
    whiteSpace: 'pre-line',
    wordBreak: 'break-word',
  },
  modalItem: {
    borderBottom: '1px solid black',
  },
}))

/**
 * Renders a Modal component using a ModalTemplate.
 * This modal is to display information to the user when clicked
 * @param props InfoModalProps, modalTitle and the info is required
 */
const InfoModal: React.FC<InfoModalProps> = (props: InfoModalProps) => {
  const classes = useStyles()
  const {
    openButtonTitle,
    toggleButton,
    modalTitle,
    content,
    open,
    onClickHandler,
  } = props

  return (
    <ModalTemplate
      open={open}
      toggleButton={toggleButton}
      modalTitle={modalTitle}
      hasCloseButton={true}
      handleClose={onClickHandler}
    >
      <DialogContent dividers className={classes.root}>
        <List>
          {content.map((item, id) => (
            <ListItem key={id}>
              <Grid
                container
                spacing={2}
                alignItems="center"
                className={classes.modalItem}
              >
                <Grid item xs={4}>
                  <Typography className={classes.listHeader}>
                    {item.header}
                  </Typography>
                </Grid>
                <Grid item xs={8}>
                  <Typography className={classes.detailHeader}>
                    Use Case
                  </Typography>
                  <Typography className={classes.description}>
                    {item.useCase}
                  </Typography>
                  <Typography className={classes.detailHeader}>
                    Example
                  </Typography>
                  <Typography className={classes.description}>
                    {item.example}
                  </Typography>
                </Grid>
              </Grid>
            </ListItem>
          ))}
        </List>
      </DialogContent>
      <DialogActions>
        <Button
          autoFocus
          onClick={onClickHandler}
          color="primary"
          variant="contained"
        >
          Done
        </Button>
      </DialogActions>
    </ModalTemplate>
  )
}

export default InfoModal
