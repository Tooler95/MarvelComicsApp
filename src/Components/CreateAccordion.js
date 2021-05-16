import React from 'react'
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { Typography, Grid } from '@material-ui/core';


const useStyles = makeStyles(() =>
    createStyles({
        root: {
            border: '2px solid white',
            borderTop: '0'
        },
        accordion: {
            backgroundColor: '#151515',
            color: '#d3d3d3',
            padding: '.5em 1em .5em 1em',
            fontFamily: 'Roboto',
            "&:hover": {
                backgroundColor: '#3f3f3f',
                cursor: 'pointer',
                color: '#9bf09b',
            }
        },
        activeAccordion: {
            color: '#9bf09b',
            backgroundColor: '#3f3f3f',
        },
    })
)

export default function CreateAccordion(props) {
    const changeContent = props.changeContent
    const active = props.active
    const mediaType = props.type
    const item = props.item
    const name = props.item.name || props.item.title
    const classes = useStyles();



    const displayAccordion = (props) => {
        const type = props.type
        return (
            <div className={classes.root}>
            {type.map((data, index) => (
                data.data && data.data.available !== 0 &&
                <Grid container
                    direction="row"
                    title={'View ' + data.name + ' for ' + name}
                    key={index}
                    className={data.name === active ? `${classes.activeAccordion} ${classes.accordion}` : classes.accordion}
                    onClick={() => { changeContent({ activeItem: item, mediaType: mediaType, type: data.name, name: name, URI: data.data.collectionURI }) }}
                >
                    <Grid item xs={2}>
                        <Typography variant="h6" style={{paddingTop: '.25em' }}>
                            {active === data.name ? <Visibility /> : <VisibilityOff />}
                        </Typography>
                    </Grid>
                    <Grid item xs={8}>
                        <Typography variant="h6">{data.name}</Typography>
                    </Grid>
                    <Grid item xs={2}>
                        <Typography variant="h6">({data.data.available})</Typography>
                    </Grid>
                </Grid>

            ))}
            </div>
        )
    }
    if (mediaType !== undefined) {
        return displayAccordion
            ({
                type:
                    [
                        {
                            name: 'Comics', data: item.comics
                        },
                        {
                            name: 'Series', data: item.series
                        },
                        {
                            name: 'Stories', data: item.stories
                        },
                        {
                            name: 'Events', data: item.events
                        },
                        {
                            name: 'Characters', data: item.characters
                        }
                    ]
            })
    }

}



