import React from 'react'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import NestedListItem from './NestedListItem'
import {
  Button,
  Icon,
  IconButtonProps,
  ListItemText,
  Link,
  makeStyles,
  Theme,
  Box,
} from '@material-ui/core'
import { useRouter } from 'next/router'
import classes from '*.module.css'

//type DrawerListItemType =  typeof ListItem | typeof NestedListItem

type DrawerListItemProps = {
  title: string
  pageTitle: string
  url: string
  icon: IconButtonProps
  onClickHandler: (e: any, url: string) => void
  nestedItems?: Array<object>
}

/**
 * Renders a single JSX element in the drawer. Rendered element can either be
 * a normal ListItem, or a NestedListItem.
 * @param title the title of the element to be shown on the list
 * @param pageTitle the current rendered page title
 * @param url the url for page rendering and redirection
 * @param icon a JSX element Icon to be used as the icon for the list item
 * @param nestedItems array of menu elements that are nested in the tab
 */
const DrawerListItem: React.FC<DrawerListItemProps> = (props) => {
  const { title, pageTitle, url, icon, onClickHandler, nestedItems } = props
  //check if the nestedItems array exists
  const isNestedListItem = props.nestedItems.length > 0

  const router = useRouter()

  //if it is, create a NestedListItem
  if (isNestedListItem) {
    return (
      <NestedListItem
        title={title}
        icon={icon}
        parentUrl={url}
        currentPageTitle={pageTitle}
        listItems={nestedItems}
        onClickHandler={onClickHandler}
      />
    )
  } else {
    return (
      <Link
        href={url}
        underline="none"
        onClick={(e) => {
          e.preventDefault()
          router.push(url)
        }}
      >
        <ListItem button selected={title === pageTitle}>
          <ListItemIcon>{icon}</ListItemIcon>
          <ListItemText>{title}</ListItemText>
        </ListItem>
      </Link>
    )
  }
}

export default DrawerListItem
