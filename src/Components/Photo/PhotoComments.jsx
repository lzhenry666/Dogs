import React from 'react';
import { ReactComponent as Editar } from '../../Assets/Edit.svg';

import { UserContext } from '../../UserContext';

import PhotoCommentsForm from './PhotoCommentsForm';
import styles from './PhotoComments.module.css';
import { COMMENT_UPDATE } from '../../Api';
import useFetch from '../../Hooks/useFetch';
import Error from '../Helper/Error';

const PhotoComments = (props) => {
  const [comments, setComments] = React.useState(() => props.comments);
  const [postId, setPostId] = React.useState('');
  const [editingCommentId, setEditingCommentId] = React.useState(null);
  const [editedComment, setEditedComment] = React.useState('');
  const commentsSection = React.useRef(null);
  const { userLogin, userId ,login, updateUser, data } = React.useContext(UserContext);
  const { loading, error, request } = useFetch();

  React.useEffect(() => {
    commentsSection.current.scrollTop = commentsSection.current.scrollHeight;
  }, [comments]);

  const handleEditClick = (postId, commentId, content) => {
    setPostId(postId)
    setEditingCommentId(commentId);
    setEditedComment(content);
  };

  const handleUpdateClick = async () => {
    // Chame sua API para atualizar o comentário aqui
    // Supondo que você esteja usando o método request de useFetch:
    console.log(`🚀 ~ file: PhotoComments.jsx:30 ~ handleUpdateClick ~ editedComment:`, postId, editingCommentId, editedComment);
    let  body = {
     // comment_ID: editingCommentId,
      comment_content: editedComment
    }
    console.log(`🚀 ~ file: PhotoComments.jsx:36 ~ handleUpdateClick ~ body:`, body);
    const { url, options } = COMMENT_UPDATE(editingCommentId,  body);

    const response = await request(url, options);
    if (response.ok) {
      // Atualize o estado dos comentários aqui
      console.log('atualizado',response);
      setEditingCommentId(null);
      setEditedComment('');
    }
  };

  console.log('comments',comments)
  return (
    <>
      <ul ref={commentsSection} className={`${styles.comments} ${props.single ? styles.single : ''}`}>
        {comments.map((comment) => (
          <li key={comment.comment_ID}>
            <b>{comment.comment_author}: </b>
            {editingCommentId === comment.comment_ID ? (
              <>
                <input value={editedComment} onChange={(e) => setEditedComment(e.target.value)} />
                <button onClick={handleUpdateClick}>Atualizar</button>
              </>
            ) : (
              <>
                <span>{comment.comment_content}</span>
                <span className={`${styles.cursorSpaan}`} onClick={() => handleEditClick(comment.comment_post_ID,comment.comment_ID, comment.comment_content)}>
                <Editar />
                  </span>
              </>
            )}
          </li>
        ))}
      </ul>
      {login && <PhotoCommentsForm single={props.single} id={props.id} setComments={setComments} />}

    </>
  );
};

export default PhotoComments;
