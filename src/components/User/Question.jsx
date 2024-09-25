import React from 'react';
import _ from 'lodash';
import './Question.scss';
import { PhotoProvider, PhotoView } from 'react-photo-view';

const Question = (props) => {
  const { data } = props;

  if (_.isEmpty(data)) {
    return <></>;
  }

  const handleCheckBoxP = (e, aId, qId) => {
    props.handleCheckBox(aId, qId);
  };

  return (
    <>
      {data.image && (
        <div className='q-content-img'>
           <PhotoProvider>
            <PhotoView
              src={`data:image/jpeg;base64,${data.image}`}
            >
              <img
                src={`data:image/jpeg;base64,${data.image}`}
                alt=''
                style={{ cursor: 'pointer' }} // Thêm con trỏ để hiển thị khi hover vào ảnh
              />
            </PhotoView>
          </PhotoProvider>
        </div>
      )}
      <div className='question'>
        Question {props.index + 1}: {data.questionDescription}
      </div>
      <div className='answer'>
        {data.answers &&
          data.answers.length &&
          data.answers.map((item, index) => {
            return (
              <div key={`answer-${index}`} className='a-child'>
                <div className='form-check'>
                  <input
                    className='form-check-input'
                    checked={item.isSelected}
                    type='checkbox'
                    onChange={(e) => handleCheckBoxP(e, item.id, data.questionId)}
                  />
                  <label className='form-check-label'>{item.description}</label>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default Question;
