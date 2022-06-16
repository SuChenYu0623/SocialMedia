import React, { Component } from "react";
import postData from "./postData";
import PosterList from "./PosterList";
import PostList from "./PostList";

import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      postData: postData,
      posters: [],
      selected_postData: [],
    };
  }

  componentDidMount() {
    let init_posters = [];
    let posterIds = [];
    let init_selected_postData = [];
    for(let i=0; i<postData.length; i++){
      if(!posterIds.includes(postData[i].posterId)){
        posterIds = [...posterIds, postData[i].posterId];
        init_posters = [...init_posters, {posterId: postData[i].posterId,
                                          posterName: postData[i].posterName,
                                          avatar: postData[i].avatar,
                                          likeCount: 0}];
      }

      if(postData[i].posterId===1){
        init_selected_postData = [...init_selected_postData, postData[i]]
      }
    }

    this.setState({
      posters: init_posters,
      selected_postData: init_selected_postData,
    });
  }

  Require_poster = (props) => {
    const { posterId } = props;
    const { postData } = this.state;
    // 切換使用者貼文
    let selected_postData = [];
    for(let i=0; i<postData.length; i++){
      if(postData[i].posterId===posterId){
        selected_postData = [...selected_postData, postData[i]]
      }
    }
    this.setState({
      selected_postData: selected_postData,
    })
  }

  Click_like = (props) => {
    const { id, posterId } = props;
    const { postData, selected_postData, posters } = this.state;
    //更新全部postData
    const new_postData = postData.map((data) => {
      return data.id===id ? {...data, likeCount: data.likeCount+1} : data
    })

    //更新指定poster的postData
    const new_selected_postData = selected_postData.map((data) => {
      return data.id===id ? {...data, likeCount: data.likeCount+1} : data
    })

    //新增讚數
    const new_posters = posters.map((poster) => {
      return poster.posterId===posterId ? {...poster, likeCount: poster.likeCount+1} : poster
    })

    this.setState({
      postData: new_postData,
      selected_postData: new_selected_postData,
      posters: new_posters,
    })
  }

  render() {
    const { posters, selected_postData } = this.state;
    return(
      <div style={{flex: 1, display: 'flex', justifyContent: 'center', padding: '10px'}}>
        <div>
          <div style={{textAlign: 'center', fontSize: '30px', marginBottom: '10px'}}>Fake Instagram</div>
          <PosterList posters={posters} Require_poster={this.Require_poster}  />
          <br />
          <PostList selected_postData={selected_postData} Click_like={this.Click_like} />
        </div>
      </div>
    );
  }
}

export default App;
