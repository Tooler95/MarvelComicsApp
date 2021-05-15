import React, { useEffect } from 'react'
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Visibility } from '@material-ui/icons';
import { Typography, AccordionSummary, CardMedia } from '@material-ui/core';


const useStyles = makeStyles(() =>
    createStyles({
        accordion: {
            borderTop: '3px solid #2a2a2a',
            backgroundColor: '#3f3f3f',
            color: '#d3d3d3',
        },
        activeAccordion: {
            borderTop: '3px solid #2a2a2a',
            color: '#9bf09b',
        }
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
            type.map((data, index) => (

                data.data && data.data.available !== 0 &&
                <AccordionSummary
                    expandIcon={<Visibility color="action" />}
                    className={data.name === active ? classes.activeAccordion : classes.accordion}

                >
                    <Typography onChange={props.handleClose} onClick={() => { changeContent({ activeItem: item, mediaType: mediaType, type: data.name, name: name, URI: data.data.collectionURI }) }} style={{ width: '100%' }} key={index} variant="h6">
                        <span>{data.name}</span>
                        <span style={{ float: 'right' }}>({data.data.available})</span>
                    </Typography>
                </AccordionSummary>
            ))
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



