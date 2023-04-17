import ReactQuill from 'react-quill';
import Post from '../Post/Post';
import './PostCreat.css';

export default function PostCreate() {
    return (
        <div>
            <div className="add-question">
                <div className="add-question-container">
                    <div className="head-title">
                        <h1>Ask a public question</h1>
                    </div>
                    <div className="question-container">
                        <div className="question-options">
                            <div className="question-option">
                                <div className="title">
                                    <h3>Title</h3>
                                    <small>Be specific and imagine you're asking a question to another person</small>
                                    <input
                                        type="text"
                                        placeholder="e.g Is there an R function for finding teh index of an element in a vector?"
                                    />
                                </div>
                            </div>
                            <div className="question-option">
                                <div className="title">
                                    <h3>Body</h3>
                                    <small>
                                        Include all the information someone would need to answer your question
                                    </small>
                                    <ReactQuill className="react-quill" theme="snow" />
                                </div>
                            </div>
                            <div className="question-option">
                                <div className="title">
                                    <h3>Tags</h3>
                                    <small>Add up to 5 tags to describe what your question is about</small>

                                    <div name="tags" placeHolder="press enter to add new tag" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <button className="button">Add your question</button>
                </div>
            </div>
        </div>
    );
}
// cmt
