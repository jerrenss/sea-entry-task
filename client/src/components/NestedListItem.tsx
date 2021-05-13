import React, { useEffect } from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Collapse from '@material-ui/core/Collapse'
import ExpandLess from '@material-ui/icons/ExpandLess'
import ExpandMore from '@material-ui/icons/ExpandMore'
import { IconButtonProps, Link } from '@material-ui/core'
import { useRouter } from 'next/router'

const drawerWidth = 240

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: drawerWidth,
      flexShrink: 0,
      backgroundColor: theme.palette.background.paper,
      padding: 0,
    },
    nested: {
      paddingLeft: theme.spacing(4),
    },
  }),
)

type NestedListItemProps = {
  title: string
  listItems: Array<any>
  icon: IconButtonProps
  onClickHandler: (e: any, url: string) => void
  parentUrl: string
  currentPageTitle: string
}

//checks if the currentUrl that is navigated to matches any of the urls
//in the nested list.
const checkNestedItemSelected = (currentUrl, nestedItemsUrls) => {
  let nestedItemSelected = false
  for (let i = 0; i < nestedItemsUrls.length; i++) {
    const currNestedUrl = nestedItemsUrls[i]
    if (currentUrl.includes(nestedItemsUrls[i])) {
      nestedItemSelected = true
    }
  }
  return nestedItemSelected
}

/**
 * Sub-item of a DrawerList. Renders a ListItem with a collapsable menu.
 * The list of items in the menu is populated according to the listItems prop
 * @param props props to be passed into the nested list item
 */
const NestedListItem: React.FC<NestedListItemProps> = (props) => {
  const {
    title,
    listItems,
    icon,
    parentUrl,
    currentPageTitle,
    onClickHandler,
  } = props
  const classes = useStyles()
  const [open, setOpen] = React.useState(false)
  const router = useRouter()

  const handleClick = () => {
    setOpen(!open)
  }

  useEffect(() => {
    const nestedItemsUrls = listItems.map((item) => parentUrl.concat(item.url))
    const nestedItemSelected = checkNestedItemSelected(
      router.pathname,
      nestedItemsUrls,
    )
    if (nestedItemSelected) {
      setOpen(true)
    }
  }, [])

  return (
    <List
      component="nav"
      aria-labelledby="nested-list-subheader"
      className={classes.root}
    >
      <ListItem button onClick={handleClick}>
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText primary={title} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {listItems.map(({ title, url, icon }, index) => {
            const extendedUrl = parentUrl.concat(url)
            return (
              <Link
                href={extendedUrl}
                underline="none"
                onClick={(e) => {
                  e.preventDefault()
                  router.push(extendedUrl)
                }}
              >
                <ListItem
                  button
                  className={classes.nested}
                  key={url}
                  selected={title === currentPageTitle}
                >
                  <ListItemIcon>{icon}</ListItemIcon>
                  <ListItemText>{title}</ListItemText>
                </ListItem>
              </Link>
            )
          })}
        </List>
      </Collapse>
    </List>
  )
}

export default NestedListItem
