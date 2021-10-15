import * as React from 'react'
import {
  Avatar,
  Box,
  CheckBox,
  Header,
  Menu,
  Nav,
  ResponsiveContext,
} from 'grommet'
import {
  Menu as MenuIcon,
  User,
  Blog,
  Network,
  DocumentText,
} from 'grommet-icons'
import { ThemeContext } from '../context/theme'
import AnchorLink from '../components/shared/AnchorLink'

const pages = [
  {
    label: 'About',
    page: '/',
    href: '/#about',
    hash: '#about',
    icon: <User size='medium' />,
  },
  {
    label: 'Blog',
    page: '/blog',
    href: '/blog',
    hash: '',
    icon: <Blog size='medium' />,
  },
  {
    label: 'Resume',
    page: '/maxscher_resume_2021.pdf',
    href: '/maxscher_resume_2021.pdf',
    has: '',
    icon: <DocumentText size='medium' />,
  },
  {
    label: 'Connect',
    page: '/',
    href: '/#contact',
    hash: '#contact',
    icon: <Network size='medium' />,
  },
]

const darkGravatarSrc =
  '//s.gravatar.com/avatar/7e42572bcc98cfbb38a3739957df82d7?s=80'

const gravatarSrc =
  '//s.gravatar.com/avatar/f07f2c4c091b1e417602c975cb623d90?s=80'

const Navigation = ({ location, ...rest }) => {
  const { themeMode, setThemeMode } = React.useContext(ThemeContext)
  const responsive = React.useContext(ResponsiveContext)

  const menuItems = [
    ...pages,
    {
      onClick: evt => setThemeMode(evt.target.checked ? 'dark' : 'light'),
      icon: (
        <Box pad='small'>
          <CheckBox checked={themeMode === 'dark'} toggle />
        </Box>
      ),
    },
  ]

  return (
    <Header
      pad={
        responsive === 'small'
          ? {
              top: 'small',
              bottom: 'small',
              right: 'medium',
              left: 'medium',
            }
          : 'medium'
      }
      align='center'
      elevation='small'
      {...rest}
    >
      <AnchorLink
        hash='#home'
        page='/'
        icon={
          <Avatar
            src={themeMode === 'dark' ? gravatarSrc : darkGravatarSrc}
            border={{ color: 'brand', size: 'small' }}
          />
        }
        label=''
      />
      {responsive === 'small' ? (
        <Menu
          items={menuItems}
          size='large'
          dropProps={{ align: { top: 'bottom', right: 'left' } }}
        >
          <MenuIcon />
        </Menu>
      ) : (
        <Nav direction='row'>
          {pages.map((item, i) => (
            <AnchorLink
              key={`${item.page}-${i}`}
              hash={item.hash}
              label={item.label}
              page={item.page}
              icon={item.icon}
              active={`${item.hash}` === `${location?.hash}`}
            />
          ))}
          <CheckBox
            checked={themeMode === 'dark'}
            toggle
            onChange={evt =>
              setThemeMode(evt.target.checked ? 'dark' : 'light')
            }
          />
        </Nav>
      )}
    </Header>
  )
}

export default Navigation
