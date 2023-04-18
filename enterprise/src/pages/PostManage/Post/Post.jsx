import { Link } from 'react-router-dom';
import './Post.css';
import "../PostCreate/PostCreate"
import { Button, Card, Container } from 'react-bootstrap';

import Ava from '../../../img/Ava.jpg';

export default function Post({ img }) {
    return (
        // <div className="post">
        //     <Container>
        //         <img className="postImg" src={img} alt="" />
        //         <div className="postInfo">
        //             <div className="postCats">
        //                 <span className="postCat">
        //                     <Link className="link" to="/posts?cat=Music">
        //                         cai j cung dc
        //                     </Link>
        //                 </span>
        //                 <span className="postCat">
        //                     <Link className="link" to="/posts?cat=Music">
        //                         thich cai chi thi` ghi `
        //                     </Link>
        //                 </span>
        //             </div>
        //             <span className="postTitle">
        //                 <Link to="/post/abc" className="link">
        //                     tieu de
        //                 </Link>
        //             </span>
        //         </div>
        //         <p className="postDesc">noi dung</p>
        //     </Container>
        // </div>
        <Container className="PostManage  gap-4">
            <div className="mb-3">
                <Link to="/postCreate">
                    <button>+</button>
                </Link>
            </div>
            <div className="cartPost">
                <Card style={{ width: '100%' }}>
                    {/* <Card.Img variant="top" src={Ava} /> */}
                    <Card.Body>
                        <Card.Title>Card Title</Card.Title>
                        <Card.Text>
                            Some quick example text to build on the card title and make up the bulk of the card's
                            content.
                        </Card.Text>
                        <Link to="/postDetail">
                            <Button variant="primary">Go somewhere</Button>
                        </Link>
                    </Card.Body>
                </Card>
            </div>
        </Container>
    );
}
//cmt 
