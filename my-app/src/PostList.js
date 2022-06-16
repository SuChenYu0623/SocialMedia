//貼文內容
function PostItem(props) {
  const { data, Click_like } = props;
  return (
    <div style={{width: '500px',paddingTop: '10px', border: '1px solid #c0c0c0', borderRadius: '5px', marginBottom: '10px'}}>
      <div style={{display: 'flex', alignItems: 'center', paddingLeft: '10px', paddingBottom: '5px'}}>
        <img className="post_postitem_avatar" src={data.avatar} alt='avatar'/>
        <div className="post_postitem_avatar_text">{data.posterName}</div>
      </div>
      <a onClick={() => Click_like({id: data.id, posterId: data.posterId})}>
        <img className="post_postitem_photo" src={data.photo} alt='photo' />
      </a>
      <div style={{padding: '5px 10px', display: 'flex'}}>
        <button onClick={() => Click_like({id: data.id, posterId: data.posterId})}>like</button>
        <div style={{paddingLeft: '10px'}}>{data.likeCount}人按讚</div>
      </div>
      
      <div style={{padding: '5px 10px'}}>{data.comment}</div>
      <div style={{padding: '5px 10px', color: '#a0a0a0', fontSize: '10px'}}>發布日期 {data.publish}</div>
    </div>
  );
}

//貼文列表
function PostList(props) {
  const { selected_postData, Click_like } = props;
  return (
    <div style={{display: 'flex', justifyContent: 'center'}}>
      <div>
      {selected_postData.map((data, index) => (
        <PostItem key={index} data={data} Click_like={Click_like} />
      ))}
      </div>
    </div>
  )
}

export default PostList;