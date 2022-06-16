// 大頭貼
function Avatar(props) {
  const { poster } = props
  return (
    <div style={{ textAlign: 'center', marginLeft: '10px'}}>
      <img className='poster_avatar_img' src={poster.avatar} alt='avatar' />
      <div className='poster_avatar_text'>{poster.posterName}</div>
      <div className='poster_avatar_text'>{poster.likeCount}</div>
    </div>
  );
}

// 限動的導覽列
const PosterList = (props) => {
  const { posters, Require_poster } = props;
  return (
    <div style={{display: 'flex', padding: '10px', width: '500px', border: '1px solid #C0C0C0', borderRadius: '5px', overflow: 'scroll', overflowY: 'hidden'}}>
      {posters.map((poster, index) => (
        <a key={index} onClick={() => Require_poster({posterId: poster.posterId})}>
          <Avatar poster={poster} />
        </a>
      ))}
    </div>
  );
}

export default PosterList;