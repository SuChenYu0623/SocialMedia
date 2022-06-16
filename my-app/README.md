###### tags: `作品集`
# SocialMedia
## 1. 設計架構
### 1.1 版面設計
首先依照功能，將版面劃分為限動導覽列和貼文列表兩個版面。
![](https://i.imgur.com/1DWNBQp.png)
### 1.2 使用者資料 postData
大致上可以分成8個欄位。
![](https://i.imgur.com/lAUh1kS.png)
### 1.3 資料流傳遞(變數與function)
![](https://i.imgur.com/hpubCkp.png)


## 2. 限動導覽列
這個部份是拿來製作 IG 限時動態的導覽列。
因此我們會需要多個大頭貼`Avatar`，從而組成一個導覽列。
> 功能上，是用來切換顯示不同發文者的所有貼文，以及累積的讚數。

![](https://i.imgur.com/J4hKIzt.png)

### 2.1 Avatar
接收各別發文者`poster`，並將大頭貼需要的內容顯示出來。
```javascript=
// 大頭貼
function Avatar(props) {
  const { poster } = props;
  return (
    <div style={{ textAlign: 'center', marginLeft: '10px'}}>
      <img className='poster_avatar_img' src={poster.avatar} alt='avatar' />
      <div className='poster_avatar_text'>{poster.posterName}</div>
      <div className='poster_avatar_text'>{poster.likeCount}</div>
    </div>
  );
}
```
### 2.2 PosterList
接收所有發文者`posters` 和更換發文者`Require_poster`。
透過 `map` 的方式，依序將大頭貼以及切換頁面的功能傳入大頭貼`Avatar`。
```javascript=
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
```

## 3. 貼文列表
這個部份是拿來製作 IG 貼文列表的部份。
因此我們會需要多個貼文`PostItem`，從而組成一個貼文列表。
> 功能上，是用來顯示同一個發文者的所有貼文，以及顯示每個貼文累積的讚數。

![](https://i.imgur.com/YmZjHQX.png)

### 3.1 PostItem
接收`data`和`Click_like`。
`data` 用來顯示貼文內容。
`Click_like` 則是按讚功能。
```javascript=
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
```

### 3.2 PostList
接收發文者的貼文資料`selected_postData`和按讚`Click_like`。
透過 `map` 的方式，依序將`data`傳入每個貼文`PostItem`。
```javascript=
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
```