import { createStyles, makeStyles } from '@material-ui/core/styles';
import React, {useEffect} from 'react'
import CreateAccordion from './CreateAccordion'
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            backgroundColor: '#151515',
            marginTop: '3.5em',
            border: '2px solid #2a2a2a'
        },
        cardHead: {
            color: 'white',
            textAlign: 'center',
            textShadow: '3px 3px 5px black'
        },
    })
)

function ActiveMedia(props) {
    console.log(props);
    const classes = useStyles();
    const media = props.media
    const name = media.name || media.title

    const cardContent = () => {
        CreateAccordion({type: props.type, active: media.mediaType, item: media, changeContent: props.changeContent})
    }

    console.log(cardContent);

  return (
    <Card className={classes.root}>
        <CardHeader className={classes.cardHead} title={name} titleTypographyProps={{variant:'h6' }}/>
        <CardMedia component="img"
        className={classes.img}
        image={media.thumbnail.path + '/standard_incredible.' + media.thumbnail.extension}
        title={name}
      />
        {CreateAccordion({type: props.type, active: media.mediaType, item: media, changeContent: props.changeContent})}
        {props.loading === true && <div class="lds-ring"><div></div><div></div><div></div><div></div></div>}

    </Card>
  );
}

export default ActiveMedia;