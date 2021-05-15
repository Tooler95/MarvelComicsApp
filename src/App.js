import './App.css';
import React, { useState, useEffect } from 'react'
import DisplayContent from './Components/DisplayContent'
import NavBar from './Components/NavBar'
import ActiveMedia from './Components/ActiveMedia'
import { Grid} from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import Search from './Components/search';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      flexGrow: 1,
      padding: '4em 10% 0em 10%',
      minHeight: '91.5vh',
      backgroundColor: '#2a2a2a',
    },
    items: {
      border: '1px solid green'
    },
    loading: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    },
    content: {
      marginTop: '2em'
    },
    resultsTxt: {
      color: 'white',
      fontSize: '1.25em',
      textAlign: 'center',
      marginTop: '2em',
      float: 'right'
    }
  })
)


function App() {
  const classes = useStyles();
  const [controls, setControls] = useState({
    mediaType: 'characters',
    data: [],
    page: 1,
    offset: 0,
    showImages: false
  })
  const [loading, setLoading] = useState(false);
  const [activeMedia, setActiveMedia] = useState('')


  useEffect(async () => {
    {
      controls.data.length === 0 &&
        getMediaType({ type: controls.mediaType, offset: 0, page: controls.page });
    }
  }, [])

  useEffect(async () => {
    { controls.mediaType === undefined ? await setLoading(true) : await setLoading(false) }
  })

  const getMediaType = async (props) => {
    console.log(props);
    props.item === '' && setActiveMedia('')
    let defaultSearch;
    props.defaultSearch === false ? defaultSearch = false : defaultSearch = true;
    setControls({ ...controls, mediaType: undefined })
    const requestedMedia = await Search({ type: props.type, offset: props.offset, defaultSearch: defaultSearch, url: props.url });
    await setControls({
      ...controls, mediaType: props.type,
      total: requestedMedia.total,
      offset: requestedMedia.offset,
      count: requestedMedia.count,
      limit: requestedMedia.limit,
      data: requestedMedia.results,
      page: props.page,
      url: props.url,
      pageHead: props.pageHead
    });
  }

  const changeContent = async (item) => {
    const activeItem = item.activeItem
    const a1 = item.mediaType
    const a2 = item.type
    setActiveMedia({ ...activeItem, type: a1, mediaType: a2 })
    await setControls({});
    getMediaType({ type: controls.mediaType, page: 1, offset: 0, defaultSearch: false, url: item.URI, pageHead: '' })
         window.scrollTo(0, 0)
  }



  const nextPage = async () => {
    {
      controls.pageHead === undefined ?
        await getMediaType({ type: controls.mediaType, offset: controls.offset + 18, page: controls.page + 1 })
        :
        await getMediaType({ type: controls.mediaType, page: controls.page + 1, offset: controls.offset + 18, defaultSearch: false, url: controls.url, pageHead: controls.pageHead })
    }
  }
  const prevPage = async () => {
    await getMediaType({ type: controls.mediaType, offset: controls.offset - 18, page: controls.page - 1, defaultSearch: false, url: controls.url, pageHead: controls.pageHead })
  }


  const hideImages = (props) => {
    setControls({ ...controls, showImages: props })
  }

  const loadingSymbol = () => (
    <div className="loaderBody">
      <div className="loader">
        <span>L</span>
        <span>O</span>
        <span>A</span>
        <span>D</span>
        <span>I</span>
        <span>N</span>
        <span>G</span>
      </div>
    </div>
  )

  return (
    <>
    <div className={classes.root}>
      <NavBar value={getMediaType} showImages={controls.showImages} hideImages={hideImages} controls={controls} />
        <Grid container spacing={4} style={{display: 'flex', justifyContent: 'center'}}>

          {activeMedia && <Grid item style={{ color: 'white' }} lg={3} md={4} sm={10} xs={12}>
            <ActiveMedia media={activeMedia} type={controls.mediaType} changeContent={changeContent} loading={loading} />
          </Grid>}


          <Grid className={classes.content} lg={activeMedia ? 9 : 12} md={activeMedia ? 8 : 12} sm={12} xs={12}>
            {loading === false ?
              <DisplayContent changeContent={changeContent} nextPage={nextPage} prevPage={prevPage} media={activeMedia} controls={controls} />
              :
              loadingSymbol()
            }
          </Grid>
        </Grid>
      </div>
    </>
  );
}

export default App;


