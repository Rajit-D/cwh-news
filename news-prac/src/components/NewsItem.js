import React from 'react'

export default function NewsItem(props) {
    return (
        <>
            <div className="card" style={{ width: "25rem" }}>
                <div style={
                   {display: 'flex',
                    justifyContent: 'flex-end',
                    position: 'absolute',
                    right: '0px',
                    top: '-10px'
                }
                }>
                    <span className="badge rounded-pill bg-success">{props.source}</span>
                </div>
                <img src={props.imageURL} className="card-img-top" alt="..." />
                <div className="card-body">
                    <h5 className="card-title">{props.title}...</h5>
                    <p className="card-text">{props.description}</p>
                    <p className="card-text"><small className="text-muted">By {props.author} on {new Date(props.publishedAt).toGMTString()}</small></p>
                    <a href={props.newsUrl} target="_blank" rel="noreferrer" className="btn btn-primary">Read more</a>
                </div>
            </div>
        </>
    )
}
