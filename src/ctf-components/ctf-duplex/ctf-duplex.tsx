import { Container, Theme, makeStyles, Typography } from '@material-ui/core';
import clsx from 'clsx';
import { useMemo } from 'react';

import { DuplexFieldsFragment } from '@ctf-components/ctf-duplex/__generated/ctf-duplex.generated';
import CtfRichtext from '@ctf-components/ctf-richtext/ctf-richtext';
import PageLink from '@src/components/link/page-link';
import PostLink from '@src/components/link/post-link';
import { ContentfulImage } from '@src/components/contentful-image/contentful-image';
import LayoutContext, { defaultLayout } from '@src/layout-context';
import { getColorConfigFromPalette } from '@src/theme';
import optimizeLineBreak from '@src/typography/optimize-line-break';

const useStyles = makeStyles((theme: Theme) => ({
  innerContainer: {
    display: 'flex',
    flexDirection: 'column',
    marginLeft: 'auto',
    marginRight: 'auto',
    maxWidth: '126rem',
    padding: theme.spacing(19, 0, 19),
    [theme.breakpoints.up('md')]: {
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
  },
  innerContainerFull: {
    [theme.breakpoints.up('md')]: {
      paddingBottom: 0,
      paddingTop: 0,
      '& $innerBody': {
        padding: theme.spacing(19, 0, 19),
      },
    },
  },
  innerBody: {
    order: 2,
    width: '100%',

    [theme.breakpoints.up('md')]: {
      width: 'calc(50% - 2.5rem)',
    },
  },
  'innerBody-imageLeft': {
    [theme.breakpoints.up('md')]: {
      order: 2,
    },
  },
  'innerBody-imageRight': {
    [theme.breakpoints.up('md')]: {
      order: 0,
    },
  },
  imageContainer: {
    maxWidth: '60rem',
    order: 1,
    width: '100%',

    [theme.breakpoints.up('md')]: {
      maxWidth: '100%',
      width: 'calc(50% - 2.5rem)',
    },
  },
  imageContainerFull: {
    [theme.breakpoints.up('md')]: {
      alignSelf: 'flex-end',
    },
  },
  imageFixed: {
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    marginBottom: theme.spacing(7),

    [theme.breakpoints.up('md')]: {
      marginBottom: 0,
    },

    '&::before': {
      content: '""',
      display: 'block',
      paddingTop: '83.333%',
    },
  },
  imageFull: {
    marginBottom: theme.spacing(7),

    [theme.breakpoints.up('md')]: {
      marginBottom: 0,
    },
  },
  'imageFull-imageLeftleft': {
    [theme.breakpoints.up('lg')]: {
      transform: 'translateX(-16rem)',
    },
  },
  'imageFull-imageLeftcenter': {
    [theme.breakpoints.up('lg')]: {
      transform: 'translateX(-8rem)',
    },
  },
  'imageFull-imageLeftright': {},
  'imageFull-imageRightleft': {},
  'imageFull-imageRightcenter': {
    [theme.breakpoints.up('lg')]: {
      transform: 'translateX(8rem)',
    },
  },
  'imageFull-imageRightright': {
    [theme.breakpoints.up('lg')]: {
      transform: 'translateX(16rem)',
    },
  },
  imageFullImage: {
    display: 'block',
    maxWidth: '100%',
  },
  headline: {
    fontSize: '3.4rem',
    maxWidth: '60.4rem',
    [theme.breakpoints.up('xl')]: {
      fontSize: '3.8rem',
    },
  },
  body: {
    fontWeight: 400,
    lineHeight: 1.52,
    marginTop: theme.spacing(7),
    maxWidth: '51rem',
    '& .MuiTypography-body1': {
      fontSize: '2rem',
      [theme.breakpoints.up('xl')]: {
        fontSize: '2.5rem',
      },
    },
  },
  ctaContainer: {
    marginTop: theme.spacing(8),
    '& svg.MuiSvgIcon-root': {
      fontSize: 'inherit',
    },
  },
}));

export const CtfDuplex = (props: DuplexFieldsFragment) => {
  const {
    containerLayout: containerLayoutBoolean,
    image,
    imageStyle: imageStyleBoolean,
    headline,
    bodyText,
    targetPage,
    ctaText,
    colorPalette,
    imageAlignment: imageAlignmentParam,
  } = props;

  const colorConfig = getColorConfigFromPalette(colorPalette || '');
  const containerLayout = containerLayoutBoolean === true ? 'imageLeft' : 'imageRight';
  const imageStyle = imageStyleBoolean ? 'fixed' : 'full';
  const backgroundImage = useMemo(() => (image ? `${image.url}?w=${600 * 2}` : undefined), [image]);
  const imageAlignment = useMemo(() => {
    if (imageAlignmentParam === null) {
      return 'center';
    }

    if (imageAlignmentParam === 'Left-aligned') {
      return 'left';
    }

    if (imageAlignmentParam === 'Right-aligned') {
      return 'right';
    }

    return 'center';
  }, [imageAlignmentParam]);
  const classes = useStyles();

  const imgStyle = {
    display: 'block',
    maxWidth: '100%',
  };

  return (
    <Container
      maxWidth={false}
      style={{
        backgroundColor: colorConfig.backgroundColor,
      }}
    >
      <div
        className={clsx(
          classes.innerContainer,
          imageStyle === 'full' ? classes.innerContainerFull : undefined,
        )}
      >
        <div className={clsx(classes.innerBody, classes[`innerBody-${containerLayout}`])}>
          {headline && (
            <Typography
              variant="h1"
              component="h2"
              className={classes.headline}
              style={{ color: colorConfig.headlineColor }}
            >
              {optimizeLineBreak(headline)}
            </Typography>
          )}
          {bodyText && (
            <LayoutContext.Provider value={{ ...defaultLayout, parent: 'duplex' }}>
              <div style={{ color: colorConfig.textColor }}>
                <CtfRichtext {...bodyText} className={classes.body} />
              </div>
            </LayoutContext.Provider>
          )}
          {targetPage && targetPage.slug && (
            <div className={classes.ctaContainer}>
              {targetPage.__typename === 'Page' && (
                <PageLink
                  page={targetPage}
                  variant="contained"
                  color={colorConfig.buttonColor}
                  isButton
                >
                  {ctaText}
                </PageLink>
              )}
              {targetPage.__typename === 'Post' && (
                <PostLink
                  post={targetPage}
                  variant="contained"
                  color={colorConfig.buttonColor}
                  isButton
                >
                  {ctaText}
                </PostLink>
              )}
            </div>
          )}
        </div>
        <div
          className={clsx(
            classes.imageContainer,
            imageStyle === 'full' ? classes.imageContainerFull : undefined,
          )}
        >
          {imageStyle === 'fixed' && backgroundImage && (
            <div
              className={classes.imageFixed}
              style={{
                backgroundImage: `url('${backgroundImage}')`,
              }}
            />
          )}
          {imageStyle === 'full' && image && (
            <div
              className={clsx(
                classes.imageFull,
                classes[`imageFull-${containerLayout}${imageAlignment}`],
              )}
            >
              <ContentfulImage
                style={imgStyle}
                src={`${image.url}?w=600`}
                alt={image.description || undefined}
                width={'605px'}
                height={'483px'}
              />
            </div>
          )}
        </div>
      </div>
    </Container>
  );
};
