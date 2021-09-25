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
    label: <Box pad={{ left: 'small' }}>About</Box>,
    page: '/',
    href: '/#about',
    hash: '#about',
    icon: <User size='medium' />,
  },
  {
    label: <Box pad={{ left: 'small' }}>Blog</Box>,
    page: '/blog',
    href: '/blog',
    hash: '',
    icon: <Blog size='medium' />,
  },
  {
    label: <Box pad={{ left: 'small' }}>Resume</Box>,
    page: '/maxscher_resume_2021.pdf',
    href: '/maxscher_resume_2021.pdf',
    has: '',
    icon: <DocumentText size='medium' />,
  },
  {
    label: <Box pad={{ left: 'small' }}>Connect</Box>,
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
  const [isDark, toggleIsDark] = React.useContext(ThemeContext)

  const menuItems = [
    ...pages,
    {
      onClick: () => toggleIsDark(),
      icon: (
        <Box pad='small'>
          <CheckBox checked={isDark} toggle />
        </Box>
      ),
    },
  ]

  return (
    <Header background={{ opacity: true }} pad='medium' {...rest}>
      <AnchorLink
        hash='#home'
        page='/'
        icon={<Avatar src={isDark ? gravatarSrc : darkGravatarSrc} />}
        label=''
      />
      <ResponsiveContext.Consumer>
        {responsive =>
          responsive === 'small' ? (
            <>
              <Menu
                size='large'
                items={menuItems}
                dropProps={{
                  align: { top: 'bottom', left: 'left' },
                  elevation: 'medium',
                }}
              >
                <MenuIcon />
              </Menu>
            </>
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
              <CheckBox checked={isDark} toggle onChange={toggleIsDark} />
            </Nav>
          )
        }
      </ResponsiveContext.Consumer>
    </Header>
  )
}

export default Navigation
