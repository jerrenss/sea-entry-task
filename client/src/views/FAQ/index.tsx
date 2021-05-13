import React, { useEffect, useState } from 'react'
import {
  Box,
  Typography,
  makeStyles,
  Theme,
  Link,
  List,
  ListItem,
  ListItemText,
  Collapse,
  Divider,
  Container,
  ListItemIcon,
} from '@material-ui/core'
import Navbar from '../../components/Navbar'
import UserRoute from '../../components/Authentication/UserRoute'
import FAQ_QUESTIONS_ANSWERS from './const'
import { ExpandLess, ExpandMore, FiberManualRecord } from '@material-ui/icons'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignContent: 'space-between',
    marginTop: theme.spacing(8),
  },
  title: {
    display: 'flex',
    textAlign: 'center',
  },
  faqQuestion: {
    fontWeight: 'bold',
    fontSize: theme.typography.pxToRem(16),
  },
  faqAnswer: {
    marginLeft: theme.spacing(4),
    fontSize: theme.typography.pxToRem(15),
  },
  cred: {
    display: 'flex',
    flexDirection: 'column',
    alignContent: 'space-between',
    marginTop: theme.spacing(1),
    marginLeft: theme.spacing(1),
  },
  credBody: {
    fontSize: theme.typography.pxToRem(12),
    marginTop: theme.spacing(2),
    marginRight: theme.spacing(1),
  },
  credFooter: {
    fontSize: theme.typography.pxToRem(10),
    marginTop: theme.spacing(2),
  },
}))

const FAQ: React.FC = (props) => {
  const classes = useStyles(props)
  const [questionsOpen, setQuestionsOpen] = useState([])

  useEffect(() => {
    const questionsStates = FAQ_QUESTIONS_ANSWERS.map((faq) => {
      return { ...faq, open: false }
    })
    setQuestionsOpen(questionsStates)
  }, [])

  const handleQuestionClick = (question: string) => {
    const newQuestionsOpen = questionsOpen.map((o) => {
      if (o.question == question) {
        return {
          ...o,
          open: !o.open,
        }
      } else {
        return o
      }
    })
    setQuestionsOpen(newQuestionsOpen)
  }
  return (
    <UserRoute>
      <Box>
        <Navbar />
        <Container maxWidth="sm" className={classes.root}>
          <Typography variant="h6" className={classes.title}>
            FAQ
          </Typography>
          <List>
            {questionsOpen.map((faq) => {
              return (
                <div id={faq.question}>
                  <ListItem
                    button
                    onClick={() => handleQuestionClick(faq.question)}
                  >
                    <ListItemIcon>
                      <FiberManualRecord />
                    </ListItemIcon>
                    <ListItemText
                      primary={faq.question}
                      classes={{
                        primary: classes.faqQuestion,
                      }}
                    />
                    {faq.open ? <ExpandLess /> : <ExpandMore />}
                  </ListItem>
                  <Collapse in={faq.open} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      <ListItemText
                        primary={faq.answer}
                        classes={{
                          primary: classes.faqAnswer,
                        }}
                      />
                    </List>
                  </Collapse>
                </div>
              )
            })}
          </List>
        </Container>
      </Box>
    </UserRoute>
  )
}

export default FAQ
