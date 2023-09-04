import React, { useEffect, useState } from "react";
import Newsitem from "./Newsitem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, settotalResults] = useState(0);

  // static defaultProps={
  //     country:'in',
  //     pageSize:10,
  //     category:'general'
  // }
  // static propTypes={
  //    country:PropTypes.string,
  //    pageSize:PropTypes.number,
  //    category:PropTypes.string
  // }
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  // constructor(props)
  // {
  //     super(props);
  //     console.log("I am constructor from news component");
  //     this.state={
  //         articles:[],
  //         loading:true,
  //         page:1,
  //         totalResults:0
  //     }
  //     document.title=`${this.capitalizeFirstLetter(props.category)} - NewsMonkey`;
  // }
  useEffect(() => {
    document.title = `${capitalizeFirstLetter(props.category)} - NewsNow`;
    updateNews();
    // eslint-disable-next-line
  }, []);

  const updateNews = async () => {
    props.progress(0);
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=bd13365a8e7b4ed7a7c49a4f75d3d065&page=1&pageSize=${props.pageSize}`;
    // this.setState({loading:true});
    setLoading(true);
    let data = await fetch(url);
    props.progress(30);
    let parsedData = await data.json();
    props.progress(70);
    console.log(parsedData);
    setArticles(parsedData.articles);
    setLoading(false);
    settotalResults(parsedData.totalResults);
    // this.setState(
    //     {
    //         articles:parsedData.articles,
    //         loading:false,
    //         totalResults:parsedData.totalResults
    //     })
    props.progress(100);
  };
  // const componentDidMount=async()=> {
  //     props.progress(0);
  //     let url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=bd13365a8e7b4ed7a7c49a4f75d3d065&page=1&pageSize=${props.pageSize}`;
  //     this.setState({loading:true});
  //     let data=await fetch(url);
  //     props.progress(30);
  //     let parsedData=await data.json();
  //     props.progress(70);
  //     console.log(parsedData);
  //     setArticles(parsedData.articles)
  //     setLoading(false)
  //     settotalResults(parsedData.totalResults)
  //     // this.setState(
  //     //     {
  //     //         articles:parsedData.articles,
  //     //         loading:false,
  //     //         totalResults:parsedData.totalResults
  //     //     })
  //     props.progress(100);
  // }

  const fetchMoreData = async () => {
    // this.setState({page:this.state.page+1})
    setPage(page + 1);
    let url = `https://newsapi.org/v2/top-headlines?country=${
      props.country
    }&category=${props.category}&apiKey=bd13365a8e7b4ed7a7c49a4f75d3d065&page=${
      page + 1
    }&pageSize=${props.pageSize}`;
    // this.setState({loading:true});
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    setArticles(articles.concat(parsedData.articles));
    // setLoading(false)
    settotalResults(parsedData.totalResults);
    // this.setState(
    //     {
    //         articles:this.state.articles.concat(parsedData.articles),
    //         // loading:false,
    //         totalResults:parsedData.totalResults
    //     })
  };

  const handlePrevClick = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=${
      props.country
    }&category=${props.category}&apiKey=bd13365a8e7b4ed7a7c49a4f75d3d065&page=${
      page - 1
    }&pageSize=${props.pageSize}`;
    // this.setState({loading:true});
    setLoading(true);
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    setArticles(parsedData.articles);
    setLoading(false);
    setPage(page - 1);
    // this.setState({
    //     articles:parsedData.articles,
    //     loading:false,
    //     page:this.state.page-1
    // })
  };

  const handleNextClick = async () => {
    if (page + 1 > Math.ceil(totalResults / props.pageSize)) {
    } else {
      let url = `https://newsapi.org/v2/top-headlines?country=${
        props.country
      }&category=${
        props.category
      }&apiKey=bd13365a8e7b4ed7a7c49a4f75d3d065&page=${page + 1}&pageSize=${
        props.pageSize
      }`;
      // this.setState({loading:true});
      setLoading(true);
      let data = await fetch(url);
      let parsedData = await data.json();
      console.log(parsedData);
      setArticles(parsedData.articles);
      setLoading(false);
      setPage(page + 1);
      // this.setState({
      //     articles:parsedData.articles,
      //     loading:false,
      //     page:this.state.page+1})
      // }
    }
  };

  return (
    //   <div className="container my-3">
    <>
      <h1
        className="text-center"
        style={{ margin: "35px 0px", marginTop: "90px" }}
      >
        NewsNow - Top {capitalizeFirstLetter(props.category)} Headlines
      </h1>
      {loading && <Spinner />}
      <InfiniteScroll
        dataLength={articles.length} //This is important field to render the next data
        next={fetchMoreData}
        hasMore={articles.length !== totalResults}
        loader={<Spinner />}
      >
        <div className="container">
          <div className="row">
            {/* {!this.state.loading && this.state.articles.map((element)=>{ */}
            {articles.map((element) => {
              return (
                <div className="col-md-4" key={element.url}>
                  <Newsitem
                    title={element.title ? element.title.slice(0, 45) : ""}
                    description={
                      element.description
                        ? element.description.slice(0, 88)
                        : ""
                    }
                    imageUrl={element.urlToImage}
                    newsUrl={element.url}
                    author={element.author}
                    date={element.publishedAt}
                    source={element.source.name}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </InfiniteScroll>

      {/* <div className="container d-flex justify-content-between">
        <button type="button" disabled={this.state.page<=1} className="btn btn-primary" onClick={this.handlePrevClick}>&larr; Previous</button>
        <button type="button" disabled={this.state.page+1 > Math.ceil(this.state.totalResults/props.pageSize)}className="btn btn-primary" onClick={this.handleNextClick}>Next &rarr;</button>
        </div> */}
    </>
  );
};

News.defaultProps = {
  country: "in",
  pageSize: 10,
  category: "general",
};
News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};

export default News;
