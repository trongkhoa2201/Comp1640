import "./card.() => css"

const Card = ({post}) => {
    return(
        <div classname="card">
            <div className="info">
            <img src={post.userImg} alt="" className="UserImg" />
            <span>{post.fullname}</span>
            </div>
            <img src={post.postImg} alt="" className="postImg" />
            <div className="interaction">
                <img src={Like} alt="" className="cardIcon" />
                <img src={UnLike} alt="" className="cardIcon" />
                <img src={Comment} alt="" className="cardIcon" />
            </div>
        </div>
    )
}

export default Card