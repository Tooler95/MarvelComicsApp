import React, { useState, useEffect } from 'react'
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { SkipNext, SkipPrevious } from '@material-ui/icons';
import {
    Card, CardActionArea, CardMedia, Grid, Typography,
    Accordion, AccordionSummary, AccordionDetails, Dialog, DialogContent,
    DialogContentText, Button
} from '@material-ui/core';
import CreateAccordion from './CreateAccordion'


const useStyles = makeStyles(() =>
    createStyles({
        root: {
            flexGrow: 1,
            color: 'white',
        },
        centerElement: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        },
        dialogHead: {
            width: '100%',
            textAlign: 'center',
            fontSize: '24px',
            fontFamily: 'Roboto'
        },
        overlayFont: {
            position: "absolute",
            top: "40%",
            width: "100%",
            textAlign: "center",
            color: "white",
            fontFamily: "Roboto",
        },
        flexContainer: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            padding: 0,
            color: 'black',
            width: '100%',
        },
        pageBtn: {
            float: 'right',
            color: 'white',
            fontSize: '1em',
            padding: '0'
        },
        activeCard: {
            opacity: '30%',
            transform: 'scale(.95)',
        },
        card: {
            boxShadow: '7px 7px 5px black',
            "&:hover": {
                opacity: '75%',
                transform: 'scale(.99)'
            }
        },
        itemName : {
            textShadow: '5px 5px 10px black'
        }
    })
)

function DisplayContent(props) {
    const [open, setOpen] = useState(false);
    const [item, setItem] = useState({});

    const controls = props.controls
    const showImages = controls.showImages
    const data = controls.data
    const classes = useStyles();
    const noImage = 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available'
    const placeholderImage = "http://i.annihil.us/u/prod/marvel/i/mg/f/60/4c002e0305708"


    useEffect(() => {
        (props.controls.url !== undefined) && handleClose();
    }, [controls.url])

    const handleOpen = (props) => {
        setItem(props);
        setOpen(!open);

    }
    const handleClose = () => {
        setOpen(false);
        setItem({});

    }

    return (
        <div className={classes.root}>
            
            <Typography variant="h6">
            <span className={classes.pageBtn}>
                <Button className={classes.pageBtn} onClick={() => props.changePage('next')}><SkipNext fontSize="large" /></Button>
                <Button className={classes.pageBtn}>{props.controls.page}</Button>

                {props.controls.offset !== 0 &&
                    <Button className={classes.pageBtn} onClick={() => props.changePage('prev')}><SkipPrevious fontSize="large" /></Button>

                }
            </span>
            </Typography>
            <div className={classes.dialogWrapper}>
            <Dialog open={open} onClose={handleClose} maxWidth="xs">

                <Accordion defaultExpanded style={{ margin: '0', padding: '0', border: '2px solid white', borderBottom: '0' }}>
                    <AccordionSummary style={{backgroundColor: '#2a2a2a', color: 'white'}}>
                        <Typography className={classes.dialogHead}>{item.name || item.title || item.fullName}</Typography>
                    </AccordionSummary>
                    <AccordionDetails style={{ margin: '0', padding: '0' }} >
                        <DialogContent className={classes.dialog} style={{ margin: '0', padding: '0' }}>

                            <Grid container className={classes.centerElement} style={{backgroundColor: '#2a2a2a'}}>
                                <Grid item md={10}>
                                        {(item.thumbnail !== undefined && item.thumbnail !== null && item.thumbnail.path !== noImage) &&
                                            <Card className={classes.card}>
                                                <CardMedia component="img"
                                                    className={classes.dialogImg}
                                                    image={item.thumbnail.path + '/standard_incredible.' + item.thumbnail.extension}
                                                    title={item.name}
                                                />
                                            </Card>

                                        }
                                </Grid>
                                <Grid item md={12}>
                                    <DialogContentText id="alert-dialog-slide-description" style={{ margin: '1em', color: 'white' }}>
                                       {item.description}
                                    </DialogContentText>
                                </Grid>
                            </Grid>

                        </DialogContent>
                    </AccordionDetails>
                </Accordion>

                {CreateAccordion({ type: controls.mediaType, active: props.media.mediaType, item: item, changeContent: props.changeContent })}
            </Dialog>
            </div>

            <Grid container spacing={2}>
                {data && data.map((media, index) => {
                    return (
                        <React.Fragment key={index}>
                            {(media.thumbnail.path !== noImage && media.thumbnail.path !== placeholderImage || showImages === false) &&
                                <Grid lg={2} md={3} sm={4} xs={6} item className={classes.items}>
                                    <Card className={item.id === media.id ? classes.activeCard : classes.card}>
                                        <CardActionArea>
                                            <CardMedia
                                                component="img"
                                                image={media.thumbnail.path + '/portrait_uncanny.' + media.thumbnail.extension}
                                                title={media.name}
                                                onClick={() => { handleOpen(media); }}
                                            />
                                        </CardActionArea>
                                    </Card>
                                    <h4 className={classes.itemName}>{media.name || media.title || media.fullName}</h4>
                                </Grid>
                            }
                        </React.Fragment>
                    )
                })}
            </Grid>

        </div>
    )
}

export default DisplayContent;

