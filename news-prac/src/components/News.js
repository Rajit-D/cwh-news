import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import InfiniteScroll from "react-infinite-scroll-component";

export default class News extends Component {
    capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            loading: false,
            page: 1
        }
        document.title = `NewsMonkey - ${this.capitalizeFirstLetter(this.props.category)}`
    }

    // updateNews = async () => {
    //     const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=ff196b1d10424a619bd027796e066c6d&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    //     this.setState({ loading: true });
    //     let data = await fetch(url);
    //     let parsedData = await data.json();
    //     this.setState({
    //         articles: parsedData.articles,
    //         totalResults: parsedData.totalResults,
    //         loading: false
    //     });
    // }

    async componentDidMount() {
        this.props.setProgress(10);
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=ff196b1d10424a619bd027796e066c6d&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true });
        let data = await fetch(url);
        this.props.setProgress(30);
        let parsedData = await data.json();
        this.props.setProgress(70);
        this.setState({
            articles: parsedData.articles,
            totalResults: parsedData.totalResults,
            loading: false
        });
        this.props.setProgress(100);
    }

    handlePrevClick = async () => {
        console.log("Prev has been clicked");
        this.props.setProgress(10);
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=ff196b1d10424a619bd027796e066c6d&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true });
        let data = await fetch(url);
        this.props.setProgress(30);
        let parsedData = await data.json();
        this.props.setProgress(70);
        this.setState({
            articles: parsedData.articles,
            page: this.state.page - 1,
            loading: false
        });
        // this.setState({page: this.state.page - 1});
        // this.updateNews();
        this.props.setProgress(100);
    }
    handleNextClick = async () => {
        console.log("Next has been clicked");
        this.props.setProgress(10);
        if (this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)) { }
        else {
            let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=ff196b1d10424a619bd027796e066c6d&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
            this.setState({ loading: true });
            let data = await fetch(url);
            this.props.setProgress(30);
            let parsedData = await data.json();
            this.props.setProgress(70);
            this.setState({
                articles: parsedData.articles,
                page: this.state.page + 1,
                loading: false
            });
        }
        //     this.setState({page: this.state.page + 1});
        //     this.updateNews();
        this.props.setProgress(100);
    }

    fetchMoreData = async() => {
        this.setState({page: this.state.page + 1});
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=ff196b1d10424a619bd027796e066c6d&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({
            articles: this.state.articles.concat(parsedData.articles),
            totalResults: parsedData.totalResults,
            loading: false
        });
      };

    render() {
        return (
            <>
                <h2 className='text-center my-4' style={{marginTop: '90px'}}>Today's top headlines - {this.capitalizeFirstLetter(this.props.category)}</h2>
                {this.state.loading && <Spinner/>}
                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length !== this.state.totalResults}
                    loader={<Spinner />}
                    style={{ overflowY: 'hidden' }}
                >
                    <div className="container my-4">
                        <div className="row">
                            {this.state.articles.map((element,index) => {
                                return <div className="col-md-4 my-4" key={index}>
                                    <NewsItem
                                        title={element.title ? element.title.slice(0, 45) : ""}
                                        description={element.description ? element.description.slice(0, 88) : "No description given"}
                                        imageURL={element.urlToImage ? element.urlToImage : "https://images.cointelegraph.com/cdn-cgi/image/format=auto,onerror=redirect,quality=90,width=1200/https://s3.cointelegraph.com/uploads/2022-12/2ef7def6-ed75-4009-a2ac-ec65532f0b61.jpg"}
                                        newsUrl={element.url}
                                        author={element.author ? element.author : "Anonymous"}
                                        publishedAt={element.publishedAt}
                                        source={element.source.name} />
                                </div>
                            })}
                        </div>
                    </div>
                </InfiniteScroll >
            </>
        )
    }
}
