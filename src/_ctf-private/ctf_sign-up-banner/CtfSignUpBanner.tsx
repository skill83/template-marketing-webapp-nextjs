import { Theme, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import clsx from 'clsx';

import Logo from './CtfLogo.svg';

import { Link } from '@src/components/shared/link';

const signUpLink =
  'https://www.contentful.com/starter-templates/marketing-website/sign-up/?action=create_starter_template&template_name=marketing';
const systemUIFontFamilies =
  '"Avenir Next W01", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"';

const useStyles = makeStyles((theme: Theme) => ({
  banner: {
    background: '#0033A3',
    height: '54px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '12px',
  },
  mobile: {
    order: -1,
    textAlign: 'right',
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  nonMobile: {
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  mobileText: {
    fontSize: '14px',
    fontFamily: systemUIFontFamilies,
    color: '#FFFFFF',
    order: -1,
    textAlign: 'right',
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  nonMobileText: {
    fontSize: '14px',
    fontFamily: systemUIFontFamilies,
    color: '#FFFFFF',
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  ctflLink: {
    backgroundColor: '#FFDA00',
    borderRadius: '50px',
    padding: '8px 24px',
    transition: '0.4s',
    transitionProperty: 'transform, background-color, border-color, background,color',
    color: '#000000',
    '&:hover': {
      transform: 'translateY(-3px)',
      backgroundColor: '#EFC800',
    },
  },
  ctflLinkText: {
    fontSize: '14px',
    fontWeight: 600,
    fontFamily: systemUIFontFamilies,
  },
}));

export const CtfSignUpBanner = () => {
  const classes = useStyles();

  return (
    <div className={classes.banner}>
      <Logo />
      <Typography className={clsx(classes.mobile, classes.mobileText)}>
        Content
        <br />
        from
      </Typography>
      <Typography className={clsx(classes.nonMobile, classes.nonMobileText)}>
        The content on this template is managed via Contentful
      </Typography>
      <Link className={classes.ctflLink} href={signUpLink} target="_blank">
        <Typography className={clsx(classes.mobile, classes.ctflLinkText)}>Use template</Typography>
        <Typography className={clsx(classes.nonMobile, classes.ctflLinkText)}>
          Start with this template
        </Typography>
      </Link>
    </div>
  );
};
