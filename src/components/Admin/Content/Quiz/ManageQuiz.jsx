import './ManageQuiz.scss';
import Select from 'react-select';
import { useState } from 'react';
import { postCreateNewQuiz } from '../../../../service/APIService';
import { toast } from 'react-toastify';
import TableQuiz from './TableQuiz';
import QuizQA from './QuizQA';
import AssignQuiz from './AssignQuiz';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

const options = [
    { value: 'EASY', label: 'EASY' },
    { value: 'MEDIUM', label: 'MEDIUM' },
    { value: 'HARD', label: 'HARD' },
];

const ManageQuiz = (props) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [type, setType] = useState('');
    const [image, setImage] = useState(null);
    const [previewImage, setPreviewImage] = useState("");

    const handleChangeFile = (event) => {
        if (event.target && event.target.files && event.target.files[0]) {
            setPreviewImage(URL.createObjectURL(event.target.files[0]));
            setImage(event.target.files[0])
        } else {
            // setPreviewImage("");
        }
    }

    const handleSubmitQuiz = async () => {
        //validate
        if (!name || !description) {
            toast.error('Name/Description is required');
            return;
        }

        let res = await postCreateNewQuiz(description, name, type?.value, image);
        if (res && res.EC === 0) {
            toast.success(res.EM);
            setName('');
            setDescription('');
            setImage(null);
        } else {
            toast.error(res.EM)
        }
    }
    return (
        <div className="quiz-container">
            <Tabs
                defaultActiveKey="profile"
                id="uncontrolled-tab-example"
                className="mb-3"
                justify
                >
                <Tab eventKey="manage" title="Manage Quiz">
                    <div className="add-new">
                            <fieldset className="border rounded-3 p-3">
                                <legend className="float-none w-auto px-3">Add new Quiz</legend>
                                <div className="form-floating mb-3">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder='your quiz name'
                                        value={name}
                                        onChange={(event) => setName(event.target.value)}
                                    />
                                    <label>Name</label>
                                </div>
                                <div className="form-floating">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder='description...'
                                        value={description}
                                        onChange={(event) => setDescription(event.target.value)}
                                    />
                                    <label >Description</label>
                                </div>
                                <div className='my-3'>
                                <Select
                                    defaultValue={type}
                                     onChange={setType}
                                    options={options}
                                     placeholder={"Quiz type..."}
                                />
                            </div>
                            <div className="more-actions form-group">
                                <label className='mb-1'> Upload Image</label>
                                <input
                                    type="file"
                                    className='form-control'
                                    onChange={(event) => handleChangeFile(event)}
                                />
                            </div>
                            <div className='col-md-12 img-preview'>
                                {previewImage ?
                                    <img src={previewImage} alt=''/>
                                    :
                                    <span>Preview Image</span>
                                }
                            </div>
                             <div className='mt-3'>
                                <button
                                    onClick={() => handleSubmitQuiz()}
                                    className='btn btn-warning'>Save</button>
                            </div>
                        </fieldset>
                    </div>
                    <div className="list-detail">
                        <TableQuiz />
                    </div>
                </Tab>
                <Tab eventKey="updatequiz" title="Update Q-A Quizzes">
                    <QuizQA />
                </Tab>
                <Tab eventKey="assign" title="Assign to Users">
                    <AssignQuiz />
                </Tab>
            </Tabs>
        </div>
    )
}

export default ManageQuiz;