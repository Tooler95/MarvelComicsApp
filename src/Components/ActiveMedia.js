import { createStyles, makeStyles } from '@material-ui/core/styles';
import React from 'react'
import CreateAccordion from './CreateAccordion'
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import { CardContent } from '@material-ui/core';

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            backgroundColor: '#151515',
            marginTop: '3.5em',

        },
        cardHead: {
            color: 'white',
            textAlign: 'center',
            textShadow: '3px 3px 5px black',
            border: '2px solid white'
        },
        img: {
            border: '2px solid white',
            borderBottom: '0',
            padding : '0'
        }
    })
)

function ActiveMedia(props) {
    const classes = useStyles();
    const media = props.media
    const name = media.name || media.title

    const cardContent = () => {
        CreateAccordion({ type: props.type, active: media.mediaType, item: media, changeContent: props.changeContent })
    }

    return (
        <Card className={classes.root}>
            <CardHeader className={classes.cardHead} title={name} titleTypographyProps={{ variant: 'h6' }} />
            <CardContent className={classes.img}>
                <CardMedia component="img"
                    image={media.thumbnail.path + '/standard_incredible.' + media.thumbnail.extension}
                    title={name}
                />
            </CardContent>
            {CreateAccordion({ type: props.type, active: media.mediaType, item: media, changeContent: props.changeContent })}
            {props.loading === true && <div class="lds-ring"><div></div><div></div><div></div><div></div></div>}

        </Card>
    );
}

export default ActiveMedia;